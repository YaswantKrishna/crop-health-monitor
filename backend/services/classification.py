"""
Crop Health Classification Service
Categorizes agricultural vegetation into Healthy, Moderate, and Potentially Stressed.
Uses configurable thresholds as specified in PRD Section 9 & 10.
"""

import json
from pathlib import Path
from backend.config import DATA_DIR, HEALTHY_NDVI_THRESHOLD, STRESSED_NDVI_THRESHOLD, SCIENTIFIC_DISCLAIMER

def classify_crop_health(ndvi_value: float, healthy_th: float = HEALTHY_NDVI_THRESHOLD, stressed_th: float = STRESSED_NDVI_THRESHOLD):
    """
    Classifies a vegetation index value into physiological classes.
    """
    if ndvi_value >= healthy_th:
        return {
            "status": "Healthy",
            "badge_color": "green",
            "icon": "🟢",
            "stress_level": "Low",
            "recommendation": "Vegetation vigor appears stable and optimal. Continue scheduled routine monitoring."
        }
    elif ndvi_value <= stressed_th:
        return {
            "status": "Potentially Stressed",
            "badge_color": "red",
            "icon": "🔴",
            "stress_level": "High",
            "recommendation": "Potential crop stress detected. Prioritize ground inspection: verify irrigation availability, root-zone soil moisture, and check for pest/fungal symptoms."
        }
    else:
        return {
            "status": "Moderate",
            "badge_color": "yellow",
            "icon": "🟡",
            "stress_level": "Moderate",
            "recommendation": "Canopy vigor is in a transitional state. Monitor upcoming satellite overpass and check localized nitrogen/water distribution."
        }

def get_field_stress_data(field_id: str):
    """
    Retrieves stress diagnostics for a field.
    """
    sample_file = DATA_DIR / "sample_stress.json"
    if sample_file.exists():
        with open(sample_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            if field_id in data:
                return data[field_id]

    return {
        "field_id": field_id,
        "status": "Healthy",
        "stress_level": "Low",
        "anomaly_score": 15.0,
        "potential_factors": ["Normal crop growth"],
        "recommendation": "Continue routine monitoring.",
        "scientific_disclaimer": SCIENTIFIC_DISCLAIMER
    }
