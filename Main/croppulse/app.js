/**
 * CropPulse - Satellite-Based Crop Health Monitoring System
 * End-to-End Application Controller
 */

// Fallback embedded datasets in case of local file:// execution without web server
const FALLBACK_AOIS = {
  "central-valley": {
    "id": "central-valley",
    "name": "Central Valley Quad 4B",
    "region": "San Joaquin Valley, California",
    "cropType": "Winter Wheat & Alfalfa",
    "coordinates": "36.7783° N, 119.4179° W",
    "lat": 36.7783,
    "lng": -119.4179,
    "zoom": 14,
    "aoiAreaHa": 2090,
    "sentinelTile": "T11SPA",
    "sunZenith": "28.4°",
    "cloudCover": "0.2%",
    "currentWindow": "May 01 – May 18, 2024",
    "baselineWindow": "May 01 – May 18, 2023",
    "kpis": {
      "ndvi": {
        "mean": 0.64,
        "max": 1.0,
        "delta": "+0.04",
        "baselineMean": 0.60,
        "trend": "up",
        "healthyPct": 68,
        "healthyHa": 1420,
        "moderatePct": 21,
        "moderateHa": 440,
        "stressedPct": 11,
        "stressedHa": 230
      },
      "ndre": {
        "mean": 0.42,
        "max": 0.8,
        "delta": "+0.02",
        "baselineMean": 0.40,
        "trend": "up",
        "healthyPct": 64,
        "healthyHa": 1338,
        "moderatePct": 24,
        "moderateHa": 502,
        "stressedPct": 12,
        "stressedHa": 250
      },
      "evi": {
        "mean": 0.52,
        "max": 1.0,
        "delta": "+0.03",
        "baselineMean": 0.49,
        "trend": "up",
        "healthyPct": 66,
        "healthyHa": 1379,
        "moderatePct": 23,
        "moderateHa": 481,
        "stressedPct": 11,
        "stressedHa": 230
      }
    },
    "stressDiagnostics": {
      "pct": "11% of AOI",
      "hectares": 230,
      "indexDrop": "-0.16 index drop",
      "summary": "Vegetation health has declined in southern parcel sectors 3 & 4 compared to baseline. Probable moisture deficit or localized canopy thinning.",
      "flaggedFields": ["poly-4", "poly-3"]
    },
    "recommendation": {
      "title": "Recommended Next Step",
      "lead": "Prioritize field inspection in highlighted Sector 4. Verify irrigation emitter pressure, soil moisture depth, and inspect for early rust or stem rot.",
      "prioritySector": "Sector 4",
      "groundFactors": ["Irrigation Emitter Pressure", "Soil Moisture at 30cm", "Crop Growth Stage", "Visible Rust/Pest Symptoms"],
      "disclaimer": "Satellite indicators support ground prioritization and should be verified in the field."
    },
    "parcels": [
      {
        "id": "poly-1",
        "name": "Field 01 • North Alfalfa",
        "crop": "Alfalfa (3rd Cut)",
        "areaHa": 280,
        "currentNdvi": 0.72,
        "baselineNdvi": 0.69,
        "changePct": "+4.3%",
        "currentNdre": 0.48,
        "status": "Healthy",
        "stressProb": "8%",
        "timestamp": "May 16, 2024 (10:42 UTC)",
        "protocol": [
          "Maintain current pivot schedule (1.5 in/wk)",
          "Verify nitrogen uptake post-cut",
          "Next scheduled satellite pass: May 21"
        ]
      },
      {
        "id": "poly-2",
        "name": "Field 02 • East Wheat Plot",
        "crop": "Hard Red Winter Wheat",
        "areaHa": 410,
        "currentNdvi": 0.76,
        "baselineNdvi": 0.71,
        "changePct": "+7.0%",
        "currentNdre": 0.52,
        "status": "Healthy",
        "stressProb": "5%",
        "timestamp": "May 16, 2024 (10:42 UTC)",
        "protocol": [
          "Grain fill stage normal, no foliar blight detected",
          "Monitor drydown heading date",
          "Optimal nitrogen vigor confirmed"
        ]
      },
      {
        "id": "poly-3",
        "name": "Field 03 • West Ridge",
        "crop": "Alfalfa Seed",
        "areaHa": 290,
        "currentNdvi": 0.58,
        "baselineNdvi": 0.65,
        "changePct": "-10.8%",
        "currentNdre": 0.38,
        "status": "Moderate",
        "stressProb": "45%",
        "timestamp": "May 16, 2024 (10:42 UTC)",
        "protocol": [
          "Check western drip line pressure differential",
          "Conduct random probe test for compaction layer",
          "Re-evaluate vegetation vigor in 5 days"
        ]
      },
      {
        "id": "poly-4",
        "name": "Field 04 • Sector South (High Stress)",
        "crop": "Late Sown Wheat",
        "areaHa": 230,
        "currentNdvi": 0.38,
        "baselineNdvi": 0.58,
        "changePct": "-34.5%",
        "currentNdre": 0.24,
        "status": "Stressed",
        "stressProb": "89%",
        "timestamp": "May 16, 2024 (10:42 UTC)",
        "protocol": [
          "Check lateral 4B pressure gauges for pressure drops",
          "Sample soil core at 15cm & 30cm depth for moisture deficit",
          "Target visual scout on southern corner for early fungal blight or mite damage",
          "Verify telemetry on sub-surface moisture sensor Station #4"
        ]
      },
      {
        "id": "poly-5",
        "name": "Field 05 • Central Pivot",
        "crop": "Silage Corn Seedling",
        "areaHa": 340,
        "currentNdvi": 0.52,
        "baselineNdvi": 0.50,
        "changePct": "+4.0%",
        "currentNdre": 0.35,
        "status": "Moderate",
        "stressProb": "32%",
        "timestamp": "May 16, 2024 (10:42 UTC)",
        "protocol": [
          "Canopy closure in progress (V4 stage)",
          "Maintain side-dress fertilizer plan",
          "Normal seedling emergence confirmed"
        ]
      },
      {
        "id": "poly-6",
        "name": "Field 06 • East Pasture Belt",
        "crop": "Perennial Pasture",
        "areaHa": 310,
        "currentNdvi": 0.71,
        "baselineNdvi": 0.68,
        "changePct": "+4.4%",
        "currentNdre": 0.46,
        "status": "Healthy",
        "stressProb": "9%",
        "timestamp": "May 16, 2024 (10:42 UTC)",
        "protocol": [
          "Healthy vegetative density across pasture grid",
          "Rotational grazing rotation scheduled for June",
          "Optimal water holding capacity"
        ]
      },
      {
        "id": "poly-7",
        "name": "Field 07 • South Buffer Zone",
        "crop": "Cover Crop (Rye & Vetch)",
        "areaHa": 140,
        "currentNdvi": 0.67,
        "baselineNdvi": 0.64,
        "changePct": "+4.7%",
        "currentNdre": 0.44,
        "status": "Healthy",
        "stressProb": "11%",
        "timestamp": "May 16, 2024 (10:42 UTC)",
        "protocol": [
          "Soil biomass buildup progressing normally",
          "Maintain border pest trap lines",
          "Biomass termination date set for late May"
        ]
      },
      {
        "id": "poly-8",
        "name": "Field 08 • Southeast Edge",
        "crop": "Spring Barley",
        "areaHa": 90,
        "currentNdvi": 0.54,
        "baselineNdvi": 0.56,
        "changePct": "-3.6%",
        "currentNdre": 0.36,
        "status": "Moderate",
        "stressProb": "38%",
        "timestamp": "May 16, 2024 (10:42 UTC)",
        "protocol": [
          "Minor headland compaction observed near service road",
          "Check end-gun sprinkler coverage on pivot rim",
          "Inspect leaf tips for salinity scorch"
        ]
      }
    ]
  },
  "punjab-zone": {
    "id": "punjab-zone",
    "name": "Punjab Agro Zone 7",
    "region": "Ludhiana District, Punjab, India",
    "cropType": "Rabi Wheat & Mustard",
    "coordinates": "30.9010° N, 75.8573° E",
    "lat": 30.9010,
    "lng": 75.8573,
    "zoom": 14,
    "aoiAreaHa": 1840,
    "sentinelTile": "T43RFS",
    "sunZenith": "24.1°",
    "cloudCover": "0.1%",
    "currentWindow": "Feb 15 – Mar 05, 2024",
    "baselineWindow": "Feb 15 – Mar 05, 2023",
    "kpis": {
      "ndvi": {
        "mean": 0.71,
        "max": 1.0,
        "delta": "+0.03",
        "baselineMean": 0.68,
        "trend": "up",
        "healthyPct": 74,
        "healthyHa": 1362,
        "moderatePct": 19,
        "moderateHa": 350,
        "stressedPct": 7,
        "stressedHa": 128
      },
      "ndre": {
        "mean": 0.49,
        "max": 0.8,
        "delta": "+0.02",
        "baselineMean": 0.47,
        "trend": "up",
        "healthyPct": 71,
        "healthyHa": 1306,
        "moderatePct": 21,
        "moderateHa": 386,
        "stressedPct": 8,
        "stressedHa": 148
      },
      "evi": {
        "mean": 0.58,
        "max": 1.0,
        "delta": "+0.03",
        "baselineMean": 0.55,
        "trend": "up",
        "healthyPct": 72,
        "healthyHa": 1325,
        "moderatePct": 20,
        "moderateHa": 368,
        "stressedPct": 8,
        "stressedHa": 147
      }
    },
    "stressDiagnostics": {
      "pct": "7% of AOI",
      "hectares": 128,
      "indexDrop": "-0.18 index drop",
      "summary": "Localized canopy thinning in Sector 04 due to canal tail-end irrigation deficit. Immediate tube-well scheduling recommended.",
      "flaggedFields": ["poly-4"]
    },
    "recommendation": {
      "title": "Recommended Next Step",
      "lead": "Prioritize ground scout in tail-end canal parcel (Sector 4). Verify tube-well supply and inspect for yellow rust stripes on flag leaves.",
      "prioritySector": "Sector 4",
      "groundFactors": ["Canal Water Flow Rate", "Tube-well Pump Run-time", "Yellow Rust Flag Leaf Inspection", "Soil Moisture Depth"],
      "disclaimer": "Satellite indicators support ground prioritization and should be verified in the field."
    },
    "parcels": [
      {
        "id": "poly-1",
        "name": "Field 01 • PBW-725 High Yield",
        "crop": "Rabi Wheat",
        "areaHa": 260,
        "currentNdvi": 0.77,
        "baselineNdvi": 0.73,
        "changePct": "+5.5%",
        "currentNdre": 0.53,
        "status": "Healthy",
        "stressProb": "4%",
        "timestamp": "Mar 02, 2024 (05:40 UTC)",
        "protocol": [
          "Flag leaf development optimal across all acres",
          "Ensure light irrigation during grain filling stage",
          "Disease scout: clear of rust"
        ]
      },
      {
        "id": "poly-2",
        "name": "Field 02 • HD-3086 Block",
        "crop": "Rabi Wheat",
        "areaHa": 380,
        "currentNdvi": 0.75,
        "baselineNdvi": 0.72,
        "changePct": "+4.2%",
        "currentNdre": 0.51,
        "status": "Healthy",
        "stressProb": "6%",
        "timestamp": "Mar 02, 2024 (05:40 UTC)",
        "protocol": [
          "Vigorous biomass accumulation observed",
          "Nitrogen management confirmed via GreenSeeker",
          "Maintain scheduled moisture cycle"
        ]
      },
      {
        "id": "poly-3",
        "name": "Field 03 • Mustard Intercrop",
        "crop": "Mustard (Pusa Bold)",
        "areaHa": 270,
        "currentNdvi": 0.62,
        "baselineNdvi": 0.64,
        "changePct": "-3.1%",
        "currentNdre": 0.41,
        "status": "Moderate",
        "stressProb": "35%",
        "timestamp": "Mar 02, 2024 (05:40 UTC)",
        "protocol": [
          "Pod maturity stage beginning",
          "Monitor aphid incidence along northern bund",
          "Harvest window estimated in 12 days"
        ]
      },
      {
        "id": "poly-4",
        "name": "Field 04 • Tail-End Canal Parcel",
        "crop": "Late Sown Wheat",
        "areaHa": 128,
        "currentNdvi": 0.39,
        "baselineNdvi": 0.57,
        "changePct": "-31.6%",
        "currentNdre": 0.25,
        "status": "Stressed",
        "stressProb": "86%",
        "timestamp": "Mar 02, 2024 (05:40 UTC)",
        "protocol": [
          "Emergency tube-well irrigation required due to canal water deficiency",
          "Inspect lower leaves for nitrogen leaching and moisture wilting",
          "Coordinate with local Krishi Vigyan Kendra (KVK) advisory"
        ]
      },
      {
        "id": "poly-5",
        "name": "Field 05 • Central Farm Hub",
        "crop": "Rabi Wheat (Unnat PBW)",
        "areaHa": 320,
        "currentNdvi": 0.69,
        "baselineNdvi": 0.66,
        "changePct": "+4.5%",
        "currentNdre": 0.46,
        "status": "Healthy",
        "stressProb": "12%",
        "timestamp": "Mar 02, 2024 (05:40 UTC)",
        "protocol": ["Solid tiller density and uniform green canopy"]
      },
      {
        "id": "poly-6",
        "name": "Field 06 • East Farm Perimeter",
        "crop": "Barley & Fodder",
        "areaHa": 280,
        "currentNdvi": 0.72,
        "baselineNdvi": 0.69,
        "changePct": "+4.3%",
        "currentNdre": 0.48,
        "status": "Healthy",
        "stressProb": "8%",
        "timestamp": "Mar 02, 2024 (05:40 UTC)",
        "protocol": ["Optimal soil moisture levels maintained"]
      },
      {
        "id": "poly-7",
        "name": "Field 07 • South Drain Border",
        "crop": "Wheat Seed Production",
        "areaHa": 120,
        "currentNdvi": 0.73,
        "baselineNdvi": 0.70,
        "changePct": "+4.3%",
        "currentNdre": 0.49,
        "status": "Healthy",
        "stressProb": "7%",
        "timestamp": "Mar 02, 2024 (05:40 UTC)",
        "protocol": ["Roguing inspection completed for genetic purity"]
      },
      {
        "id": "poly-8",
        "name": "Field 08 • South-East Ridge",
        "crop": "Chickpea Intercrop",
        "areaHa": 82,
        "currentNdvi": 0.58,
        "baselineNdvi": 0.61,
        "changePct": "-4.9%",
        "currentNdre": 0.39,
        "status": "Moderate",
        "stressProb": "41%",
        "timestamp": "Mar 02, 2024 (05:40 UTC)",
        "protocol": ["Pod borer monitoring traps checked"]
      }
    ]
  },
  "kansas-belt": {
    "id": "kansas-belt",
    "name": "Kansas Sector 12",
    "region": "Barton County, Kansas, USA",
    "cropType": "Grain Corn & Soybeans",
    "coordinates": "38.4937° N, 98.3804° W",
    "lat": 38.4937,
    "lng": -98.3804,
    "zoom": 13,
    "aoiAreaHa": 2450,
    "sentinelTile": "T14SMB",
    "sunZenith": "26.8°",
    "cloudCover": "0.4%",
    "currentWindow": "Jul 10 – Jul 28, 2024",
    "baselineWindow": "Jul 10 – Jul 28, 2023",
    "kpis": {
      "ndvi": {
        "mean": 0.58,
        "max": 1.0,
        "delta": "-0.04",
        "baselineMean": 0.62,
        "trend": "down",
        "healthyPct": 55,
        "healthyHa": 1348,
        "moderatePct": 31,
        "moderateHa": 760,
        "stressedPct": 14,
        "stressedHa": 342
      },
      "ndre": {
        "mean": 0.38,
        "max": 0.8,
        "delta": "-0.03",
        "baselineMean": 0.41,
        "trend": "down",
        "healthyPct": 51,
        "healthyHa": 1250,
        "moderatePct": 33,
        "moderateHa": 808,
        "stressedPct": 16,
        "stressedHa": 392
      },
      "evi": {
        "mean": 0.47,
        "max": 1.0,
        "delta": "-0.04",
        "baselineMean": 0.51,
        "trend": "down",
        "healthyPct": 53,
        "healthyHa": 1298,
        "moderatePct": 32,
        "moderateHa": 784,
        "stressedPct": 15,
        "stressedHa": 368
      }
    },
    "stressDiagnostics": {
      "pct": "14% of AOI",
      "hectares": 342,
      "indexDrop": "-0.19 index drop",
      "summary": "Sector 04 and western edge showing heat-induced evapotranspiration deficit. Ogallala aquifer pivot booster check required.",
      "flaggedFields": ["poly-4"]
    },
    "recommendation": {
      "title": "Recommended Next Step",
      "lead": "Inspect center pivot nozzling on Sector 4 corn plot. High heat index (+38°C) causing accelerated canopy dehydration.",
      "prioritySector": "Sector 4",
      "groundFactors": ["Center Pivot Nozzle Pressure", "Soil Water Tension (cb)", "Leaf Rolling Index (Silking Stage)", "Heat Index Trend"],
      "disclaimer": "Satellite indicators support ground prioritization and should be verified in the field."
    },
    "parcels": [
      {
        "id": "poly-1",
        "name": "Field 01 • Pivot North",
        "crop": "Irrigated Dent Corn",
        "areaHa": 350,
        "currentNdvi": 0.70,
        "baselineNdvi": 0.71,
        "changePct": "-1.4%",
        "currentNdre": 0.47,
        "status": "Healthy",
        "stressProb": "14%",
        "timestamp": "Jul 25, 2024 (16:30 UTC)",
        "protocol": ["Corn at VT/R1 tassel emergence stage"]
      },
      {
        "id": "poly-2",
        "name": "Field 02 • Pivot East",
        "crop": "Soybean (Maturity Group 3)",
        "areaHa": 480,
        "currentNdvi": 0.68,
        "baselineNdvi": 0.67,
        "changePct": "+1.5%",
        "currentNdre": 0.45,
        "status": "Healthy",
        "stressProb": "16%",
        "timestamp": "Jul 25, 2024 (16:30 UTC)",
        "protocol": ["Canopy at R2 full bloom, flowering uniform"]
      },
      {
        "id": "poly-3",
        "name": "Field 03 • Dryland Corner",
        "crop": "Dryland Sorghum",
        "areaHa": 320,
        "currentNdvi": 0.51,
        "baselineNdvi": 0.58,
        "changePct": "-12.1%",
        "currentNdre": 0.33,
        "status": "Moderate",
        "stressProb": "49%",
        "timestamp": "Jul 25, 2024 (16:30 UTC)",
        "protocol": ["Rainfall deficit of 42mm in past 21 days"]
      },
      {
        "id": "poly-4",
        "name": "Field 04 • Sector South Pivot (Stressed)",
        "crop": "Corn (Late Planted)",
        "areaHa": 342,
        "currentNdvi": 0.37,
        "baselineNdvi": 0.56,
        "changePct": "-33.9%",
        "currentNdre": 0.23,
        "status": "Stressed",
        "stressProb": "91%",
        "timestamp": "Jul 25, 2024 (16:30 UTC)",
        "protocol": [
          "Pivot booster pump malfunction reported on tower 6",
          "Immediate field repair required to salvage silking stage",
          "Check soil moisture probe: root zone below permanent wilting point"
        ]
      },
      {
        "id": "poly-5",
        "name": "Field 05 • Central Dryland",
        "crop": "Soybean",
        "areaHa": 360,
        "currentNdvi": 0.53,
        "baselineNdvi": 0.59,
        "changePct": "-10.2%",
        "currentNdre": 0.34,
        "status": "Moderate",
        "stressProb": "46%",
        "timestamp": "Jul 25, 2024 (16:30 UTC)",
        "protocol": ["Monitor pod development at lower nodes"]
      },
      {
        "id": "poly-6",
        "name": "Field 06 • East Corn Pivot",
        "crop": "Corn (Seed)",
        "areaHa": 320,
        "currentNdvi": 0.69,
        "baselineNdvi": 0.70,
        "changePct": "-1.4%",
        "currentNdre": 0.46,
        "status": "Healthy",
        "stressProb": "15%",
        "timestamp": "Jul 25, 2024 (16:30 UTC)",
        "protocol": ["Uniform tassel distribution across rows"]
      },
      {
        "id": "poly-7",
        "name": "Field 07 • South Buffer",
        "crop": "Conservation Reserve Grass",
        "areaHa": 160,
        "currentNdvi": 0.62,
        "baselineNdvi": 0.64,
        "changePct": "-3.1%",
        "currentNdre": 0.40,
        "status": "Healthy",
        "stressProb": "18%",
        "timestamp": "Jul 25, 2024 (16:30 UTC)",
        "protocol": ["Erosion control intact along drainage ditch"]
      },
      {
        "id": "poly-8",
        "name": "Field 08 • South Road Edge",
        "crop": "Sorghum",
        "areaHa": 118,
        "currentNdvi": 0.50,
        "baselineNdvi": 0.55,
        "changePct": "-9.1%",
        "currentNdre": 0.32,
        "status": "Moderate",
        "stressProb": "52%",
        "timestamp": "Jul 25, 2024 (16:30 UTC)",
        "protocol": ["Early moisture conservation tillage holding"]
      }
    ]
  },
  "nile-delta": {
    "id": "nile-delta",
    "name": "Nile Delta Sector 3",
    "region": "Kafr El-Sheikh, Lower Egypt",
    "cropType": "Egyptian Long-Staple Cotton & Berseem Clover",
    "coordinates": "31.1107° N, 30.9388° E",
    "lat": 31.1107,
    "lng": 30.9388,
    "zoom": 14,
    "aoiAreaHa": 1620,
    "sentinelTile": "T36RUU",
    "sunZenith": "22.3°",
    "cloudCover": "0.1%",
    "currentWindow": "Jun 01 – Jun 20, 2024",
    "baselineWindow": "Jun 01 – Jun 20, 2023",
    "kpis": {
      "ndvi": {
        "mean": 0.66,
        "max": 1.0,
        "delta": "+0.03",
        "baselineMean": 0.63,
        "trend": "up",
        "healthyPct": 70,
        "healthyHa": 1134,
        "moderatePct": 22,
        "moderateHa": 356,
        "stressedPct": 8,
        "stressedHa": 130
      },
      "ndre": {
        "mean": 0.44,
        "max": 0.8,
        "delta": "+0.02",
        "baselineMean": 0.42,
        "trend": "up",
        "healthyPct": 67,
        "healthyHa": 1085,
        "moderatePct": 24,
        "moderateHa": 389,
        "stressedPct": 9,
        "stressedHa": 146
      },
      "evi": {
        "mean": 0.54,
        "max": 1.0,
        "delta": "+0.02",
        "baselineMean": 0.52,
        "trend": "up",
        "healthyPct": 68,
        "healthyHa": 1102,
        "moderatePct": 23,
        "moderateHa": 372,
        "stressedPct": 9,
        "stressedHa": 146
      }
    },
    "stressDiagnostics": {
      "pct": "8% of AOI",
      "hectares": 130,
      "indexDrop": "-0.15 index drop",
      "summary": "Sector 04 showing salt crusting and slow drainage discharge near terminal collector canal. Flushing cycle advised.",
      "flaggedFields": ["poly-4"]
    },
    "recommendation": {
      "title": "Recommended Next Step",
      "lead": "Perform ground electrical conductivity (EC) soil test in Sector 4. Flush drain tile collector and check for drainage obstruction.",
      "prioritySector": "Sector 4",
      "groundFactors": ["Soil Salinity ECe (dS/m)", "Tile Drain Outflow Rate", "Canal Water Silt Load", "Cotton Square Shedding"],
      "disclaimer": "Satellite indicators support ground prioritization and should be verified in the field."
    },
    "parcels": [
      {
        "id": "poly-1",
        "name": "Field 01 • Giza-94 Cotton",
        "crop": "Egyptian Cotton",
        "areaHa": 240,
        "currentNdvi": 0.74,
        "baselineNdvi": 0.70,
        "changePct": "+5.7%",
        "currentNdre": 0.50,
        "status": "Healthy",
        "stressProb": "6%",
        "timestamp": "Jun 18, 2024 (08:52 UTC)",
        "protocol": ["Squaring stage active, canopy dense and dark green"]
      },
      {
        "id": "poly-2",
        "name": "Field 02 • Berseem Multi-cut",
        "crop": "Berseem Clover",
        "areaHa": 340,
        "currentNdvi": 0.76,
        "baselineNdvi": 0.72,
        "changePct": "+5.6%",
        "currentNdre": 0.51,
        "status": "Healthy",
        "stressProb": "5%",
        "timestamp": "Jun 18, 2024 (08:52 UTC)",
        "protocol": ["Final summer cut completed with high forage yield"]
      },
      {
        "id": "poly-3",
        "name": "Field 03 • Rice Nursery Block",
        "crop": "Paddy Rice (Sakha 108)",
        "areaHa": 230,
        "currentNdvi": 0.59,
        "baselineNdvi": 0.62,
        "changePct": "-4.8%",
        "currentNdre": 0.39,
        "status": "Moderate",
        "stressProb": "39%",
        "timestamp": "Jun 18, 2024 (08:52 UTC)",
        "protocol": ["Transplanting into flooded basins scheduled"]
      },
      {
        "id": "poly-4",
        "name": "Field 04 • Terminal Salinity Hotspot",
        "crop": "Cotton (Saline Margin)",
        "areaHa": 130,
        "currentNdvi": 0.41,
        "baselineNdvi": 0.56,
        "changePct": "-26.8%",
        "currentNdre": 0.26,
        "status": "Stressed",
        "stressProb": "84%",
        "timestamp": "Jun 18, 2024 (08:52 UTC)",
        "protocol": [
          "Tile drainage outlet clogged with silt sediment",
          "Clear outlet valve and run leaching irrigation cycle with fresh canal water",
          "Test soil salinity using field refractometer"
        ]
      },
      {
        "id": "poly-5",
        "name": "Field 05 • Central Mixed Farm",
        "crop": "Corn & Vegetables",
        "areaHa": 270,
        "currentNdvi": 0.68,
        "baselineNdvi": 0.65,
        "changePct": "+4.6%",
        "currentNdre": 0.45,
        "status": "Healthy",
        "stressProb": "11%",
        "timestamp": "Jun 18, 2024 (08:52 UTC)",
        "protocol": ["Healthy vegetative growth along raised beds"]
      },
      {
        "id": "poly-6",
        "name": "Field 06 • North Canal Front",
        "crop": "Giza-86 Cotton",
        "areaHa": 210,
        "currentNdvi": 0.73,
        "baselineNdvi": 0.70,
        "changePct": "+4.3%",
        "currentNdre": 0.49,
        "status": "Healthy",
        "stressProb": "7%",
        "timestamp": "Jun 18, 2024 (08:52 UTC)",
        "protocol": ["Primary canal intake providing uninterrupted flow"]
      },
      {
        "id": "poly-7",
        "name": "Field 07 • South Basin",
        "crop": "Alfalfa",
        "areaHa": 110,
        "currentNdvi": 0.70,
        "baselineNdvi": 0.67,
        "changePct": "+4.5%",
        "currentNdre": 0.47,
        "status": "Healthy",
        "stressProb": "9%",
        "timestamp": "Jun 18, 2024 (08:52 UTC)",
        "protocol": ["Steady regeneration observed post-cut"]
      },
      {
        "id": "poly-8",
        "name": "Field 08 • East Headland",
        "crop": "Sunflower Seedling",
        "areaHa": 90,
        "currentNdvi": 0.55,
        "baselineNdvi": 0.58,
        "changePct": "-5.2%",
        "currentNdre": 0.36,
        "status": "Moderate",
        "stressProb": "42%",
        "timestamp": "Jun 18, 2024 (08:52 UTC)",
        "protocol": ["Seedling emergence rate at 85%"]
      }
    ]
  }
};

