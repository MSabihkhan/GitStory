from sqlalchemy.orm import Session
from github import Github
from src.models.repository import Repository
from src.models.user import User
import uuid
from datetime import datetime


class RepoController:
    @staticmethod
    def get_user_repos(db: Session, user_id: str) -> list:
        """Fetch all repositories visible to the authenticated GitHub user."""
        user = db.query(User).filter(User.id == user_id).first()
        if not user or not user.github_token:
            raise ValueError("GitHub token not configured")

        g = Github(user.github_token)
        repos = list(g.get_user().get_repos())
        
        return [
            {
                "id": str(uuid.uuid4()),
                "name": r.name,
                "full_name": r.full_name,
                "url": r.html_url,
                "description": r.description,
                "is_private": r.private,
                "language": r.language,
                "stars": r.stargazers_count,
                "forks": r.forks_count
            }
            for r in repos
        ]

    @staticmethod
    def save_repository(db: Session, user_id: str, repo_data: dict) -> dict:
        """Save a repository to database."""
        existing = db.query(Repository).filter(
            Repository.full_name == repo_data["full_name"],
            Repository.user_id == user_id
        ).first()

        if existing:
            existing.is_indexed = repo_data.get("is_indexed", False)
            existing.indexed_at = datetime.utcnow() if repo_data.get("is_indexed") else None
            existing.language_stats = repo_data.get("language_stats")
            db.commit()
            db.refresh(existing)
            return RepoController._to_dict(existing)

        repo = Repository(
            user_id=user_id,
            name=repo_data["name"],
            full_name=repo_data["full_name"],
            url=repo_data["url"],
            description=repo_data.get("description"),
            is_private=repo_data.get("is_private", False),
            is_indexed=repo_data.get("is_indexed", False),
            indexed_at=datetime.utcnow() if repo_data.get("is_indexed") else None,
            language_stats=repo_data.get("language_stats")
        )
        db.add(repo)
        db.commit()
        db.refresh(repo)

        return RepoController._to_dict(repo)

    @staticmethod
    def get_saved_repos(db: Session, user_id: str) -> list:
        """Get all saved repositories for a user."""
        repos = db.query(Repository).filter(Repository.user_id == user_id).all()
        return [RepoController._to_dict(r) for r in repos]

    @staticmethod
    def _to_dict(repo: Repository) -> dict:
        """Convert Repository model to dict."""
        return {
            "id": repo.id,
            "name": repo.name,
            "full_name": repo.full_name,
            "url": repo.url,
            "description": repo.description,
            "is_private": repo.is_private,
            "is_indexed": repo.is_indexed,
            "indexed_at": repo.indexed_at.isoformat() if repo.indexed_at else None,
            "language_stats": repo.language_stats
        }