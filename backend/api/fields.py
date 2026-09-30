"""
Fields API Router
Endpoints for field boundaries, metadata, and per-field telemetry.
"""

from fastapi import APIRouter, HTTPException
import json
from pathlib import Path
from backend.config import DATA_DIR, SAMPLE_DATA_DISCLAIMER
from backend.services.ndvi import get_field_ndvi_data
from backend.services.ndre import get_field_ndre_data
from backend.services.classification import get_field_stress_data
from backend.services.timeseries import get_field_timeseries_data

router = APIRouter(prefix="/api/fields", tags=["Fields"])

@router.get("")
def get_all_fields():
    """
    Returns GeoJSON FeatureCollection of all cadastral/field boundaries.
    """
    geojson_path = DATA_DIR / "fields.geojson"
    if not geojson_path.exists():
        raise HTTPException(status_code=404, detail="fields.geojson not found")
        
    with open(geojson_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data

@router.get("/{field_id}")
def get_field_details(field_id: str):
    """
    Returns unified summary details for a specific field.
    """
    geojson_path = DATA_DIR / "fields.geojson"
    if geojson_path.exists():
        with open(geojson_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            for feat in data.get("features", []):
                if feat["properties"]["field_id"].upper() == field_id.upper():
                    props = feat["properties"]
                    return {
                        "field_id": props["field_id"],
                        "field_name": props["field_name"],
                        "crop": props["crop"],
                        "area_ha": props["area_ha"],
                        "farmer_name": props.get("farmer_name", "Local Farmer"),
                        "ndvi": props["ndvi"],
                        "ndre": props["ndre"],
                        "status": props["status"],
                        "stress_level": props["stress_level"],
                        "disclaimer": SAMPLE_DATA_DISCLAIMER
                    }
    
    # If not in geojson, return mock based on ID
    return {
        "field_id": field_id,
        "field_name": f"Parcel {field_id}",
        "crop": "Paddy",
        "area_ha": 2.4,
        "ndvi": 0.68,
        "ndre": 0.47,
        "status": "Healthy",
        "stress_level": "Low",
        "disclaimer": SAMPLE_DATA_DISCLAIMER
    }

@router.get("/{field_id}/ndvi")
def get_field_ndvi(field_id: str):
    """
    Returns NDVI spectral analysis for the specified field.
    Formula: NDVI = (NIR - RED) / (NIR + RED)
    """
    return get_field_ndvi_data(field_id)

@router.get("/{field_id}/ndre")
def get_field_ndre(field_id: str):
    """
    Returns NDRE spectral analysis for the specified field.
    Formula: NDRE = (NIR - RedEdge) / (NIR + RedEdge)
    """
    return get_field_ndre_data(field_id)

@router.get("/{field_id}/stress")
def get_field_stress(field_id: str):
    """
    Returns crop stress classification and diagnostic indicators for the specified field.
    """
    return get_field_stress_data(field_id)

@router.get("/{field_id}/timeseries")
def get_field_timeseries(field_id: str):
    """
    Returns multi-observation temporal progression (August vs September vs October)
    and checks for significant canopy decline.
    """
    return get_field_timeseries_data(field_id)
