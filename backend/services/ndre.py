"""
NDRE (Normalized Difference Red Edge) Service
Formula: NDRE = (NIR - RedEdge) / (NIR + RedEdge)
Sentinel-2 Bands: NIR = B8, RedEdge = B5
"""

import json
import numpy as np
from pathlib import Path
from backend.config import DATA_DIR, HEALTHY_NDRE_THRESHOLD, STRESSED_NDRE_THRESHOLD

def calculate_ndre(nir, red_edge):
    """
    Computes NDRE given Near-Infrared and Red Edge reflectance.
    Effective for dense canopy where NDVI can saturate.
    """
    nir = np.asarray(nir, dtype=float)
    red_edge = np.asarray(red_edge, dtype=float)
    denom = nir + red_edge
    
    with np.errstate(divide='ignore', invalid='ignore'):
        ndre = np.where(denom == 0, 0.0, (nir - red_edge) / denom)
        
    return np.clip(ndre, -1.0, 1.0)

def get_field_ndre_data(field_id: str):
    """
    Retrieves NDRE analysis data for a specific field.
    """
    sample_file = DATA_DIR / "sample_ndre.json"
    if sample_file.exists():
        with open(sample_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            if field_id in data:
                return data[field_id]

    return {
        "field_id": field_id,
        "ndre_mean": 0.44,
        "ndre_min": 0.38,
        "ndre_max": 0.49,
        "status": "Healthy",
        "formula": "NDRE = (NIR - RedEdge) / (NIR + RedEdge)",
        "bands": {"NIR": "Sentinel-2 B8 (842 nm)", "RedEdge": "Sentinel-2 B5 (705 nm)"},
        "description": "Normalized Difference Red Edge index sensitive to chlorophyll concentration in late-stage dense canopies."
    }
