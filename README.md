# 🌾 Crop Health Monitoring System

> An end-to-end satellite-based agricultural field monitoring dashboard utilizing Sentinel-2 MSI multispectral reflectance data, cadastral parcel mapping, vegetation indices (NDVI/NDRE), and multi-temporal stress detection.

Built for **GEOIMPATHON (Domain 3.1: Crop Health Monitoring System)**.

---

## 🌟 Key Features

1. **Interactive Agricultural Map (Leaflet)**:
   - Cadastral property parcel layer with 25 field boundaries in EPSG:4326.
   - High-resolution ESRI Satellite imagery base.
   - RGB Natural Color view.
   - NDVI (Normalized Difference Vegetation Index) color scale.
   - NDRE (Normalized Difference Red Edge) chlorophyll index.
   - Crop Stress classification layer (Healthy 🟢, Moderate 🟡, Stressed 🔴).
   - HUD map controls: Zoom In/Out, Reset View, Fullscreen, and Fit Field to selected parcel.
   - Dynamic contextual legend updating with layer selection.

2. **Field Telemetry & Analytical Panel**:
   - Interactive field boundary selection with active polygon highlight.
   - Instant calculation of area, mean NDVI, mean NDRE, and current health status.
   - Scientific disclaimer distinguishing spectral anomalies from confirmed root causes.

3. **Multi-Temporal Crop Monitoring (August – October)**:
   - Multi-observation timeseries tracking canopy vigor across the growing season.
   - Dynamic SVG area and line chart.
   - Automated vegetation decline detection warning (`⚠️ Potential decline in crop condition`).

4. **FastAPI Modular Backend**:
   - `GET /api/fields`: GeoJSON FeatureCollection of field boundaries.
   - `GET /api/fields/{id}`: Detailed parcel telemetry.
   - `GET /api/fields/{id}/ndvi`: NDVI spectral calculation and historical series.
   - `GET /api/fields/{id}/ndre`: NDRE chlorophyll calculations.
   - `GET /api/fields/{id}/stress`: Stress indicators and ground recommendations.
   - `GET /api/fields/{id}/timeseries`: Multi-observation progression and decline alerts.
   - `GET /api/analysis/summary`: Regional KPI metrics across all parcels.
   - `GET /api/reports/summary`: Executive agricultural summary.

---

## 🚀 Local Development

```bash
# Clone the repository
git clone <repo-url>
cd crop-health-monitor

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

Open `http://localhost:8000` in your web browser.

---

## ☁️ Deployment on Vercel

Configured for **Vercel** out-of-the-box:
- Static assets served via Edge CDN (`public/`).
- Backend API powered by Vercel Python Serverless Functions (`api/index.py` -> FastAPI).
- Custom routing configured in `vercel.json`.

---

## 📁 Repository Structure

```
crop-health-monitor/
├── api/                   # Vercel serverless functions entrypoint
├── backend/               # FastAPI application
│   ├── api/               # API route controllers
│   ├── services/          # NDVI, NDRE, Classification & Timeseries services
│   ├── utils/             # Raster processing & color palettes
│   ├── config.py          # Configurable thresholds & band definitions
│   └── main.py            # FastAPI main app
├── data/                  # Cadastral GeoJSON & satellite sample data
├── frontend/              # HTML, CSS, JavaScript frontend
├── public/                # Static assets for Vercel deployment
├── Main/                  # Supplementary project assets (CropPulse suite)
├── vercel.json            # Vercel deployment configuration
├── requirements.txt       # Python dependencies
└── README.md
```
