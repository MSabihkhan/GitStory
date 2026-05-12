from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from src.config.settings import settings
from src.config.database import init_db
from src.routes import auth_router, repo_router, integrations_router
import time

app = FastAPI(
    title="GitStory API",
    version="2.0.0",
    description="Unified backend for GitStory - Analytics, RAG, and Documentation"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


# Global error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": "Internal server error"}
    )


# Health check
@app.get("/")
def health_check():
    return {"status": "ok", "message": "GitStory API is running", "version": "2.0.0"}


@app.get("/health")
def health():
    return {"status": "healthy"}


# Register routes
app.include_router(auth_router, prefix="/api")
app.include_router(repo_router, prefix="/api")
app.include_router(integrations_router, prefix="/api")


# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.host, port=settings.port)