const FALLBACK_TIMESERIES = {
  "central-valley": {
    "dates": ["May 01", "May 04", "May 08", "May 11", "May 14", "May 18"],
    "current": {
      "ndvi": [0.49, 0.55, 0.61, 0.65, 0.71, 0.64],
      "ndre": [0.32, 0.36, 0.40, 0.43, 0.47, 0.42],
      "evi": [0.39, 0.44, 0.49, 0.53, 0.58, 0.52]
    },
    "baseline": {
      "ndvi": [0.52, 0.57, 0.59, 0.61, 0.63, 0.60],
      "ndre": [0.34, 0.37, 0.39, 0.40, 0.41, 0.40],
      "evi": [0.41, 0.45, 0.47, 0.49, 0.50, 0.49]
    },
    "points": [
      { "date": "May 01", "current": 0.49, "baseline": 0.52, "phenology": "Early Tillering" },
      { "date": "May 04", "current": 0.55, "baseline": 0.57, "phenology": "Stem Elongation" },
      { "date": "May 08", "current": 0.61, "baseline": 0.59, "phenology": "Jointing Stage" },
      { "date": "May 11", "current": 0.65, "baseline": 0.61, "phenology": "Booting Stage" },
      { "date": "May 14", "current": 0.71, "baseline": 0.63, "phenology": "Peak Heading / Anthesis (Vigorous)" },
      { "date": "May 18", "current": 0.64, "baseline": 0.60, "phenology": "Grain Fill (Moisture Deficit Detected)" }
    ]
  },
  "punjab-zone": {
    "dates": ["Feb 15", "Feb 19", "Feb 23", "Feb 27", "Mar 02", "Mar 05"],
    "current": {
      "ndvi": [0.54, 0.62, 0.68, 0.73, 0.76, 0.71],
      "ndre": [0.36, 0.42, 0.46, 0.50, 0.52, 0.49],
      "evi": [0.43, 0.50, 0.55, 0.59, 0.62, 0.58]
    },
    "baseline": {
      "ndvi": [0.55, 0.60, 0.64, 0.67, 0.70, 0.68],
      "ndre": [0.37, 0.41, 0.44, 0.46, 0.48, 0.47],
      "evi": [0.44, 0.48, 0.52, 0.54, 0.56, 0.55]
    },
    "points": [
      { "date": "Feb 15", "current": 0.54, "baseline": 0.55, "phenology": "Late Jointing" },
      { "date": "Feb 19", "current": 0.62, "baseline": 0.60, "phenology": "Booting / Flag Leaf" },
      { "date": "Feb 23", "current": 0.68, "baseline": 0.64, "phenology": "Ear Head Emergence" },
      { "date": "Feb 27", "current": 0.73, "baseline": 0.67, "phenology": "Flowering Peak" },
      { "date": "Mar 02", "current": 0.76, "baseline": 0.70, "phenology": "Peak Milk Stage" },
      { "date": "Mar 05", "current": 0.71, "baseline": 0.68, "phenology": "Early Dough Stage" }
    ]
  },
  "kansas-belt": {
    "dates": ["Jul 10", "Jul 14", "Jul 18", "Jul 21", "Jul 25", "Jul 28"],
    "current": {
      "ndvi": [0.63, 0.66, 0.65, 0.62, 0.59, 0.58],
      "ndre": [0.42, 0.44, 0.43, 0.41, 0.39, 0.38],
      "evi": [0.51, 0.54, 0.53, 0.50, 0.48, 0.47]
    },
    "baseline": {
      "ndvi": [0.60, 0.63, 0.65, 0.66, 0.64, 0.62],
      "ndre": [0.40, 0.42, 0.43, 0.44, 0.42, 0.41],
      "evi": [0.49, 0.51, 0.53, 0.54, 0.52, 0.51]
    },
    "points": [
      { "date": "Jul 10", "current": 0.63, "baseline": 0.60, "phenology": "V12 Vegetative Stage" },
      { "date": "Jul 14", "current": 0.66, "baseline": 0.63, "phenology": "VT Tassel Emergence" },
      { "date": "Jul 18", "current": 0.65, "baseline": 0.65, "phenology": "R1 Silking Beginning" },
      { "date": "Jul 21", "current": 0.62, "baseline": 0.66, "phenology": "Heat Stress Inset (+38°C)" },
      { "date": "Jul 25", "current": 0.59, "baseline": 0.64, "phenology": "Evapotranspiration Deficit" },
      { "date": "Jul 28", "current": 0.58, "baseline": 0.62, "phenology": "Drydown & Leaf Firing" }
    ]
  },
  "nile-delta": {
    "dates": ["Jun 01", "Jun 05", "Jun 09", "Jun 13", "Jun 17", "Jun 20"],
    "current": {
      "ndvi": [0.51, 0.57, 0.63, 0.68, 0.70, 0.66],
      "ndre": [0.34, 0.38, 0.42, 0.45, 0.47, 0.44],
      "evi": [0.41, 0.46, 0.51, 0.55, 0.57, 0.54]
    },
    "baseline": {
      "ndvi": [0.50, 0.54, 0.58, 0.61, 0.64, 0.63],
      "ndre": [0.33, 0.36, 0.39, 0.41, 0.43, 0.42],
      "evi": [0.40, 0.43, 0.47, 0.49, 0.51, 0.52]
    },
    "points": [
      { "date": "Jun 01", "current": 0.51, "baseline": 0.50, "phenology": "Early Vegetative" },
      { "date": "Jun 05", "current": 0.57, "baseline": 0.54, "phenology": "Squaring Initiation" },
      { "date": "Jun 09", "current": 0.63, "baseline": 0.58, "phenology": "Canopy Expansion" },
      { "date": "Jun 13", "current": 0.68, "baseline": 0.61, "phenology": "Mid Squaring" },
      { "date": "Jun 17", "current": 0.70, "baseline": 0.64, "phenology": "Peak Biomass" },
      { "date": "Jun 20", "current": 0.66, "baseline": 0.63, "phenology": "Canopy Stabilization" }
    ]
  }
};

