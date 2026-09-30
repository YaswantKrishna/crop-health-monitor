"""
Satellite Metadata & Ingestion Service
Manages Sentinel-2 MSI satellite constellation metadata, cloud cover filters, and RGB layer definitions.
"""

from backend.config import SENTINEL2_BANDS

def get_satellite_status():
    """
    Returns live metadata for Sentinel-2 satellite observation context.
    """
    return {
        "satellite": "Sentinel-2 MSI (Multi-Spectral Instrument)",
        "provider": "European Space Agency (ESA) via Google Earth Engine",
        "ground_resolution": "10m (B2, B3, B4, B8) / 20m (B5, B11)",
        "revisit_frequency": "5 days (Constellation 2A + 2B)",
        "atmospheric_correction": "Level-2A Bottom-Of-Atmosphere (BOA) Surface Reflectance",
        "cloud_filter_qa": "< 1% Cloud Masking applied via Scene Classification Layer (SCL)",
        "bands_available": SENTINEL2_BANDS
    }

def get_rgb_layer_metadata():
    """
    Returns natural color RGB specification.
    """
    return {
        "layer_name": "RGB Natural Color View",
        "bands_used": {
            "RED": "B4 (665 nm)",
            "GREEN": "B3 (560 nm)",
            "BLUE": "B2 (490 nm)"
        },
        "description": "True Color Composite representing the realistic visual view of the agricultural landscape as seen by human eye."
    }
