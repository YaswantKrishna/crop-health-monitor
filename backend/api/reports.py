"""
Reports API Router
Detailed agronomic reports and audit summaries.
"""

from fastapi import APIRouter
from backend.services.satellite import get_satellite_status
from backend.config import SCIENTIFIC_DISCLAIMER, SAMPLE_DATA_DISCLAIMER

router = APIRouter(prefix="/api/reports", tags=["Reports"])

@router.get("/summary")
def get_executive_report():
    """
    Returns an executive audit report for the monitored agricultural region.
    """
    return {
        "report_title": "Crop Health & Sentinel-2 Observation Audit",
        "domain": "Domain 3.1: Agricultural Sustainability",
        "monitoring_system": "CropPulse Earth Observation Engine",
        "satellite": get_satellite_status(),
        "summary": {
            "total_monitored_fields": 25,
            "overall_canopy_status": "Predominantly Healthy (68%)",
            "action_priority_sectors": ["F-004", "F-013", "F-022"],
            "recommended_action": "Prioritize ground field inspection on flagged sectors to verify irrigation emitter pressure, soil compaction, and leaf symptoms."
        },
        "scientific_disclaimer": SCIENTIFIC_DISCLAIMER,
        "sample_disclaimer": SAMPLE_DATA_DISCLAIMER
    }
