from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from src.config.database import get_db
from src.controllers.auth_controller import AuthController
from src.middleware.auth import get_current_user
import os
import httpx

router = APIRouter(prefix="/auth", tags=["Authentication"])


def get_github_client_id():
    return os.getenv("GITHUB_CLIENT_ID", "")


def get_github_client_secret():
    return os.getenv("GITHUB_CLIENT_SECRET", "")


class GithubOAuthCallbackRequest(BaseModel):
    code: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


class UpdateGithubTokenRequest(BaseModel):
    token: str


@router.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    """Register a new user."""
    try:
        result = AuthController.register(db, req.email, req.password, req.name)
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Registration failed")


@router.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    """Login user."""
    try:
        result = AuthController.login(db, req.email, req.password)
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Login failed")


@router.post("/refresh")
def refresh_token(req: RefreshTokenRequest, db: Session = Depends(get_db)):
    """Refresh access token."""
    try:
        result = AuthController.refresh_access_token(db, req.refresh_token)
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Token refresh failed")


@router.post("/github-token")
def update_github_token(
    req: UpdateGithubTokenRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user's GitHub token."""
    try:
        result = AuthController.update_github_token(db, current_user["user_id"], req.token)
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update token")


@router.get("/me")
def get_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user profile."""
    try:
        result = AuthController.get_user_profile(db, current_user["user_id"])
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to get profile")


@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """Request password reset."""
    try:
        result = AuthController.forgot_password(db, req.email)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to process request")


@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    """Reset password with token."""
    try:
        result = AuthController.reset_password(db, req.token, req.new_password)
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to reset password")


@router.post("/logout")
def logout(
    req: RefreshTokenRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Logout user."""
    try:
        result = AuthController.logout(db, current_user["user_id"], req.refresh_token)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to logout")


@router.get("/github/login")
def github_login():
    """Initiate GitHub OAuth login."""
    client_id = get_github_client_id()
    if not client_id:
        raise HTTPException(status_code=500, detail="GitHub OAuth not configured")

    redirect_uri = "http://localhost:3000/api/auth/github/callback"
    github_auth_url = f"https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope=read:user+user:email"

    return {"success": True, "data": {"authorization_url": github_auth_url}}


@router.post("/github/callback")
async def github_callback(
    req: GithubOAuthCallbackRequest,
    db: Session = Depends(get_db)
):
    """Handle GitHub OAuth callback."""
    client_id = get_github_client_id()
    client_secret = get_github_client_secret()

    if not client_id or not client_secret:
        raise HTTPException(status_code=500, detail="GitHub OAuth not configured")

    print(f"GitHub OAuth callback - code: {req.code[:20] if req.code else 'None'}...")

    token_url = "https://github.com/login/oauth/access_token"
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            token_url,
            data={
                "client_id": client_id,
                "client_secret": client_secret,
                "code": req.code,
            }
        )

        print(f"Token response status: {token_response.status_code}")
        print(f"Token response body: {token_response.text[:200]}")

        if token_response.status_code != 200:
            raise HTTPException(status_code=400, detail=f"Failed to exchange code for token: {token_response.text}")

        # GitHub returns form-encoded data, not JSON
        content = token_response.text
        print(f"Token response content: {content[:200]}")

        # Check for error in response first
        if "error=" in content:
            error_msg = content.split("error_description=")[1].split("&")[0] if "error_description=" in content else "Unknown error"
            raise HTTPException(status_code=400, detail=f"GitHub error: {error_msg}")

        access_token = None
        
        # Parse form-encoded response
        for param in content.split("&"):
            if "=" in param:
                key, val = param.split("=", 1)
                if key == "access_token":
                    access_token = val
                    break

        if not access_token:
            raise HTTPException(status_code=400, detail=f"No access token received. Response: {content}")

        print(f"Got access token, fetching user info...")

        user_response = await client.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/vnd.github.v3+json"
            }
        )

        print(f"User API response status: {user_response.status_code}")
        
        if user_response.status_code != 200:
            print(f"User API error: {user_response.text}")
            raise HTTPException(status_code=400, detail="Failed to get user info")

        github_user = user_response.json()
        print(f"GitHub user: {github_user.get('login')}, email: {github_user.get('email')}")
        
        email = github_user.get("email")

        if not email:
            print("No email in user profile, fetching emails...")
            emails_response = await client.get(
                "https://api.github.com/user/emails",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Accept": "application/vnd.github.v3+json"
                }
            )
            print(f"Emails API response status: {emails_response.status_code}")
            
            if emails_response.status_code == 200:
                emails = emails_response.json()
                print(f"Emails response: {emails}")
                primary_email = next((e["email"] for e in emails if e.get("primary")), None)
                email = primary_email or (emails[0]["email"] if emails else None)

        if not email:
            raise HTTPException(status_code=400, detail="Could not retrieve email from GitHub")

        print(f"Got email: {email}")

        try:
            result = AuthController.oauth_login(
                db,
                email=email,
                name=github_user.get("name", github_user.get("login")),
                github_id=str(github_user.get("id")),
                github_token=access_token
            )
            return {"success": True, "data": result}
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))