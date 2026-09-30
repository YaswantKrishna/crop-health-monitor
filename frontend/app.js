/**
 * Crop Health Monitoring System — Main Application Logic
 * ───────────────────────────────────────────────────────
 * Initializes Leaflet map, manages layers, field selection,
 * KPI dashboard, dynamic legends, and temporal charts.
 */

/* ===========================================================
   GLOBAL STATE
   =========================================================== */
let map;                      // Leaflet map instance
let fieldsGeoJSON = null;     // Raw GeoJSON FeatureCollection
let cadastralLayer = null;    // L.geoJSON layer for boundaries
let overlayLayers = {};       // { ndvi, ndre, stress } L.geoJSON layers
let selectedFieldId = null;
let selectedFieldLayer = null;
let highlightLayer = null;    // L.geoJSON highlight for selected field

const DEFAULT_CENTER = [30.911, 75.862];
const DEFAULT_ZOOM = 15;

/* Base tile providers */
const baseTiles = {
  satellite: L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { attribution: 'Tiles &copy; Esri', maxZoom: 19 }
  ),
  rgb: L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; OpenStreetMap contributors', maxZoom: 19 }
  )
};

/* ===========================================================
   COLOR RAMPS
   =========================================================== */
function ndviColor(v) {
  if (v == null) return '#cccccc';
  if (v >= 0.7)  return '#1b7a1b';   // dark green
  if (v >= 0.6)  return '#4caf50';   // green
  if (v >= 0.5)  return '#8bc34a';   // light green
  if (v >= 0.4)  return '#cddc39';   // yellow-green
  if (v >= 0.3)  return '#ffeb3b';   // yellow
  return '#f44336';                   // red
}

function ndreColor(v) {
  if (v == null) return '#cccccc';
  if (v >= 0.5)  return '#1a5276';   // dark blue-green
  if (v >= 0.42) return '#2e86c1';   // teal
  if (v >= 0.35) return '#48c9b0';   // green-teal
  if (v >= 0.28) return '#f9e79f';   // warm yellow
  return '#e74c3c';                   // red
}

function stressColor(status) {
  const s = (status || '').toLowerCase();
  if (s === 'healthy') return '#2d6a4f';
  if (s === 'moderate') return '#e9a820';
  return '#d62828';                     // Potentially Stressed
}

function stressTextLabel(status) {
  const s = (status || '').toLowerCase();
  if (s === 'healthy') return 'Healthy';
  if (s === 'moderate') return 'Moderate';
  return 'Potential Stress';
}

/* ===========================================================
   INITIALIZATION
   =========================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  loadFields();
  loadKPIs();
  bindControls();
  bindLayerSwitching();
});

function initMap() {
  map = L.map('map', {
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    zoomControl: false,         // We use custom buttons
    scrollWheelZoom: true,
    doubleClickZoom: true,
    touchZoom: true,
    dragging: true
  });

  // Start with satellite base
  baseTiles.satellite.addTo(map);

  // Force Leaflet to recalculate size after CSS layout settles
  setTimeout(() => map.invalidateSize(), 200);
  window.addEventListener('resize', () => map.invalidateSize());
}

/* ===========================================================
   DATA LOADING
   =========================================================== */
async function loadFields() {
  try {
    const res = await fetch('/api/fields');
    if (!res.ok) throw new Error('Fields API returned ' + res.status);
    fieldsGeoJSON = await res.json();
    renderCadastralLayer();
    updateLegend('satellite');
    // Select first field by default
    if (fieldsGeoJSON.features && fieldsGeoJSON.features.length) {
      selectField(fieldsGeoJSON.features[0].properties.field_id);
    }
  } catch (err) {
    console.error('Failed to load fields:', err);
  }
}

async function loadKPIs() {
  try {
    const res = await fetch('/api/analysis/summary');
    if (!res.ok) return;
    const d = await res.json();
    setText('kpi-total-fields', d.total_fields);
    setText('kpi-healthy-pct', d.healthy_pct + '%');
    setText('kpi-healthy-count', d.healthy_count + ' fields');
    setText('kpi-moderate-pct', d.moderate_pct + '%');
    setText('kpi-moderate-count', d.moderate_count + ' fields');
    setText('kpi-stressed-pct', d.stressed_pct + '%');
    setText('kpi-stressed-count', d.stressed_count + ' fields');
  } catch (err) {
    console.error('KPI fetch error:', err);
  }
}

/* ===========================================================
   CADASTRAL LAYER (Field Boundaries)
   =========================================================== */
