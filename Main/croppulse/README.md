# CropPulse — Satellite-Based Crop Health Monitoring System

**Domain 3.1: Agricultural Sustainability**  
*National Geospatial Hackathon Implementation*

---

## 🛰️ Overview

**CropPulse** is a clean, modern, and minimal satellite-based agricultural monitoring web application. Built strictly following the CropPulse Product Requirements Document (PRD) and Stitch Minimalist Earth Observation Design System (`DESIGN.md`), CropPulse transforms raw multispectral Earth observation data from Sentinel-2 into clear, actionable crop health intelligence.

### 🌟 Core Workflow
1. **Select Area of Interest (AOI):** Choose from major agricultural regions (California Central Valley, Punjab Agro Zone 7, Kansas Corn Belt, Nile Delta) or custom boundaries.
2. **Select Temporal Windows:** Pick current observation window and historical baseline comparison period.
3. **Execute Spectral Processing Pipeline:** Multi-stage cloud filtering, atmospheric correction, and NDVI/NDRE vegetation index calculation.
4. **Physiological Health Classification:** Categorizes fields into **Healthy** (Optimal photosynthesis), **Moderate** (Canopy watch), and **Stressed** (Deficit / anomaly).
5. **Temporal Trend Analysis:** High-resolution multi-date comparison showing phenological progression vs. historical baseline.
6. **Stress Hotspot Detection:** Flags acute vegetation vigor decline with quantitative anomaly scoring.
7. **Actionable Decision Support:** Directs ground scouting protocols (soil moisture probe, irrigation emitter checks, rust symptoms) without over-claiming diagnosis.

---

## 🎨 UI/UX Design System (`DESIGN.md`)

- **Palette:** Deep forest green (`#012d1d`, `#1b4332`), botanical green (`#116c4a`), warm off-white alabaster canvas (`#fcfbf9`), crisp white cards (`#ffffff`), and semantic status indicators:
  - 🟢 **Healthy:** `#2d6a4f` / `#ecfdf5`
  - 🟡 **Moderate:** `#d97706` / `#fffbeb`
  - 🔴 **Stressed:** `#dc2626` / `#fef2f2`
- **Typography:** `Plus Jakarta Sans` for numerical hero metrics, titles, and headers; `Inter` for metadata, telemetry, and dense tables.
- **Geospatial Focus:** The interactive map commands 65–70% of the active visual viewport.
- **Four Integrated Screen States:**
  1. *Empty Initial State:* Minimalist placeholder with cadastre geometries and quick-load presets.
  2. *Pipeline Loading State:* Multi-step checklist with progress bar simulating Sentinel-2 ingestion.
  3. *Results Dashboard:* Interactive map, 4 KPI cards, temporal chart, stress diagnostics, and decision support card.
  4. *Field Detail Drawer:* Contextual slide-out panel with field telemetry, moisture probability, and scout protocol.

---

## 🚀 Quick Start

### Option 1: Run with Python Local Server
```bash
python server.py
```
Open your browser at: **`http://localhost:8000`**

### Option 2: Direct Browser Launch
Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari). Standalone fallback datasets ensure complete offline functionality with zero CORS issues!

---

## 📁 Project Structure

```
croppulse/
├── index.html                 # Unified single-page web application
├── styles.css                 # Custom styles, animations, and tokens from DESIGN.md
├── app.js                     # End-to-end interactive application controller
├── server.py                  # Python local server with API support
├── data/
│   ├── aoi_presets.json       # Telemetry, parcel polygons & protocols for all AOIs
│   └── timeseries.json        # Sentinel-2 temporal NDVI & NDRE profiles
└── README.md                  # Complete documentation
```

---

## 📊 Scientific Transparency & PRD Compliance

- **Vegetation Indices:**
  - $\text{NDVI} = \frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}} = \frac{B8 - B4}{B8 + B4}$
  - $\text{NDRE} = \frac{\text{NIR} - \text{RedEdge}}{\text{NIR} + \text{RedEdge}} = \frac{B8 - B5}{B8 + B5}$
- **Configurable Thresholds:** Users can dynamically adjust classification thresholds in the Settings modal (FR-08).
- **Ground Verification Notice:** Clear disclaimer stating that satellite indices prioritize ground scouting and do not replace in-field agronomic inspection.
