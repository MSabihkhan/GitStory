from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from src.config.database import Base


class Repository(Base):
    __tablename__ = "repositories"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    full_name = Column(String, nullable=False, index=True)
    url = Column(String, nullable=False)
    description = Column(String, nullable=True)
    is_private = Column(Boolean, default=False)
    is_indexed = Column(Boolean, default=False)
    indexed_at = Column(DateTime, nullable=True)
    language_stats = Column(JSON, nullable=True)
    repo_metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="repositories")
    projects = relationship("Project", back_populates="repository")