function renderCadastralLayer() {
  if (cadastralLayer) {
    map.removeLayer(cadastralLayer);
  }

  cadastralLayer = L.geoJSON(fieldsGeoJSON, {
    style: () => ({
      color: '#1b4332',
      weight: 2,
      fillOpacity: 0.08,
      fillColor: '#2d6a4f'
    }),
    onEachFeature: (feature, layer) => {
      const p = feature.properties;
      layer.bindTooltip(
        `<strong>${p.field_id}</strong><br>${p.crop} • ${p.area_ha} ha`,
        { sticky: true, className: 'field-tooltip' }
      );
      layer.on('click', () => selectField(p.field_id));
    }
  }).addTo(map);

  // Fit map to field bounds
  map.fitBounds(cadastralLayer.getBounds(), { padding: [30, 30] });
}

/* ===========================================================
   OVERLAY LAYERS (NDVI, NDRE, Stress)
   =========================================================== */
function clearOverlayLayers() {
  Object.values(overlayLayers).forEach(l => {
    if (l && map.hasLayer(l)) map.removeLayer(l);
  });
  overlayLayers = {};
}

function renderNDVILayer() {
  clearOverlayLayers();
  overlayLayers.ndvi = L.geoJSON(fieldsGeoJSON, {
    style: (feature) => ({
      color: '#333',
      weight: 1,
      fillOpacity: 0.7,
      fillColor: ndviColor(feature.properties.ndvi)
    }),
    onEachFeature: (feature, layer) => {
      const p = feature.properties;
      layer.bindTooltip(
        `<strong>${p.field_id}</strong><br>NDVI: ${p.ndvi}`,
        { sticky: true }
      );
      layer.on('click', () => selectField(p.field_id));
    }
  }).addTo(map);
}

function renderNDRELayer() {
  clearOverlayLayers();
  overlayLayers.ndre = L.geoJSON(fieldsGeoJSON, {
    style: (feature) => ({
      color: '#333',
      weight: 1,
      fillOpacity: 0.7,
      fillColor: ndreColor(feature.properties.ndre)
    }),
    onEachFeature: (feature, layer) => {
      const p = feature.properties;
      layer.bindTooltip(
        `<strong>${p.field_id}</strong><br>NDRE: ${p.ndre}`,
        { sticky: true }
      );
      layer.on('click', () => selectField(p.field_id));
    }
  }).addTo(map);
}

function renderStressLayer() {
  clearOverlayLayers();
  overlayLayers.stress = L.geoJSON(fieldsGeoJSON, {
    style: (feature) => ({
      color: '#333',
      weight: 1,
      fillOpacity: 0.65,
      fillColor: stressColor(feature.properties.status)
    }),
    onEachFeature: (feature, layer) => {
      const p = feature.properties;
      layer.bindTooltip(
        `<strong>${p.field_id}</strong><br>${stressTextLabel(p.status)}`,
        { sticky: true }
      );
      layer.on('click', () => selectField(p.field_id));
    }
  }).addTo(map);
}

/* ===========================================================
   FIELD SELECTION & HIGHLIGHT
   =========================================================== */
function selectField(fieldId) {
  selectedFieldId = fieldId;

  // Clear old highlight
  if (highlightLayer) {
    map.removeLayer(highlightLayer);
    highlightLayer = null;
  }

  // Find feature
  const feature = fieldsGeoJSON.features.find(
    f => f.properties.field_id.toUpperCase() === fieldId.toUpperCase()
  );
  if (!feature) return;

  // Highlight polygon
  highlightLayer = L.geoJSON(feature, {
    style: {
      color: '#ffcc00',
      weight: 4,
      fillOpacity: 0.12,
      fillColor: '#ffcc00',
      dashArray: '6, 4'
    }
  }).addTo(map);
  highlightLayer.bringToFront();

  // Update field analysis card
  const p = feature.properties;
  setText('card-field-id', p.field_id);
  setText('card-field-name', `${p.field_name} • ${p.crop} (${p.area_ha} ha)`);
  setText('card-area', p.area_ha + ' ha');

  const ndviEl = document.getElementById('card-ndvi');
  if (ndviEl) {
    ndviEl.textContent = p.ndvi != null ? p.ndvi.toFixed(2) : '—';
    ndviEl.style.color = ndviColor(p.ndvi);
  }

  const ndreEl = document.getElementById('card-ndre');
  if (ndreEl) {
    ndreEl.textContent = p.ndre != null ? p.ndre.toFixed(2) : '—';
  }

  // Status badge
  const statusMap = {
    'Healthy': { icon: '\u{1F7E2}', cls: 'healthy', stress: 'Low (Stable Canopy)' },
    'Moderate': { icon: '\u{1F7E1}', cls: 'moderate', stress: 'Moderate (Monitor Closely)' },
    'Potentially Stressed': { icon: '\u{1F534}', cls: 'stressed', stress: 'High (Field Scout Recommended)' }
  };
  const info = statusMap[p.status] || statusMap['Healthy'];
  setText('card-status-icon', info.icon);
  setText('card-status-text', p.status);
  setText('card-stress-level', info.stress);

  const badge = document.getElementById('card-status-badge');
  if (badge) {
    badge.className = 'field-status-badge ' + info.cls;
  }

  const stressEl = document.getElementById('card-stress-level');
  if (stressEl) {
    const colorMap = { healthy: '#2d6a4f', moderate: '#e9a820', stressed: '#d62828' };
    stressEl.style.color = colorMap[info.cls] || '#2d6a4f';
  }

  // Load timeseries
  loadTimeseries(fieldId);
}

