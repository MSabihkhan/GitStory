# GitStory Backend

Unified FastAPI backend for GitStory - handles authentication, repository management, RAG indexing, and AI analysis.

## Prerequisites

- Python 3.9+
- PostgreSQL (or use SQLite for local development)
- Node.js 18+ (for frontend)

## Installation

```bash
cd backend
pip install -r requirements.txt
```

## Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your settings:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Your frontend URL (default: http://localhost:3000)
- `GITHUB_TOKEN` - Optional, for analyzing private repos

## Database Setup

### Option 1: PostgreSQL (Production)

Create a database and update `DATABASE_URL`:
```
postgresql://username:password@localhost:5432/gitstory
```

### Option 2: SQLite (Development)

Set in `.env`:
```
DATABASE_URL=sqlite:///./gitstory.db
```

### Initialize Database

```bash
# The database will be created automatically on startup
# Or manually run:
python -c "from src.config.database import init_db; init_db()"
```

## Running the Server

```bash
# Development
python -m uvicorn src.main:app --reload --port 8000

# Or directly
python src/main.py
```

Server runs at: http://localhost:8000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/github-token` - Save GitHub token (protected)
- `GET /api/auth/me` - Get current user (protected)

### Repositories
- `GET /api/repositories` - Get saved repos (protected)
- `GET /api/repositories/github` - Fetch user's GitHub repos (protected)
- `POST /api/repositories` - Save a repo (protected)

### Integrations
- `POST /api/analyze` - Analyze repo metadata (protected)
- `POST /api/index-repo` - Start RAG indexing (protected)
- `GET /api/index-repo/status/{job_id}` - Check indexing status
- `POST /api/chat` - Chat with indexed repo (SSE, protected)
- `GET /api/timeline` - Get timeline narration (protected)
- `GET /api/hotzone` - Get file churn data (protected)
- `POST /api/review` - AI code review (protected)

## Testing

```bash
# Run tests
pytest

# Test a specific endpoint
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "name": "Test User"}'
```

## Project Structure

```
backend/
├── src/
│   ├── config/         # Database and settings
│   ├── models/        # SQLAlchemy models
│   ├── routes/        # API route handlers
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth middleware
│   ├── services/      # External integrations
│   ├── utils/         # Helper functions
│   └── main.py        # App entry point
├── .env.example       # Environment variables template
├── requirements.txt   # Python dependencies
└── README.md          # This file
```