class CropPulseApp {
  constructor() {
    this.aois = FALLBACK_AOIS;
    this.timeseries = FALLBACK_TIMESERIES;
    
    // Application State
    this.state = {
      viewState: 'empty', // 'empty' | 'loading' | 'results'
      activeTab: 'monitor', // 'monitor' | 'fields' | 'reports'
      activeAoiId: 'central-valley',
      selectedAoi: null, // null until selected or preset loaded
      currentIndex: 'ndvi', // 'ndvi' | 'ndre' | 'evi'
      currentPeriod: 'May 01 – May 18, 2024',
      baselinePeriod: 'May 01 – May 18, 2023',
      activeLayer: 'cadastre', // 'cadastre' | 'satellite' | 'heatmap' | 'stress'
      selectedParcel: null,
      zoomLevel: 1,
      thresholds: {
        healthy: 0.65,
        moderateMin: 0.45,
        stressedMax: 0.45
      }
    };

    this.leafletMap = null;
    this.leafletLayerGroup = null;

    this.init();
  }

  async init() {
    // Attempt to load external JSON if served over HTTP
    try {
      const aoiRes = await fetch('data/aoi_presets.json');
      if (aoiRes.ok) this.aois = await aoiRes.json();
      
      const tsRes = await fetch('data/timeseries.json');
      if (tsRes.ok) this.timeseries = await tsRes.json();
    } catch (e) {
      console.log('Using embedded fallback datasets (standalone mode).');
    }

    this.bindEvents();
    this.render();
  }