/* ===========================================================
   TIMESERIES CHART
   =========================================================== */
async function loadTimeseries(fieldId) {
  try {
    const res = await fetch(`/api/fields/${fieldId}/timeseries`);
    if (!res.ok) return;
    const d = await res.json();

    // Backend returns { observations: { August: 0.65, September: 0.71, October: 0.69 }, is_declining, warning_message }
    const obs = d.observations || {};
    const months = Object.keys(obs);
    const ndviVals = Object.values(obs);

    // Ensure we have 3 values for Aug/Sep/Oct
    const augVal = ndviVals[0] != null ? ndviVals[0] : null;
    const sepVal = ndviVals[1] != null ? ndviVals[1] : null;
    const octVal = ndviVals[2] != null ? ndviVals[2] : null;

    // Update value labels
    setText('val-aug', augVal != null ? augVal.toFixed(2) : '—');
    setText('val-sep', sepVal != null ? sepVal.toFixed(2) : '—');

    const octEl = document.getElementById('val-oct');
    if (octEl) {
      octEl.textContent = octVal != null ? octVal.toFixed(2) : '—';
      if (octVal != null) {
        octEl.style.color = octVal >= 0.65 ? 'var(--healthy)' :
                             octVal >= 0.45 ? 'var(--moderate)' : 'var(--stressed)';
      }
    }

    // Update decline banner
    const banner = document.getElementById('decline-banner');
    const bannerIcon = document.getElementById('decline-banner-icon');
    const bannerText = document.getElementById('decline-banner-text');
    if (banner && bannerIcon && bannerText) {
      if (d.is_declining) {
        banner.className = 'decline-warning-banner warning';
        bannerIcon.textContent = 'warning';
        bannerText.textContent = d.warning_message || 'Potential decline in crop condition detected across observation windows.';
      } else {
        banner.className = 'decline-warning-banner stable';
        bannerIcon.textContent = 'check_circle';
        bannerText.textContent = d.warning_message || 'Crop condition is stable across observation windows.';
      }
    }

    // Render SVG chart
    renderTimeseriesChart(ndviVals);
  } catch (err) {
    console.error('Timeseries fetch error:', err);
  }
}

