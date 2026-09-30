"""
Crop Health Monitor - Main FastAPI Application
"""

import sys
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Windows UTF-8 console output safe guard
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from backend.config import FRONTEND_DIR, DATA_DIR
from backend.api import fields, analysis, reports

app = FastAPI(
    title="Crop Health Monitoring System",
    description="Satellite-based crop health monitoring using Sentinel-2 MSI, vegetation indices (NDVI/NDRE), cadastral mapping, and temporal stress detection.",
    version="1.0.0"
)

# Enable CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(fields.router)
app.include_router(analysis.router)
app.include_router(reports.router)

# Mount Data directory for static GeoJSON/JSON access
app.mount("/data", StaticFiles(directory=str(DATA_DIR)), name="data")

@app.get("/")
def serve_index():
    """Serves the main frontend dashboard."""
    index_file = FRONTEND_DIR / "index.html"
    return FileResponse(str(index_file))

# Mount Frontend directory at root for relative imports (app.js, style.css)
# This MUST be last — it acts as a catch-all for paths not matched above.
app.mount("/", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "system": "Crop Health Monitor",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    print("=" * 65)
    print("🌱 CROP HEALTH MONITORING SYSTEM — FASTAPI SERVER")
    print("🚀 Running at: http://localhost:8000")
    print("=" * 65)
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
