"""
Full edit of French CV from original, incorporating ALL requested changes:
1. GitHub → mohammedezzahar, remove Mohammed's Datalab
2. Faculte des Sciences Economiques (sans 'et de Gestion')
3. Licence en Comptabilite, Finance & Fiscalite — Mention Assez Bien (BLACK color)
4. Coursework: remove Econometrie, Finance d'entreprise; add Comptabilite approfondie, Maths financiers
5. Remove TechInnovate section
6. Add Sage, SAP in skills
7. Change FORMATION → EDUCATION
8. Remove thin underline below EDUCATION title
9. Keep Bloomberg/CFA line intact
"""
import fitz
import os

BASE = r"c:\Users\Simohamed ezzahar\OneDrive\portfolio"
BLUE_COLOR = (0.102, 0.227, 0.420)
BLACK = (0, 0, 0)
DARK_GREY = (44/255, 44/255, 44/255)
LIGHT_GREY = (74/255, 74/255, 74/255)

def map_font(fname):
    if "Bold" in fname and "Helvetica" in fname:
        return "hebo"
    elif "Oblique" in fname or ("Italic" in fname and "Helvetica" in fname):
        return "heit"
    elif "Bold" in fname and "Times" in fname:
        return "TiBo"
    elif "Italic" in fname and "Times" in fname:
        return "TiIt"
    elif "Times" in fname:
        return "TiRo"
    else:
        return "helv"

def color_int_to_rgb(c):
    return (((c >> 16) & 255) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255)

src = os.path.join(BASE, "Mohammed_Ezzahar_CV_FR_1.pdf")
dst = os.path.join(BASE, "Mohammed_Ezzahar_CV_FR_1_new.pdf")

doc = fitz.open(src)
page = doc[0]

# ── 1. HEADER: Remove contact + Datalab lines ───────────────────────
page.add_redact_annot(fitz.Rect(0, 70, 600, 95), fill=(1,1,1))

# ── 2. FORMATION → EDUCATION + remove thin underline ────────────────
# "FORMATION" at y=110.25
page.add_redact_annot(fitz.Rect(49, 101, 150, 117), fill=(1,1,1))
# Thin underline D01 at y≈113.8 (width=0.7)
page.add_redact_annot(fitz.Rect(50, 112, 545, 116), fill=(1,1,1))

# ── 3. EDUCATION: University name ────────────────────────────────────
# "Universite Moulay Ismail — Faculte des Sciences Economiques et de Gestion" y=126.25
page.add_redact_annot(fitz.Rect(44, 118, 430, 134), fill=(1,1,1))

# ── 4. Degree title ─────────────────────────────────────────────────
# "Licence en Economie, Data Science & Finance — Mention Bien" y=138.75
page.add_redact_annot(fitz.Rect(50, 131, 420, 146), fill=(1,1,1))

# ── 5. COURSEWORK only (NOT Bloomberg line) ─────────────────────────
# Coursework line 1 at y=151.15, line 2 at y=163.15
# Bloomberg/CFA line starts at y=176.95 — DO NOT redact that
page.add_redact_annot(fitz.Rect(50, 143, 560, 170), fill=(1,1,1))

# ── 6. Bloomberg line: fix "Mention Bien" → "Mention Assez Bien" ────
# The text " — obtenu · Mention Bien ; major de promotion en" is at y=176.95
# We need to redact just that span and replace it
# Span starts at x≈334.20 and goes to end of line
page.add_redact_annot(fitz.Rect(333, 169, 560, 185), fill=(1,1,1))

# ── 7. TECHINNOVATE: Remove and shift ───────────────────────────────
tech_y_start = 296
tech_y_end = 383
shift = tech_y_end - tech_y_start

# Collect all spans from PROJETS SELECTIONNES onward
blocks = page.get_text("dict")["blocks"]
spans_to_reinsert = []
for b in blocks:
    if b["type"] != 0:
        continue
    for line in b["lines"]:
        for s in line["spans"]:
            oy = s["origin"][1]
            if oy >= 386:
                spans_to_reinsert.append({
                    "text": s["text"],
                    "origin": (s["origin"][0], s["origin"][1]),
                    "font": s["font"],
                    "size": s["size"],
                    "color": s["color"],
                })

# Collect drawings below TechInnovate
drawings_to_reinsert = []
for d in page.get_drawings():
    for item in d["items"]:
        if item[0] == "l" and item[1].y > 383:
            drawings_to_reinsert.append({
                "p1": (item[1].x, item[1].y),
                "p2": (item[2].x, item[2].y),
                "color": d.get("color"),
                "width": d.get("width", 1),
            })