function renderTimeseriesChart(values) {
  // Chart area: viewBox 0 0 450 140, plot area x:40-440, y:20-120
  const xMin = 60, xMax = 420, yMin = 20, yMax = 120;
  const vMin = 0.3, vMax = 0.85;

  function mapX(i) {
    return xMin + (i / (values.length - 1)) * (xMax - xMin);
  }
  function mapY(v) {
    const clamped = Math.max(vMin, Math.min(vMax, v));
    return yMax - ((clamped - vMin) / (vMax - vMin)) * (yMax - yMin);
  }

  // Build line path
  const linePoints = values.map((v, i) => `${mapX(i).toFixed(1)},${mapY(v).toFixed(1)}`);
  const linePath = 'M' + linePoints.join(' L');

  // Area path (fill under line)
  const areaPath = linePath +
    ` L${mapX(values.length - 1).toFixed(1)},${yMax}` +
    ` L${mapX(0).toFixed(1)},${yMax} Z`;

  const lineEl = document.getElementById('chart-line-path');
  const areaEl = document.getElementById('chart-area-path');
  if (lineEl) lineEl.setAttribute('d', linePath);
  if (areaEl) areaEl.setAttribute('d', areaPath);

  // Render data points
  const pointsGroup = document.getElementById('chart-points-group');
  if (pointsGroup) {
    pointsGroup.innerHTML = '';
    const monthLabels = ['Aug', 'Sep', 'Oct'];
    values.forEach((v, i) => {
      const cx = mapX(i), cy = mapY(v);

      // Outer circle
      const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      outerCircle.setAttribute('cx', cx);
      outerCircle.setAttribute('cy', cy);
      outerCircle.setAttribute('r', '6');
      outerCircle.setAttribute('fill', 'white');
      outerCircle.setAttribute('stroke', '#1b4332');
      outerCircle.setAttribute('stroke-width', '2');
      pointsGroup.appendChild(outerCircle);

      // Inner dot
      const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      innerCircle.setAttribute('cx', cx);
      innerCircle.setAttribute('cy', cy);
      innerCircle.setAttribute('r', '3');
      innerCircle.setAttribute('fill', '#1b4332');
      pointsGroup.appendChild(innerCircle);

      // Value label
      const valText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      valText.setAttribute('x', cx);
      valText.setAttribute('y', cy - 12);
      valText.setAttribute('text-anchor', 'middle');
      valText.setAttribute('fill', '#1b4332');
      valText.setAttribute('font-size', '10');
      valText.setAttribute('font-weight', '700');
      valText.setAttribute('font-family', 'monospace');
      valText.textContent = v.toFixed(2);
      pointsGroup.appendChild(valText);

      // Month label on x-axis
      const monthText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      monthText.setAttribute('x', cx);
      monthText.setAttribute('y', yMax + 14);
      monthText.setAttribute('text-anchor', 'middle');
      monthText.setAttribute('fill', '#9ca3af');
      monthText.setAttribute('font-size', '10');
      monthText.setAttribute('font-family', 'monospace');
      monthText.textContent = monthLabels[i] || '';
      pointsGroup.appendChild(monthText);
    });
  }
}

/* ===========================================================
   LAYER SWITCHING
   =========================================================== */
function bindLayerSwitching() {
  // Base layer radio buttons
  const radios = document.querySelectorAll('input[name="base-layer"]');
  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      switchBaseLayer(e.target.value);
    });
  });

  // Cadastral checkbox
  const cadastralCb = document.getElementById('layer-cadastral');
  if (cadastralCb) {
    cadastralCb.addEventListener('change', () => {
      if (cadastralCb.checked) {
        if (cadastralLayer) cadastralLayer.addTo(map);
      } else {
        if (cadastralLayer && map.hasLayer(cadastralLayer)) map.removeLayer(cadastralLayer);
      }
    });
  }
}

function switchBaseLayer(layerName) {
  // Remove all base tiles
  Object.values(baseTiles).forEach(t => {
    if (map.hasLayer(t)) map.removeLayer(t);
  });
  clearOverlayLayers();

  switch (layerName) {
    case 'satellite':
      baseTiles.satellite.addTo(map);
      break;
    case 'rgb':
      baseTiles.rgb.addTo(map);
      break;
    case 'ndvi':
      baseTiles.satellite.addTo(map);
      renderNDVILayer();
      break;
    case 'ndre':
      baseTiles.satellite.addTo(map);
      renderNDRELayer();
      break;
    case 'stress':
      baseTiles.satellite.addTo(map);
      renderStressLayer();
      break;
    default:
      baseTiles.satellite.addTo(map);
  }

  // Re-add highlight if a field is selected
  if (highlightLayer) highlightLayer.bringToFront();

  updateLegend(layerName);
}

/* ===========================================================
   DYNAMIC LEGEND
   =========================================================== */
