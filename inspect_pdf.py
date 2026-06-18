import fitz

def dump(path):
    print(f"\n{'='*60}")
    print(f"FILE: {path}")
    print(f"{'='*60}")
    doc = fitz.open(path)
    page = doc[0]
    blocks = page.get_text("dict")["blocks"]
    for bi, b in enumerate(blocks):
        if b["type"] != 0:
            continue
        for li, line in enumerate(b["lines"]):
            for si, s in enumerate(line["spans"]):
                ox, oy = s["origin"]
                r, g, bl = (s["color"] >> 16) & 255, (s["color"] >> 8) & 255, s["color"] & 255
                print(f"B{bi:02d} L{li:02d} S{si:02d} | y={oy:7.2f} x={ox:6.2f} | sz={s['size']:5.2f} | font={s['font']:30s} | rgb=({r},{g},{bl}) | [{s['text']}]")
    
    print(f"\n--- DRAWINGS ---")
    for i, d in enumerate(page.get_drawings()):
        for item in d["items"]:
            if item[0] == "l":
                print(f"D{i:02d} line: ({item[1].x:.1f},{item[1].y:.1f})->({item[2].x:.1f},{item[2].y:.1f}) color={d.get('color')} width={d.get('width')}")
    doc.close()

dump(r"Mohammed_Ezzahar_CV_EN_2.pdf")
dump(r"Mohammed_Ezzahar_CV_FR_1.pdf")
