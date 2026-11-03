import os, subprocess, json

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE_DIR = "/Users/tony/Desktop/Repos/filtertemp"
FINALS_DIR = os.path.join(BASE_DIR, "finals")
BG_URL = f"file://{BASE_DIR}/filterflightsn.png"

def render_poster(filename, body_content, extra_css="", top_offset=165):
    html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@600;700;800;900&family=Pacifico&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      margin: 0; padding: 0; overflow: hidden; background: #ffffff;
      font-family: 'Barlow Condensed', sans-serif;
    }}
    .poster-canvas {{
      width: 1080px;
      height: 1440px;
      position: relative;
      overflow: hidden;
      background-image: url('{BG_URL}');
      background-size: 1080px 1440px;
      background-position: center;
    }}
    .content-area {{
      position: absolute;
      top: {top_offset}px;
      left: 0;
      width: 1080px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }}
    {extra_css}
  </style>
</head>
<body>
  <div class="poster-canvas">
    <div class="content-area">
      {body_content}
    </div>
  </div>
</body>
</html>"""
    
    html_path = os.path.join(BASE_DIR, "scratch/html_deals", f"{filename}.html")
    out_png = os.path.join(FINALS_DIR, f"{filename}.png")
    
    with open(html_path, "w") as f:
        f.write(html)
        
    cmd = [
        CHROME_BIN,
        "--headless",
        "--window-size=1080,1440",
        "--virtual-time-budget=3000",
        "--run-all-compositor-stages-before-draw",
        f"--screenshot={out_png}",
        f"file://{html_path}"
    ]
    res = subprocess.run(cmd, capture_output=True)
    if res.returncode == 0:
        print(f"✓ Rendered: finals/{filename}.png")
    else:
        print(f"✗ Error on {filename}: {res.stderr.decode()[:200]}")
