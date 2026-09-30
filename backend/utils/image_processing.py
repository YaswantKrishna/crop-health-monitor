"""
Image Processing Utilities
Raster normalization, color ramp mappings, and array formatting helpers.
"""

import numpy as np

def normalize_raster(arr: np.ndarray, min_val: float = None, max_val: float = None):
    """
    Normalizes an array to 0.0 - 1.0 range.
    """
    arr = np.asarray(arr, dtype=float)
    if min_val is None:
        min_val = np.nanmin(arr)
    if max_val is None:
        max_val = np.nanmax(arr)
    
    if max_val - min_val == 0:
        return np.zeros_like(arr)
        
    normalized = (arr - min_val) / (max_val - min_val)
    return np.clip(normalized, 0.0, 1.0)

def ndvi_to_color(val: float):
    """
    Maps an NDVI value (-1 to +1) to an RGB hex color string.
    Brown/barren -> Yellow/sparse -> Deep Green/dense
    """
    if val < 0.2:
        return "#8B5A2B" # Barren soil / water
    elif val < 0.4:
        return "#E5C158" # Sparse vegetation
    elif val < 0.6:
        return "#88C158" # Moderate green canopy
    elif val < 0.75:
        return "#2D6A4F" # Healthy canopy
    else:
        return "#1B4332" # Very dense lush vegetation