function updateLegend(layerName) {
  const legend = document.getElementById('dynamic-legend');
  if (!legend) return;

  let html = '';

  switch (layerName) {
    case 'ndvi':
      html = `
        <div class="legend-title">NDVI — Vegetation Index</div>
        <div class="legend-gradient-bar" style="background: linear-gradient(to right, #f44336, #ffeb3b, #cddc39, #8bc34a, #4caf50, #1b7a1b);"></div>
        <div class="legend-labels"><span>Low (0.0)</span><span>High (1.0)</span></div>
        <div class="legend-items">
          <div class="legend-item"><span class="legend-swatch" style="background:#1b7a1b;"></span>&#8805; 0.70 Vigorous</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#4caf50;"></span>0.60 – 0.70 Healthy</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#8bc34a;"></span>0.50 – 0.60 Moderate</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#cddc39;"></span>0.40 – 0.50 Low Vigor</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#ffeb3b;"></span>0.30 – 0.40 Sparse</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#f44336;"></span>&lt; 0.30 Bare/Stressed</div>
        </div>`;
      break;

    case 'ndre':
      html = `
        <div class="legend-title">NDRE — Chlorophyll Content</div>
        <div class="legend-gradient-bar" style="background: linear-gradient(to right, #e74c3c, #f9e79f, #48c9b0, #2e86c1, #1a5276);"></div>
        <div class="legend-labels"><span>Low</span><span>High</span></div>
        <div class="legend-items">
          <div class="legend-item"><span class="legend-swatch" style="background:#1a5276;"></span>&#8805; 0.50 High Chlorophyll</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#2e86c1;"></span>0.42 – 0.50 Healthy</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#48c9b0;"></span>0.35 – 0.42 Moderate</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#f9e79f;"></span>0.28 – 0.35 Low</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#e74c3c;"></span>&lt; 0.28 Deficient</div>
        </div>`;
      break;

    case 'stress':
      html = `
        <div class="legend-title">Crop Stress — Health Classification</div>
        <div class="legend-items">
          <div class="legend-item"><span class="legend-swatch" style="background:#2d6a4f;"></span>\u{1F7E2} Healthy</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#e9a820;"></span>\u{1F7E1} Moderate</div>
          <div class="legend-item"><span class="legend-swatch" style="background:#d62828;"></span>\u{1F534} Potential Stress</div>
        </div>
        <div class="legend-note">Based on NDVI/NDRE thresholds. Not a confirmed disease diagnosis.</div>`;
      break;

    case 'rgb':
      html = `
        <div class="legend-title">RGB — Natural Color View</div>
        <div class="legend-items">
          <div class="legend-item"><span class="legend-swatch" style="background: linear-gradient(135deg, #6db36d, #8b6914, #5a7d8c);"></span>Natural Color Composite</div>
        </div>
        <div class="legend-note">Standard map tiles used as RGB placeholder. Connect Sentinel-2 bands (B4, B3, B2) for true-color imagery.</div>`;
      break;

    case 'satellite':
      html = `
        <div class="legend-title">Satellite — Aerial Imagery</div>
        <div class="legend-items">
          <div class="legend-item"><span class="legend-swatch" style="background: linear-gradient(135deg, #3a5f0b, #6b8e23, #daa520);"></span>ESRI World Imagery</div>
        </div>`;
      break;

    default:
      html = `
        <div class="legend-title">Cadastral — Field Boundaries</div>
        <div class="legend-items">
          <div class="legend-item"><span class="legend-swatch" style="background:#2d6a4f; border: 2px solid #1b4332;"></span>Field Boundary</div>
        </div>`;
  }

  legend.innerHTML = html;
}

/* ===========================================================
   MAP CONTROL BUTTONS
   =========================================================== */
function bindControls() {
  // Zoom In
  const btnZoomIn = document.getElementById('btn-zoom-in');
  if (btnZoomIn) btnZoomIn.addEventListener('click', () => map.zoomIn());

  // Zoom Out
  const btnZoomOut = document.getElementById('btn-zoom-out');
  if (btnZoomOut) btnZoomOut.addEventListener('click', () => map.zoomOut());

  // Reset View
  const btnReset = document.getElementById('btn-reset');
  if (btnReset) btnReset.addEventListener('click', () => {
    if (cadastralLayer) {
      map.fitBounds(cadastralLayer.getBounds(), { padding: [30, 30] });
    } else {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    }
  });

  // Full Screen
  const btnFS = document.getElementById('btn-fullscreen');
  if (btnFS) {
    btnFS.addEventListener('click', () => {
      const mapSection = document.getElementById('map-section');
      if (!mapSection) return;

      if (!document.fullscreenElement) {
        mapSection.requestFullscreen().then(() => {
          setTimeout(() => map.invalidateSize(), 200);
        }).catch(() => {});
      } else {
        document.exitFullscreen().then(() => {
          setTimeout(() => map.invalidateSize(), 200);
        }).catch(() => {});
      }
    });
  }

  // Listen for fullscreen changes to resize map
  document.addEventListener('fullscreenchange', () => {
    setTimeout(() => map.invalidateSize(), 200);
  });

  // Fit Field
  const btnFit = document.getElementById('btn-fit-field');
  if (btnFit) {
    btnFit.addEventListener('click', () => {
      if (!selectedFieldId || !fieldsGeoJSON) return;
      const feature = fieldsGeoJSON.features.find(
        f => f.properties.field_id.toUpperCase() === selectedFieldId.toUpperCase()
      );
      if (feature) {
        const tempLayer = L.geoJSON(feature);
        map.fitBounds(tempLayer.getBounds(), { padding: [60, 60], maxZoom: 18 });
      }
    });
  }
}

/* ===========================================================
   UTILITY
   =========================================================== */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
