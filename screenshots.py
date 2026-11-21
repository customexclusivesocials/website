"""
Capture homepage screenshots of every live project in projects.js.
Run once on your own computer:
    pip install playwright && playwright install chromium
    python screenshots.py
Images are saved to images/portfolio/<slug>.jpg (the paths projects.js already expects).
"""
import re, json, subprocess, pathlib
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).parent
data = subprocess.run(
    ["node", "-e", 'global.window={};require("./projects.js");console.log(JSON.stringify(window.CES_PROJECTS))'],
    capture_output=True, text=True, cwd=root, check=True).stdout
projects = json.loads(data)
out = root / "images" / "portfolio"; out.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 1440, "height": 900})
    for pr in projects:
        if not pr["image"].startswith("images/portfolio/"):
            continue  # already has a hand-made screenshot
        try:
            page.goto(pr["url"], wait_until="networkidle", timeout=45000)
            page.wait_for_timeout(1500)
            page.screenshot(path=str(root / pr["image"]), type="jpeg", quality=82)
            print("saved", pr["image"])
        except Exception as e:
            print("FAILED", pr["name"], e)
    b.close()
