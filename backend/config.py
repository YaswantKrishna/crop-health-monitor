"""
Crop Health Monitor - Configuration Module
Configurable thresholds, Sentinel-2 band definitions, and directory paths.
"""

import os
from pathlib import Path

# Base Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
OUTPUTS_DIR = BASE_DIR / "outputs"
FRONTEND_DIR = BASE_DIR / "frontend"

# Ensure output directories exist
for sub in ["ndvi", "ndre", "health_maps"]:
    try:
        (OUTPUTS_DIR / sub).mkdir(parents=True, exist_ok=True)
    except OSError:
        pass

# Sentinel-2 Multispectral Band Mappings
SENTINEL2_BANDS = {
    "BLUE": "B2",
    "GREEN": "B3",
    "RED": "B4",
    "RED_EDGE": "B5",
    "NIR": "B8",
    "SWIR": "B11"
}

# Configurable Crop Health Thresholds
# PRD FR-08: "Thresholds must be configurable. The application must not present a single threshold as universally valid."
HEALTHY_NDVI_THRESHOLD = 0.65
STRESSED_NDVI_THRESHOLD = 0.45

HEALTHY_NDRE_THRESHOLD = 0.42
STRESSED_NDRE_THRESHOLD = 0.28

# Time Comparison Decline Trigger (% drop between consecutive observations)
DECLINE_WARNING_THRESHOLD_PCT = 15.0

# Scientific & Legal Disclaimers
SAMPLE_DATA_DISCLAIMER = "Sample demonstrative field boundaries for prototype testing - not official government cadastral records."
SCIENTIFIC_DISCLAIMER = "Satellite indicators reflect relative canopy greenness and water absorption; they support ground investigation prioritization and do not independently diagnose specific plant pathogens or diseases."