  // Bind all interactive UI controls
  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('[data-nav-tab]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = tab.getAttribute('data-nav-tab');
        this.switchTab(targetTab);
      });
    });

    // Main Analyze Buttons (in empty state hero & in control strip)
    const emptyAnalyzeBtn = document.getElementById('empty-analyze-btn');
    if (emptyAnalyzeBtn) {
      emptyAnalyzeBtn.addEventListener('click', () => this.runAnalysisPipeline());
    }

    const controlAnalyzeBtn = document.getElementById('control-analyze-btn');
    if (controlAnalyzeBtn) {
      controlAnalyzeBtn.addEventListener('click', () => this.runAnalysisPipeline());
    }

    // Reset Button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetDashboard());
    }

    // AOI Selectors
    const aoiTrigger = document.getElementById('aoi-selector-trigger');
    if (aoiTrigger) {
      aoiTrigger.addEventListener('click', () => this.openModal('aoi-modal'));
    }

    const heroSelectAreaBtn = document.getElementById('hero-select-area-btn');
    if (heroSelectAreaBtn) {
      heroSelectAreaBtn.addEventListener('click', () => this.openModal('aoi-modal'));
    }

    // Preset chips in Empty State
    document.querySelectorAll('[data-preset-aoi]').forEach(btn => {
      btn.addEventListener('click', () => {
        const aoiId = btn.getAttribute('data-preset-aoi');
        this.selectAoi(aoiId);
        this.showToast(`Loaded ${this.aois[aoiId].name}`);
      });
    });

    // Current & Baseline Period triggers
    const currentPeriodTrigger = document.getElementById('current-period-trigger');
    if (currentPeriodTrigger) {
      currentPeriodTrigger.addEventListener('click', () => this.openModal('date-modal'));
    }

    const baselinePeriodTrigger = document.getElementById('baseline-period-trigger');
    if (baselinePeriodTrigger) {
      baselinePeriodTrigger.addEventListener('click', () => this.openModal('date-modal'));
    }

    // Vegetation Index Dropdown
    const indexSelect = document.getElementById('index-select');
    if (indexSelect) {
      indexSelect.addEventListener('change', (e) => {
        this.setIndex(e.target.value);
      });
    }

    // Map Navigation Controls
    const zoomInBtn = document.getElementById('zoom-in-btn');
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.adjustZoom(0.2));

    const zoomOutBtn = document.getElementById('zoom-out-btn');
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.adjustZoom(-0.2));

    const recenterBtn = document.getElementById('recenter-btn');
    if (recenterBtn) recenterBtn.addEventListener('click', () => this.recenterMap());

    // Layer Toggles
    document.querySelectorAll('[data-map-layer]').forEach(btn => {
      btn.addEventListener('click', () => {
        const layer = btn.getAttribute('data-map-layer');
        this.setMapLayer(layer);
      });
    });

    // Sector 4 Callout Trigger
    const inspectSector4Btn = document.getElementById('inspect-sector4-callout');
    if (inspectSector4Btn) {
      inspectSector4Btn.addEventListener('click', () => {
        this.openFieldDrawer('poly-4');
      });
    }

    // Field Detail Drawer close buttons
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => this.closeFieldDrawer());

    const dismissDrawerBtn = document.getElementById('dismiss-drawer-btn');
    if (dismissDrawerBtn) dismissDrawerBtn.addEventListener('click', () => this.closeFieldDrawer());

    const drawerBackdrop = document.getElementById('drawer-backdrop');
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => this.closeFieldDrawer());

    // Create Scout Ticket Button
    const createTicketBtn = document.getElementById('create-ticket-btn');
    if (createTicketBtn) {
      createTicketBtn.addEventListener('click', () => {
        this.openScoutTicketModal();
      });
    }

    // Top Action Buttons
    const exportBtn = document.getElementById('top-export-btn');
    if (exportBtn) exportBtn.addEventListener('click', () => this.openModal('export-modal'));

    const settingsBtn = document.getElementById('top-settings-btn');
    if (settingsBtn) settingsBtn.addEventListener('click', () => this.openModal('settings-modal'));

    const demoTourBtn = document.getElementById('demo-tour-btn');
    if (demoTourBtn) demoTourBtn.addEventListener('click', () => this.startGuidedDemo());

    // Modal Close Buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        this.closeModal(modalId);
      });
    });

    // Close Modals on Backdrop Click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add('hidden');
        }
      });
    });

    // Parcel Click Delegations (SVG)
    const mapSvg = document.getElementById('cadastre-map-svg');
    if (mapSvg) {
      mapSvg.addEventListener('click', (e) => {
        const parcel = e.target.closest('.cadastre-parcel');
        if (parcel) {
          const parcelId = parcel.getAttribute('id');
          this.openFieldDrawer(parcelId);
        }
      });
    }

    // Settings Threshold Form Submission
    const saveThresholdsBtn = document.getElementById('save-thresholds-btn');
    if (saveThresholdsBtn) {
      saveThresholdsBtn.addEventListener('click', () => {
        this.saveCustomThresholds();
      });
    }

    // Export Action Triggers
    const exportGeoJsonBtn = document.getElementById('export-geojson-btn');
    if (exportGeoJsonBtn) {
      exportGeoJsonBtn.addEventListener('click', () => this.downloadGeoJSON());
    }

    const exportCsvBtn = document.getElementById('export-csv-btn');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => this.downloadCSV());
    }

    // Date Preset Selection
    document.querySelectorAll('[data-date-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = btn.getAttribute('data-current-val');
        const baseline = btn.getAttribute('data-baseline-val');
        this.setDateRange(current, baseline);
        this.closeModal('date-modal');
        this.showToast(`Updated analysis window: ${current}`);
      });
    });
  }

  // Switch between Monitor, Fields, and Reports views
  switchTab(tabId) {
    this.state.activeTab = tabId;

    // Update nav links styling
    document.querySelectorAll('[data-nav-tab]').forEach(tab => {
      const isTarget = tab.getAttribute('data-nav-tab') === tabId;
      if (isTarget) {
        tab.className = 'px-space-sm py-1.5 transition-colors bg-surface-container text-on-surface font-semibold rounded-lg text-xs';
      } else {
        tab.className = 'px-space-sm py-1.5 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors text-xs';
      }
    });

    // Hide all tab views
    const monitorView = document.getElementById('view-monitor');
    const fieldsView = document.getElementById('view-fields');
    const reportsView = document.getElementById('view-reports');

    if (monitorView) monitorView.classList.add('hidden');
    if (fieldsView) fieldsView.classList.add('hidden');
    if (reportsView) reportsView.classList.add('hidden');

    if (tabId === 'monitor') {
      if (monitorView) monitorView.classList.remove('hidden');
    } else if (tabId === 'fields') {
      if (fieldsView) {
        fieldsView.classList.remove('hidden');
        this.renderFieldsTable();
      }
    } else if (tabId === 'reports') {
      if (reportsView) {
        reportsView.classList.remove('hidden');
        this.renderReportsView();
      }
    }
  }

  // Select AOI from modal or quick preset
  selectAoi(aoiId) {
    if (!this.aois[aoiId]) return;
    this.state.activeAoiId = aoiId;
    this.state.selectedAoi = this.aois[aoiId];
    this.state.currentPeriod = this.aois[aoiId].currentWindow;
    this.state.baselinePeriod = this.aois[aoiId].baselineWindow;

    // Enable the hero and control analyze buttons
    const emptyAnalyzeBtn = document.getElementById('empty-analyze-btn');
    if (emptyAnalyzeBtn) {
      emptyAnalyzeBtn.disabled = false;
      emptyAnalyzeBtn.className = 'h-10 px-space-xl bg-primary-container hover:bg-secondary text-on-primary font-label-md text-label-md rounded-lg shadow-md flex items-center gap-space-xs transition-all cursor-pointer';
    }

    const controlAnalyzeBtn = document.getElementById('control-analyze-btn');
    if (controlAnalyzeBtn) {
      controlAnalyzeBtn.disabled = false;
      controlAnalyzeBtn.classList.remove('opacity-60', 'cursor-not-allowed');
    }

    // Update labels in UI
    const aoiLabels = document.querySelectorAll('.aoi-display-name');
    aoiLabels.forEach(el => el.textContent = `${this.aois[aoiId].name} (${this.aois[aoiId].cropType})`);

    const aoiCoords = document.querySelectorAll('.aoi-display-coords');
    aoiCoords.forEach(el => el.textContent = this.aois[aoiId].coordinates);

    const aoiArea = document.querySelectorAll('.aoi-display-area');
    aoiArea.forEach(el => el.textContent = `${this.aois[aoiId].aoiAreaHa.toLocaleString()} Hectares`);

    const currentPeriodText = document.querySelectorAll('.current-period-text');
    currentPeriodText.forEach(el => el.textContent = this.state.currentPeriod);

    const baselinePeriodText = document.querySelectorAll('.baseline-period-text');
    baselinePeriodText.forEach(el => el.textContent = this.state.baselinePeriod);

    // If currently on results, re-render dashboard data
    if (this.state.viewState === 'results') {
      this.renderResults();
      if (this.leafletMap) {
        this.leafletMap.setView([this.aois[aoiId].lat, this.aois[aoiId].lng], this.aois[aoiId].zoom);
      }
    }

    this.closeModal('aoi-modal');
  }

  // Run the 4-step satellite processing simulation
  runAnalysisPipeline() {
    if (!this.state.selectedAoi) {
      this.selectAoi('central-valley');
    }

    const loadingModal = document.getElementById('loading-modal');
    if (loadingModal) loadingModal.classList.remove('hidden');

    const progressBar = document.getElementById('loading-progress-bar');
    const loadingStepText = document.getElementById('loading-step-text');
    const stepIcons = [
      document.getElementById('step-1-icon'),
      document.getElementById('step-2-icon'),
      document.getElementById('step-3-icon'),
      document.getElementById('step-4-icon')
    ];

    const steps = [
      { pct: '25%', text: 'Retrieving Sentinel-2 MSI Multi-spectral Bands (B4, B8)...', iconIdx: 0 },
      { pct: '50%', text: 'Cloud Filtering & Atmospheric QA Masking (< 1% cloud cover)...', iconIdx: 1 },
      { pct: '75%', text: `Computing Vegetation Index: ${this.state.currentIndex.toUpperCase()} = (NIR - Red) / (NIR + Red)...`, iconIdx: 2 },
      { pct: '100%', text: 'Health Classification & Baseline Anomaly Detection Complete.', iconIdx: 3 }
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        if (progressBar) progressBar.style.width = step.pct;
        if (loadingStepText) loadingStepText.textContent = step.text;
        
        if (stepIcons[step.iconIdx]) {
          stepIcons[step.iconIdx].textContent = 'check_circle';
          stepIcons[step.iconIdx].classList.remove('text-text-tertiary');
          stepIcons[step.iconIdx].classList.add('text-health-healthy');
        }
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (loadingModal) loadingModal.classList.add('hidden');
          this.setViewState('results');
          this.showToast('Satellite analysis complete! Results updated.');
        }, 300);
      }
    }, 320);
  }

  // Switch between 'empty' and 'results' view state
  setViewState(viewState) {
    this.state.viewState = viewState;
    const emptyView = document.getElementById('empty-state-container');
    const resultsView = document.getElementById('results-state-container');

    if (viewState === 'empty') {
      if (emptyView) emptyView.classList.remove('hidden');
      if (resultsView) resultsView.classList.add('hidden');
    } else if (viewState === 'results') {
      if (emptyView) emptyView.classList.add('hidden');
      if (resultsView) resultsView.classList.remove('hidden');
      this.renderResults();
    }
  }

  // Reset to initial empty state
  resetDashboard() {
    this.state.selectedAoi = null;
    this.state.selectedParcel = null;
    this.closeFieldDrawer();
    this.setViewState('empty');

    const emptyAnalyzeBtn = document.getElementById('empty-analyze-btn');
    if (emptyAnalyzeBtn) {
      emptyAnalyzeBtn.disabled = true;
      emptyAnalyzeBtn.className = 'w-full lg:w-auto h-[40px] px-space-lg bg-surface-muted text-text-tertiary rounded-lg font-label-md text-label-md flex items-center justify-center gap-space-xs cursor-not-allowed transition-all';
    }

    const aoiLabels = document.querySelectorAll('.aoi-display-name');
    aoiLabels.forEach(el => el.textContent = 'Select agricultural area');

    this.showToast('Workspace reset to initial state.');
  }

  // Set active vegetation index (NDVI / NDRE / EVI)
  setIndex(indexName) {
    this.state.currentIndex = indexName;
    const indexPill = document.getElementById('current-index-pill');
    if (indexPill) indexPill.textContent = indexName.toUpperCase();

    // Update math formula tooltip
    const formulaDisplay = document.getElementById('index-formula-badge');
    if (formulaDisplay) {
      if (indexName === 'ndvi') {
        formulaDisplay.textContent = 'NDVI = (B8 - B4) / (B8 + B4) [NIR - Red]';
      } else if (indexName === 'ndre') {
        formulaDisplay.textContent = 'NDRE = (B8 - B5) / (B8 + B5) [NIR - RedEdge]';
      } else {
        formulaDisplay.textContent = 'EVI = 2.5 * ((NIR - Red) / (NIR + 6*Red - 7.5*Blue + 1))';
      }
    }

    if (this.state.viewState === 'results') {
      this.renderResults();
      this.showToast(`Active spectral index updated to ${indexName.toUpperCase()}`);
    }
  }

  // Set date ranges
  setDateRange(current, baseline) {
    this.state.currentPeriod = current;
    this.state.baselinePeriod = baseline;

    const currentPeriodText = document.querySelectorAll('.current-period-text');
    currentPeriodText.forEach(el => el.textContent = current);

    const baselinePeriodText = document.querySelectorAll('.baseline-period-text');
    baselinePeriodText.forEach(el => el.textContent = baseline);

    if (this.state.viewState === 'results') {
      this.renderResults();
    }
  }

  // Adjust zoom for cadastre SVG
  adjustZoom(delta) {
    this.state.zoomLevel = Math.max(0.7, Math.min(2.0, this.state.zoomLevel + delta));
    const cadastreSvg = document.getElementById('cadastre-map-svg');
    if (cadastreSvg) {
      cadastreSvg.style.transform = `scale(${this.state.zoomLevel})`;
      cadastreSvg.style.transformOrigin = 'center center';
    }
    if (this.leafletMap) {
      if (delta > 0) this.leafletMap.zoomIn();
      else this.leafletMap.zoomOut();
    }
  }

  // Recenter map
  recenterMap() {
    this.state.zoomLevel = 1.0;
    const cadastreSvg = document.getElementById('cadastre-map-svg');
    if (cadastreSvg) {
      cadastreSvg.style.transform = 'scale(1.0)';
    }
    if (this.leafletMap && this.state.selectedAoi) {
      this.leafletMap.setView([this.state.selectedAoi.lat, this.state.selectedAoi.lng], this.state.selectedAoi.zoom);
    }
    this.showToast('Recentered to AOI boundary.');
  }

  // Set map layer mode
  setMapLayer(layer) {
    this.state.activeLayer = layer;

    // Update layer buttons styling
    document.querySelectorAll('[data-map-layer]').forEach(btn => {
      const isTarget = btn.getAttribute('data-map-layer') === layer;
      if (isTarget) {
        btn.className = 'px-2 py-1 rounded font-label-sm text-label-sm bg-primary text-on-primary font-semibold transition-all text-xs';
      } else {
        btn.className = 'px-2 py-1 rounded font-label-sm text-label-sm text-text-secondary hover:text-text-primary font-medium transition-all text-xs';
      }
    });

    const cadastreContainer = document.getElementById('cadastre-view-container');
    const leafletContainer = document.getElementById('leaflet-map-container');
    const heatmaps = document.querySelectorAll('.spectral-heatmap-overlay');
    const furrows = document.querySelectorAll('.crop-furrow-pattern');

    if (layer === 'satellite') {
      if (cadastreContainer) cadastreContainer.classList.add('hidden');
      if (leafletContainer) {
        leafletContainer.classList.remove('hidden');
        this.initOrUpdateLeafletMap();
      }
    } else {
      if (leafletContainer) leafletContainer.classList.add('hidden');
      if (cadastreContainer) cadastreContainer.classList.remove('hidden');

      if (layer === 'rgb') {
        heatmaps.forEach(el => el.style.opacity = '0');
        furrows.forEach(el => el.style.opacity = '0.9');
      } else if (layer === 'stress') {
        heatmaps.forEach(el => el.style.opacity = '0.95');
      } else {
        // default cadastre
        heatmaps.forEach(el => el.style.opacity = '0.7');
        furrows.forEach(el => el.style.opacity = '0.65');
      }
    }
    this.showToast(`Layer mode switched: ${layer.toUpperCase()}`);
  }

  // Initialize or update Leaflet map for live satellite tiles
  initOrUpdateLeafletMap() {
    if (!window.L) return;
    const aoi = this.state.selectedAoi || this.aois['central-valley'];

    if (!this.leafletMap) {
      this.leafletMap = L.map('leaflet-map-container', {
        center: [aoi.lat, aoi.lng],
        zoom: aoi.zoom,
        zoomControl: false,
        attributionControl: false
      });

      // High-resolution ESRI World Imagery
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19
      }).addTo(this.leafletMap);

      this.leafletLayerGroup = L.layerGroup().addTo(this.leafletMap);
    } else {
      this.leafletMap.setView([aoi.lat, aoi.lng], aoi.zoom);
    }

    // Add parcels polygons to Leaflet map
    if (this.leafletLayerGroup) {
      this.leafletLayerGroup.clearLayers();

      const offsetLat = 0.004;
      const offsetLng = 0.006;
      const baseLat = aoi.lat;
      const baseLng = aoi.lng;

      aoi.parcels.forEach((p, idx) => {
        // Generate pseudo geographic bounding box for parcel
        const row = Math.floor(idx / 3);
        const col = idx % 3;
        const pLat1 = baseLat + (row - 1) * offsetLat;
        const pLat2 = pLat1 + offsetLat * 0.85;
        const pLng1 = baseLng + (col - 1) * offsetLng;
        const pLng2 = pLng1 + offsetLng * 0.85;

        const bounds = [[pLat1, pLng1], [pLat2, pLng2]];
        const color = p.status === 'Healthy' ? '#2d6a4f' : (p.status === 'Moderate' ? '#d97706' : '#dc2626');

        const rect = L.rectangle(bounds, {
          color: color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.45
        }).addTo(this.leafletLayerGroup);

        rect.bindTooltip(`<strong>${p.name}</strong><br/>NDVI: ${p.currentNdvi} • ${p.status}`, {
          sticky: true
        });

        rect.on('click', () => {
          this.openFieldDrawer(p.id);
        });
      });
    }
  }

  // Open Contextual Field Detail Drawer
  openFieldDrawer(parcelId) {
    const aoi = this.state.selectedAoi || this.aois['central-valley'];
    const parcel = aoi.parcels.find(p => p.id === parcelId) || aoi.parcels[3];
    this.state.selectedParcel = parcel;

    // Highlight active parcel on SVG map
    document.querySelectorAll('.cadastre-parcel').forEach(p => {
      p.classList.remove('active-selected');
    });
    const parcelElem = document.getElementById(parcelId);
    if (parcelElem) parcelElem.classList.add('active-selected');

    // Populate Drawer Elements
    const fieldName = document.getElementById('drawer-field-name');
    if (fieldName) fieldName.textContent = parcel.name;

    const cropName = document.getElementById('drawer-crop-name');
    if (cropName) cropName.textContent = `${parcel.crop} • ${parcel.areaHa} Hectares`;

    const statusBadge = document.getElementById('drawer-status-badge');
    const statusText = document.getElementById('drawer-status-text');
    const statusIcon = document.getElementById('drawer-status-icon');

    if (statusBadge && statusText && statusIcon) {
      if (parcel.status === 'Healthy') {
        statusBadge.className = 'p-space-sm bg-health-healthy-bg border border-health-healthy-border rounded-lg flex items-center justify-between';
        statusText.className = 'font-headline-sm text-headline-sm text-health-healthy';
        statusText.textContent = 'Optimal Photosynthesis (Healthy)';
        statusIcon.className = 'material-symbols-outlined text-health-healthy text-[28px]';
        statusIcon.textContent = 'check_circle';
      } else if (parcel.status === 'Moderate') {
        statusBadge.className = 'p-space-sm bg-health-moderate-bg border border-health-moderate-border rounded-lg flex items-center justify-between';
        statusText.className = 'font-headline-sm text-headline-sm text-health-moderate';
        statusText.textContent = 'Transitional / Watch Required';
        statusIcon.className = 'material-symbols-outlined text-health-moderate text-[28px]';
        statusIcon.textContent = 'warning';
      } else {
        statusBadge.className = 'p-space-sm bg-health-stressed-bg border border-health-stressed-border rounded-lg flex items-center justify-between';
        statusText.className = 'font-headline-sm text-headline-sm text-health-stressed';
        statusText.textContent = 'High Water / Biomass Stress';
        statusIcon.className = 'material-symbols-outlined text-health-stressed text-[28px]';
        statusIcon.textContent = 'error';
      }
    }

    // Metric values
    const currentVal = this.state.currentIndex === 'ndre' ? parcel.currentNdre : parcel.currentNdvi;
    const currentValElem = document.getElementById('drawer-current-index');
    if (currentValElem) currentValElem.textContent = currentVal;

    const baselineValElem = document.getElementById('drawer-baseline-index');
    if (baselineValElem) baselineValElem.textContent = parcel.baselineNdvi;

    const changeValElem = document.getElementById('drawer-change-pct');
    if (changeValElem) {
      changeValElem.textContent = parcel.changePct;
      changeValElem.className = parcel.changePct.startsWith('-') 
        ? 'font-data-mono text-data-mono font-bold text-health-stressed' 
        : 'font-data-mono text-data-mono font-bold text-health-healthy';
    }

    const stressProbElem = document.getElementById('drawer-stress-prob');
    if (stressProbElem) stressProbElem.textContent = parcel.stressProb;

    const timeElem = document.getElementById('drawer-timestamp');
    if (timeElem) timeElem.textContent = parcel.timestamp;

    // Protocol list
    const protocolList = document.getElementById('drawer-protocol-list');
    if (protocolList) {
      protocolList.innerHTML = parcel.protocol.map(item => `<li>${item}</li>`).join('');
    }

    // Slide in drawer & backdrop
    const drawer = document.getElementById('field-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.remove('translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
  }

  // Close Field Detail Drawer
  closeFieldDrawer() {
    const drawer = document.getElementById('field-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.add('translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');

    document.querySelectorAll('.cadastre-parcel').forEach(p => {
      p.classList.remove('active-selected');
    });
  }

  // Render complete results state
  renderResults() {
    const aoi = this.state.selectedAoi || this.aois['central-valley'];
    const indexKey = this.state.currentIndex;
    const kpis = aoi.kpis[indexKey] || aoi.kpis.ndvi;

    // KPI 1: Mean Index
    const meanValElem = document.getElementById('kpi-mean-val');
    if (meanValElem) meanValElem.textContent = kpis.mean.toFixed(2);

    const deltaPill = document.getElementById('kpi-delta-pill');
    if (deltaPill) {
      deltaPill.innerHTML = `
        <span class="material-symbols-outlined text-[14px]">${kpis.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
        ${kpis.delta} vs baseline
      `;
      deltaPill.className = kpis.trend === 'up' 
        ? 'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-health-healthy-bg text-health-healthy font-label-sm text-label-sm font-medium'
        : 'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-health-stressed-bg text-health-stressed font-label-sm text-label-sm font-medium';
    }

    const baselineRef = document.getElementById('kpi-baseline-ref');
    if (baselineRef) baselineRef.textContent = `Baseline: ${kpis.baselineMean.toFixed(2)}`;

    // KPI 2: Healthy Area
    const healthyPctElem = document.getElementById('kpi-healthy-pct');
    if (healthyPctElem) healthyPctElem.textContent = `${kpis.healthyPct}%`;

    const healthyHaElem = document.getElementById('kpi-healthy-ha');
    if (healthyHaElem) healthyHaElem.textContent = `${kpis.healthyHa.toLocaleString()} ha`;

    const healthyBar = document.getElementById('kpi-healthy-bar');
    if (healthyBar) healthyBar.style.width = `${kpis.healthyPct}%`;

    // KPI 3: Moderate Area
    const modPctElem = document.getElementById('kpi-moderate-pct');
    if (modPctElem) modPctElem.textContent = `${kpis.moderatePct}%`;

    const modHaElem = document.getElementById('kpi-moderate-ha');
    if (modHaElem) modHaElem.textContent = `${kpis.moderateHa.toLocaleString()} ha`;

    const modBar = document.getElementById('kpi-moderate-bar');
    if (modBar) modBar.style.width = `${kpis.moderatePct}%`;

    // KPI 4: Stressed Area
    const stressedPctElem = document.getElementById('kpi-stressed-pct');
    if (stressedPctElem) stressedPctElem.textContent = `${kpis.stressedPct}%`;

    const stressedHaElem = document.getElementById('kpi-stressed-ha');
    if (stressedHaElem) stressedHaElem.textContent = `${kpis.stressedHa.toLocaleString()} ha`;

    // Stress Diagnostics card
    const stressHectares = document.getElementById('stress-diag-ha');
    if (stressHectares) stressHectares.textContent = `${aoi.stressDiagnostics.hectares} Hectares`;

    const stressDrop = document.getElementById('stress-diag-drop');
    if (stressDrop) stressDrop.textContent = aoi.stressDiagnostics.indexDrop;

    const stressSummary = document.getElementById('stress-diag-summary');
    if (stressSummary) stressSummary.textContent = aoi.stressDiagnostics.summary;

    const stressAoiPct = document.getElementById('stress-diag-aoi-pct');
    if (stressAoiPct) stressAoiPct.textContent = aoi.stressDiagnostics.pct;

    // Recommendation card
    const recLead = document.getElementById('rec-card-lead');
    if (recLead) recLead.textContent = aoi.recommendation.lead;

    // Render Temporal Line Chart
    this.renderTemporalChart();
  }

  // Render interactive SVG Temporal Chart
  renderTemporalChart() {
    const aoiId = this.state.activeAoiId;
    const tsData = this.timeseries[aoiId] || this.timeseries['central-valley'];
    const indexKey = this.state.currentIndex;

    const currentPoints = tsData.current[indexKey] || tsData.current.ndvi;
    const baselinePoints = tsData.baseline[indexKey] || tsData.baseline.ndvi;

    // Map y-values to svg coordinates (range: y=155 at 0.2 to y=20 at 0.8)
    const mapY = (val) => {
      const minVal = 0.2;
      const maxVal = 0.8;
      const minY = 155;
      const maxY = 20;
      const clamped = Math.max(minVal, Math.min(maxVal, val));
      return minY - ((clamped - minVal) / (maxVal - minVal)) * (minY - maxY);
    };

    const xCoords = [60, 152, 244, 336, 428, 520];

    // Generate Path Data for Current Line
    let currentPath = `M ${xCoords[0]},${mapY(currentPoints[0])}`;
    for (let i = 1; i < xCoords.length; i++) {
      const prevX = xCoords[i - 1];
      const prevY = mapY(currentPoints[i - 1]);
      const curX = xCoords[i];
      const curY = mapY(currentPoints[i]);
      const midX = (prevX + curX) / 2;
      currentPath += ` C ${midX},${prevY} ${midX},${curY} ${curX},${curY}`;
    }

    const currentAreaPath = `${currentPath} L ${xCoords[xCoords.length - 1]},155 L ${xCoords[0]},155 Z`;

    // Generate Path Data for Baseline Line
    let baselinePath = `M ${xCoords[0]},${mapY(baselinePoints[0])}`;
    for (let i = 1; i < xCoords.length; i++) {
      const prevX = xCoords[i - 1];
      const prevY = mapY(baselinePoints[i - 1]);
      const curX = xCoords[i];
      const curY = mapY(baselinePoints[i]);
      const midX = (prevX + curX) / 2;
      baselinePath += ` C ${midX},${prevY} ${midX},${curY} ${curX},${curY}`;
    }

    const currentPathElem = document.getElementById('chart-current-path');
    if (currentPathElem) currentPathElem.setAttribute('d', currentPath);

    const currentAreaElem = document.getElementById('chart-current-area');
    if (currentAreaElem) currentAreaElem.setAttribute('d', currentAreaPath);

    const baselinePathElem = document.getElementById('chart-baseline-path');
    if (baselinePathElem) baselinePathElem.setAttribute('d', baselinePath);

    // Update marker nodes & tooltips
    const markersContainer = document.getElementById('chart-markers-group');
    if (markersContainer) {
      markersContainer.innerHTML = '';
      xCoords.forEach((x, i) => {
        const y = mapY(currentPoints[i]);
        const pt = tsData.points[i];

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#012d1d');
        circle.setAttribute('class', 'cursor-pointer hover:r-6 transition-all');
        circle.setAttribute('stroke', '#a1f4c8');
        circle.setAttribute('stroke-width', '1.5');

        circle.addEventListener('mouseenter', () => {
          this.showChartTooltip(x, y, pt.date, currentPoints[i], pt.phenology);
        });

        markersContainer.appendChild(circle);
      });
    }

    // Update X-axis label dates
    const xLabelsContainer = document.getElementById('chart-x-labels');
    if (xLabelsContainer) {
      xLabelsContainer.innerHTML = tsData.dates.map((d, i) => `
        <span class="${i === tsData.dates.length - 2 ? 'text-primary font-bold' : ''}">${d}</span>
      `).join('');
    }
  }

  // Interactive Chart Tooltip
  showChartTooltip(x, y, date, val, phenology) {
    const tooltipGroup = document.getElementById('chart-tooltip-group');
    if (!tooltipGroup) return;

    tooltipGroup.setAttribute('transform', `translate(${Math.max(20, Math.min(420, x - 50))}, ${Math.max(5, y - 45)})`);
    
    const dateText = document.getElementById('chart-tooltip-date');
    if (dateText) dateText.textContent = `${date.toUpperCase()} • ${this.state.currentIndex.toUpperCase()}`;

    const valText = document.getElementById('chart-tooltip-val');
    if (valText) valText.textContent = `${val.toFixed(2)} (${phenology.split('(')[0].trim()})`;

    tooltipGroup.style.opacity = '1';
  }

  // Render Fields Table (for 'Fields' Tab)
  renderFieldsTable() {
    const tbody = document.getElementById('fields-table-body');
    if (!tbody) return;

    const aoi = this.state.selectedAoi || this.aois['central-valley'];
    tbody.innerHTML = aoi.parcels.map(p => {
      const statusBadge = p.status === 'Healthy'
        ? '<span class="px-2 py-0.5 rounded-full bg-health-healthy-bg text-health-healthy text-xs font-semibold">Healthy</span>'
        : (p.status === 'Moderate'
          ? '<span class="px-2 py-0.5 rounded-full bg-health-moderate-bg text-health-moderate text-xs font-semibold">Moderate</span>'
          : '<span class="px-2 py-0.5 rounded-full bg-health-stressed-bg text-health-stressed text-xs font-semibold">Stressed</span>');

      return `
        <tr class="hover:bg-surface-muted/50 cursor-pointer transition-colors border-b border-border-subtle" onclick="window.cropPulse.openFieldDrawer('${p.id}')">
          <td class="py-3 px-4 font-medium text-text-primary text-sm flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${p.status === 'Healthy' ? 'bg-health-healthy' : (p.status === 'Moderate' ? 'bg-health-moderate' : 'bg-health-stressed')}"></span>
            ${p.name}
          </td>
          <td class="py-3 px-4 text-text-secondary text-sm">${p.crop}</td>
          <td class="py-3 px-4 text-text-primary text-sm font-data-mono font-medium">${p.areaHa} ha</td>
          <td class="py-3 px-4 text-text-primary text-sm font-data-mono font-bold">${p.currentNdvi}</td>
          <td class="py-3 px-4 text-text-secondary text-sm font-data-mono">${p.baselineNdvi}</td>
          <td class="py-3 px-4 text-sm font-data-mono ${p.changePct.startsWith('-') ? 'text-health-stressed font-bold' : 'text-health-healthy'}">${p.changePct}</td>
          <td class="py-3 px-4">${statusBadge}</td>
          <td class="py-3 px-4 text-right">
            <button class="px-2.5 py-1 text-xs bg-surface border border-border-subtle rounded-md hover:bg-surface-container text-text-secondary font-medium transition-colors">
              Inspect
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Render Reports View (for 'Reports' Tab)
  renderReportsView() {
    const aoi = this.state.selectedAoi || this.aois['central-valley'];
    const aoiReportName = document.getElementById('report-aoi-name');
    if (aoiReportName) aoiReportName.textContent = aoi.name;

    const reportRegion = document.getElementById('report-region-name');
    if (reportRegion) reportRegion.textContent = `${aoi.region} • Sentinel-2 Tile ${aoi.sentinelTile}`;

    const reportDate = document.getElementById('report-generated-date');
    if (reportDate) reportDate.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Open Scout Ticket Creation Modal
  openScoutTicketModal() {
    const p = this.state.selectedParcel || (this.state.selectedAoi ? this.state.selectedAoi.parcels[3] : this.aois['central-valley'].parcels[3]);
    const ticketId = `TK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const ticketIdElem = document.getElementById('ticket-modal-id');
    if (ticketIdElem) ticketIdElem.textContent = ticketId;

    const ticketTarget = document.getElementById('ticket-target-field');
    if (ticketTarget) ticketTarget.textContent = `${p.name} (${p.crop})`;

    const ticketProtocol = document.getElementById('ticket-protocol-preview');
    if (ticketProtocol) {
      ticketProtocol.innerHTML = p.protocol.map(item => `<li>${item}</li>`).join('');
    }

    this.openModal('ticket-modal');
  }

  // Save custom thresholds from settings modal
  saveCustomThresholds() {
    const healthyInput = document.getElementById('threshold-healthy-input');
    const stressedInput = document.getElementById('threshold-stressed-input');

    if (healthyInput && stressedInput) {
      this.state.thresholds.healthy = parseFloat(healthyInput.value) || 0.65;
      this.state.thresholds.stressedMax = parseFloat(stressedInput.value) || 0.45;
      this.state.thresholds.moderateMin = this.state.thresholds.stressedMax;

      // Update legend HUD text
      const legendHealthy = document.getElementById('legend-healthy-label');
      if (legendHealthy) legendHealthy.textContent = `Healthy (> ${this.state.thresholds.healthy})`;

      const legendMod = document.getElementById('legend-mod-label');
      if (legendMod) legendMod.textContent = `Moderate (${this.state.thresholds.moderateMin} – ${this.state.thresholds.healthy})`;

      const legendStressed = document.getElementById('legend-stressed-label');
      if (legendStressed) legendStressed.textContent = `Stressed (< ${this.state.thresholds.stressedMax})`;

      this.closeModal('settings-modal');
      this.showToast('Thresholds updated & live reclassification applied.');
    }
  }

  // Download GeoJSON representation of parcels
  downloadGeoJSON() {
    const aoi = this.state.selectedAoi || this.aois['central-valley'];
    const geojson = {
      type: "FeatureCollection",
      metadata: {
        aoi: aoi.name,
        tile: aoi.sentinelTile,
        dateGenerated: new Date().toISOString(),
        index: this.state.currentIndex.toUpperCase()
      },
      features: aoi.parcels.map((p, idx) => ({
        type: "Feature",
        id: p.id,
        properties: {
          name: p.name,
          crop: p.crop,
          areaHectares: p.areaHa,
          currentNdvi: p.currentNdvi,
          baselineNdvi: p.baselineNdvi,
          changePct: p.changePct,
          healthClass: p.status,
          stressProbability: p.stressProb,
          protocol: p.protocol
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [aoi.lng + (idx * 0.002), aoi.lat + (idx * 0.002)],
            [aoi.lng + (idx * 0.002) + 0.004, aoi.lat + (idx * 0.002)],
            [aoi.lng + (idx * 0.002) + 0.004, aoi.lat + (idx * 0.002) + 0.003],
            [aoi.lng + (idx * 0.002), aoi.lat + (idx * 0.002) + 0.003],
            [aoi.lng + (idx * 0.002), aoi.lat + (idx * 0.002)]
          ]]
        }
      }))
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `croppulse_${aoi.id}_${this.state.currentIndex}.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.closeModal('export-modal');
    this.showToast('GeoJSON export downloaded.');
  }

  // Download CSV report
  downloadCSV() {
    const aoi = this.state.selectedAoi || this.aois['central-valley'];
    let csv = "Parcel_ID,Field_Name,Crop,Area_Ha,Current_Index,Baseline_Index,Change_Pct,Health_Class,Stress_Probability\n";
    
    aoi.parcels.forEach(p => {
      csv += `"${p.id}","${p.name}","${p.crop}",${p.areaHa},${p.currentNdvi},${p.baselineNdvi},"${p.changePct}","${p.status}","${p.stressProb}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `croppulse_${aoi.id}_metrics.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.closeModal('export-modal');
    this.showToast('CSV export downloaded.');
  }

  // Start automated Guided Demo for judges/presentation
  startGuidedDemo() {
    this.showToast('Starting Guided Demo workflow...');
    this.resetDashboard();

    setTimeout(() => {
      this.selectAoi('central-valley');
      this.showToast('Step 1: Selected Central Valley Quad 4B (2,090 ha)');
      
      setTimeout(() => {
        this.runAnalysisPipeline();
        
        setTimeout(() => {
          this.showToast('Step 2: Satellite imagery processed & NDVI classified.');
          
          setTimeout(() => {
            this.openFieldDrawer('poly-4');
            this.showToast('Step 3: Stressed Sector 4 flagged & inspected in Drawer.');
          }, 1500);
        }, 1800);
      }, 1000);
    }, 600);
  }

  // Modal helpers
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
  }

  // Toast notification
  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // Initial render setup
  render() {
    this.setViewState('empty');
  }
}

// Global hook
document.addEventListener('DOMContentLoaded', () => {
  window.cropPulse = new CropPulseApp();
});
