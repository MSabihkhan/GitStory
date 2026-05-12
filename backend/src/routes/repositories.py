from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from src.config.database import get_db
from src.controllers.repo_controller import RepoController
from src.middleware.auth import get_current_user

router = APIRouter(prefix="/repositories", tags=["Repositories"])


class SaveRepoRequest(BaseModel):
    name: str
    full_name: str
    url: str
    description: Optional[str] = None
    is_private: bool = False
    is_indexed: bool = False
    language_stats: Optional[dict] = None


@router.get("")
def get_repos(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all saved repositories for the user."""
    try:
        result = RepoController.get_saved_repos(db, current_user["user_id"])
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.get("/github")
def get_github_repos(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Fetch all repositories from GitHub."""
    try:
        result = RepoController.get_user_repos(db, current_user["user_id"])
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("")
def save_repo(
    req: SaveRepoRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Save a repository to database."""
    try:
        result = RepoController.save_repository(
            db,
            current_user["user_id"],
            req.model_dump()
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))