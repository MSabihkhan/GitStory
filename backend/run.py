import sys
import os

# Add project root to Python path
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)

# Set environment variables from .env
from dotenv import load_dotenv
load_dotenv(os.path.join(project_root, "..", ".env"))

# Run uvicorn
import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=8005,
        reload=True,
        reload_dirs=[os.path.join(project_root, "src")]
    )