# Redact everything from TechInnovate to bottom
page.add_redact_annot(fitz.Rect(0, tech_y_start, 600, 850), fill=(1,1,1))

# ── Apply all redactions ─────────────────────────────────────────────
page.apply_redactions()

# ── INSERT REPLACEMENTS ──────────────────────────────────────────────

# 1. Contact line (centered, no Datalab)
contact = "Meknes, Maroc \u00b7 +212 609-233-284 \u00b7 m.ezzahar@edu.umi.ac.ma \u00b7 linkedin.com/in/mohammedezzahar \u00b7 github.com/mohammedezzahar"
tw = fitz.get_text_length(contact, fontname="helv", fontsize=8.2)
cx = (page.rect.width - tw) / 2
page.insert_text(fitz.Point(cx, 78.05), contact, fontname="helv", fontsize=8.2, color=LIGHT_GREY)

# 2. "EDUCATION" instead of "FORMATION"
page.insert_text(fitz.Point(51.35, 110.25), "EDUCATION",
                 fontname="TiBo", fontsize=9.2, color=BLUE_COLOR)

# 3. University name (sans "et de Gestion")
page.insert_text(fitz.Point(45.35, 126.25),
                 "Universit\u00e9 Moulay Ismail \u2014 Facult\u00e9 des Sciences Economiques",
                 fontname="TiBo", fontsize=9.5, color=(26/255, 26/255, 26/255))

# 4. Degree (BLACK color per user request)
page.insert_text(fitz.Point(51.35, 138.75),
                 "Licence en Comptabilit\u00e9, Finance & Fiscalit\u00e9 \u2014 Mention Assez Bien",
                 fontname="TiIt", fontsize=9.0, color=BLACK)

# 5. New coursework
page.insert_text(fitz.Point(51.35, 151.15), "\u2022", fontname="helv", fontsize=10.0, color=DARK_GREY)
page.insert_text(fitz.Point(60.85, 151.15),
                 "Cours pertinents : Comptabilit\u00e9 approfondie, Maths financiers, Mod\u00e9lisation financi\u00e8re, Machine Learning, Bases de donn\u00e9es,",
                 fontname="helv", fontsize=8.6, color=DARK_GREY)
page.insert_text(fitz.Point(61.35, 163.15),
                 "Droit fiscal & Finances publiques, Macro\u00e9conomie",
                 fontname="helv", fontsize=8.6, color=DARK_GREY)

# 6. Bloomberg fix: re-insert the tail part with "Mention Assez Bien"
page.insert_text(fitz.Point(334.20, 176.95),
                 " \u2014 obtenu \u00b7 Mention Assez Bien ; major de promotion en",
                 fontname="helv", fontsize=8.6, color=DARK_GREY)

# 7. Re-insert all shifted content
for sp in spans_to_reinsert:
    new_y = sp["origin"][1] - shift
    new_x = sp["origin"][0]
    text = sp["text"]
    fnt = map_font(sp["font"])
    sz = sp["size"]
    clr = color_int_to_rgb(sp["color"])

    r_int = (sp["color"] >> 16) & 255
    g_int = (sp["color"] >> 8) & 255
    b_int = sp["color"] & 255
    if r_int == 26 and g_int == 58 and b_int == 107:
        clr = BLUE_COLOR

    # Skills: Add Sage, SAP
    if "Power BI" in text and "Tableau" in text:
        text = "Sage \u00b7 SAP \u00b7 Power BI \u00b7 Tableau \u00b7 Plotly / Seaborn / Matplotlib \u00b7 Excel (tableaux crois\u00e9s, macros, solveur, Power Query)"

    # Fix github URL
    if "motheanalyst" in text:
        text = text.replace("motheanalyst", "mohammedezzahar")

    page.insert_text(fitz.Point(new_x, new_y), text, fontname=fnt, fontsize=sz, color=clr)

# Re-insert drawings shifted up
for dr in drawings_to_reinsert:
    p1 = fitz.Point(dr["p1"][0], dr["p1"][1] - shift)
    p2 = fitz.Point(dr["p2"][0], dr["p2"][1] - shift)
    page.draw_line(p1, p2, color=dr["color"], width=dr["width"])

doc.save(dst)
doc.close()
print(f"FR CV saved to {dst}")

# Copy to final locations
import shutil
final = os.path.join(BASE, "Mohammed_Ezzahar_CV_FR_1.pdf")
info_final = os.path.join(BASE, "info", "Mohammed_Ezzahar_CV_FR_1.pdf")
shutil.copy2(dst, final)
shutil.copy2(dst, info_final)
os.remove(dst)
print("Copied to original and info locations, cleaned up temp file.")
