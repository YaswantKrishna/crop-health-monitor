"""
NDVI (Normalized Difference Vegetation Index) Service
Formula: NDVI = (NIR - RED) / (NIR + RED)
Sentinel-2 Bands: NIR = B8, RED = B4
"""

import json
import numpy as np
from pathlib import Path
from backend.config import DATA_DIR, HEALTHY_NDVI_THRESHOLD, STRESSED_NDVI_THRESHOLD

def calculate_ndvi(nir, red):
    """
    Computes NDVI given Near-Infrared and Red reflectance values or NumPy arrays.
    Guards against division by zero.
    """
    nir = np.asarray(nir, dtype=float)
    red = np.asarray(red, dtype=float)
    denom = nir + red
    
    # Handle scalar or array zero-division safely
    with np.errstate(divide='ignore', invalid='ignore'):
        ndvi = np.where(denom == 0, 0.0, (nir - red) / denom)
    
    return np.clip(ndvi, -1.0, 1.0)

def get_field_ndvi_data(field_id: str):
    """
    Retrieves NDVI analysis data for a specific agricultural field.
    """
    sample_file = DATA_DIR / "sample_ndvi.json"
    if sample_file.exists():
        with open(sample_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            if field_id in data:
                return data[field_id]
    
    # Default fallback
    return {
        "field_id": field_id,
        "ndvi_mean": 0.65,
        "ndvi_min": 0.58,
        "ndvi_max": 0.71,
        "status": "Healthy",
        "formula": "NDVI = (NIR - RED) / (NIR + RED)",
        "bands": {"NIR": "Sentinel-2 B8 (842 nm)", "RED": "Sentinel-2 B4 (665 nm)"},
        "description": "Normalized Difference Vegetation Index measuring chlorophyll absorption in red and cellular reflectance in NIR."
    }
