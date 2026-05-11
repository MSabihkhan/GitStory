# GitStory

GitStory consists of a Next.js frontend and a unified Python FastAPI backend.

## 1. Prerequisites

- Python 3.9+
- Node.js 18+
- GitHub Personal Access Token (for private repos and analysis)
- Gemini / OpenAI API Keys (configured in `.env` or RAG config)
- PostgreSQL (optional - SQLite for local development is included)

## 2. Quick Start (Full Stack)

### Option A: Using the New Unified Backend (Recommended)

#### Backend Setup
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run the server (uses SQLite by default)
python -m uvicorn src.main:app --reload --port 8000
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create environment file (if not exists)
cp .env.local.example .env.local  # or create manually

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

### Option B: Using Legacy Backends (Original)

#### Install Root Dependencies
```bash
pip install -r requirements.txt
```

#### Start RAG Backend (Port 8000)
```bash
uvicorn server:app --host 0.0.0.0 --port 8000
```

#### Start Analysis Backend (Port 8002)
```bash
python api.py
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 3. Features to Test

- **Dashboard (/)**: Index a repository and chat with its codebase.
- **Timeline (/timeline)**: Enter a GitHub URL to generate a narrated history of the project.
- **Hotzone (/hotzone)**: Visualize file churn and see which files are modified most frequently.
- **Review (/review)**: Get an AI-powered code review of recent commits (requires GitHub Token).

## 4. Environment Configuration

### Backend (.env)
Create `backend/.env`:
```
DATABASE_URL=sqlite:///./gitstory.db
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## 5. API Endpoints (Unified Backend)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user (protected)

### Repositories
- `GET /api/repositories` - Get saved repos (protected)
- `GET /api/repositories/github` - Fetch GitHub repos (protected)
- `POST /api/repositories` - Save a repo (protected)

### Integrations
- `POST /api/analyze` - Analyze repo metadata (protected)
- `POST /api/index-repo` - Start RAG indexing (protected)
- `POST /api/chat` - Chat with indexed repo (SSE, protected)
- `GET /api/timeline` - Timeline narration (protected)
- `GET /api/hotzone` - File churn data (protected)
- `POST /api/review` - AI code review (protected)