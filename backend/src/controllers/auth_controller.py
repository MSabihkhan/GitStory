from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import uuid
from src.models.user import User
from src.models.token import RefreshToken, PasswordResetToken
from src.utils.password import hash_password, verify_password
from src.utils.tokens import create_access_token, create_refresh_token
from src.config.settings import settings


class AuthController:
    @staticmethod
    def _save_refresh_token(db: Session, user_id: str, token: str) -> None:
        """Save refresh token to database."""
        expires_at = datetime.utcnow() + timedelta(days=settings.jwt_refresh_token_expire_days)
        refresh_token = RefreshToken(
            user_id=user_id,
            token=token,
            expires_at=expires_at
        )
        db.add(refresh_token)
        db.commit()

    @staticmethod
    def register(db: Session, email: str, password: str, name: str = None) -> dict:
        """Register a new user."""
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            raise ValueError("Email already registered")

        user = User(
            email=email,
            password_hash=hash_password(password),
            name=name
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        access_token = create_access_token(
            data={"sub": user.id, "email": user.email}
        )
        refresh_token = create_refresh_token(
            data={"sub": user.id, "email": user.email}
        )

        AuthController._save_refresh_token(db, user.id, refresh_token)

        return {
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name
            },
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }

    @staticmethod
    def login(db: Session, email: str, password: str) -> dict:
        """Login user."""
        user = db.query(User).filter(User.email == email).first()
        if not user or not verify_password(password, user.password_hash):
            raise ValueError("Invalid email or password")

        access_token = create_access_token(
            data={"sub": user.id, "email": user.email}
        )
        refresh_token = create_refresh_token(
            data={"sub": user.id, "email": user.email}
        )

        AuthController._save_refresh_token(db, user.id, refresh_token)

        return {
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name
            },
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }

    @staticmethod
    def refresh_access_token(db: Session, refresh_token: str) -> dict:
        """Refresh access token using refresh token."""
        from src.utils.tokens import decode_token
        payload = decode_token(refresh_token)
        if payload.get("type") != "refresh":
            raise ValueError("Invalid token type")

        user_id = payload.get("sub")
        token_record = db.query(RefreshToken).filter(
            RefreshToken.token == refresh_token,
            RefreshToken.user_id == user_id,
            RefreshToken.revoked == False
        ).first()

        if not token_record:
            raise ValueError("Refresh token not found or revoked")

        if token_record.expires_at < datetime.utcnow():
            raise ValueError("Refresh token has expired")

        access_token = create_access_token(
            data={"sub": user_id, "email": payload.get("email")}
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    @staticmethod
    def update_github_token(db: Session, user_id: str, token: str) -> dict:
        """Update user's GitHub token."""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError("User not found")

        user.github_token = token
        db.commit()

        return {"message": "GitHub token updated successfully"}

    @staticmethod
    def get_user_profile(db: Session, user_id: str) -> dict:
        """Get user profile."""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError("User not found")

        return {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "is_verified": user.is_verified,
            "created_at": user.created_at.isoformat()
        }

    @staticmethod
    def logout(db: Session, user_id: str, refresh_token: str) -> dict:
        """Logout user by revoking refresh token."""
        token_record = db.query(RefreshToken).filter(
            RefreshToken.token == refresh_token,
            RefreshToken.user_id == user_id
        ).first()

        if token_record:
            token_record.revoked = True
            db.commit()

        return {"message": "Logged out successfully"}

    @staticmethod
    def forgot_password(db: Session, email: str) -> dict:
        """Request password reset token."""
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return {"message": "If the email exists, a reset link will be sent"}

        import uuid
        token = str(uuid.uuid4())
        expires_at = datetime.utcnow() + timedelta(hours=1)

        reset_token = PasswordResetToken(
            user_id=user.id,
            token=token,
            expires_at=expires_at
        )
        db.add(reset_token)
        db.commit()

        return {
            "message": "Password reset token generated",
            "reset_token": token
        }

    @staticmethod
    def reset_password(db: Session, token: str, new_password: str) -> dict:
        """Reset password using reset token."""
        token_record = db.query(PasswordResetToken).filter(
            PasswordResetToken.token == token,
            PasswordResetToken.used == False
        ).first()

        if not token_record:
            raise ValueError("Invalid or used reset token")

        if token_record.expires_at < datetime.utcnow():
            raise ValueError("Reset token has expired")

        user = db.query(User).filter(User.id == token_record.user_id).first()
        if not user:
            raise ValueError("User not found")

        user.password_hash = hash_password(new_password)
        token_record.used = True
        db.commit()

        return {"message": "Password reset successfully"}

    @staticmethod
    def oauth_login(db: Session, email: str, name: str = None, github_id: str = None, github_token: str = None) -> dict:
        """Login or register via GitHub OAuth."""
        user = db.query(User).filter(User.github_id == github_id).first() if github_id else None

        if not user and email:
            user = db.query(User).filter(User.email == email).first()

        if user:
            if github_id:
                user.github_id = github_id
            if github_token:
                user.github_token = github_token
            if name and not user.name:
                user.name = name
            db.commit()
        else:
            user = User(
                email=email,
                password_hash=hash_password(str(uuid.uuid4())),
                name=name,
                github_id=github_id,
                github_token=github_token
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        access_token = create_access_token(
            data={"sub": user.id, "email": user.email}
        )
        refresh_token = create_refresh_token(
            data={"sub": user.id}
        )

        AuthController._save_refresh_token(db, user.id, refresh_token)

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name
            }
        }