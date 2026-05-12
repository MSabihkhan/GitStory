import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import StaticPool

# Use absolute path for Windows
db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "gitstory.db"))
DATABASE_URL = f"sqlite:///{db_path.replace(os.sep, '/')}"
print(f"Using DATABASE_URL: {DATABASE_URL}")

connect_args = {}
if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    poolclass=StaticPool if "sqlite" in DATABASE_URL else None,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database tables."""
    from src.models import user, repository, project
    Base.metadata.create_all(bind=engine)