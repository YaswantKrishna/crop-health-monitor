#!/usr/bin/env python3
"""
CropPulse - Satellite Crop Health Monitoring System
Local Development & Presentation Server
"""

import http.server
import socketserver
import os
import sys
import json
import webbrowser

# Ensure UTF-8 output on Windows console
if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CropPulseHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for smooth dev experience
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        # API Routes
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "healthy",
                "system": "CropPulse Earth Observation Engine",
                "sentinelSatellite": "Sentinel-2 MSI",
                "groundResolution": "10m"
            }).encode('utf-8'))
            return

        super().do_GET()

def main():
    os.chdir(DIRECTORY)
    port = PORT
    
    # Allow port override from command line
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass

    handler = CropPulseHandler
    
    # Allow socket address reuse to avoid 'Address already in use' errors
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print("=" * 60)
            print("[CROP PULSE] Satellite-Based Crop Health Monitoring System")
            print(f"[STATUS] Server running at: http://localhost:{port}")
            print(f"[DIR] Serving directory: {DIRECTORY}")
            print("=" * 60)
            print("Press Ctrl+C to stop the server.")
            
            # Optional auto-open in browser if requested
            if '--open' in sys.argv:
                webbrowser.open(f'http://localhost:{port}')
                
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping CropPulse server. Goodbye!")
    except Exception as e:
        print(f"Server error: {e}")

if __name__ == '__main__':
    main()
