"""
Edit CV PDFs using redaction-based approach (redact old text, insert new text).
This modifies the original PDF in-place rather than recreating from scratch.
"""
import fitz
import shutil
import os

# ── Constants ──────────────────────────────────────────────────────────────
BLUE_COLOR = (0.102, 0.227, 0.420)  # Section title color rgb(26,58,107)
BLACK = (0, 0, 0)
DARK_GREY = (44/255, 44/255, 44/255)   # rgb(44,44,44) - body text
LIGHT_GREY = (74/255, 74/255, 74/255)  # rgb(74,74,74) - secondary text

BASE = r"c:\Users\Simohamed ezzahar\OneDrive\portfolio"

def edit_en_cv():
    src = os.path.join(BASE, "Mohammed_Ezzahar_CV_EN_2.pdf")
    dst = os.path.join(BASE, "Mohammed_Ezzahar_CV_EN_2_new.pdf")
    doc = fitz.open(src)
    page = doc[0]
    
    # ── 1. HEADER: Replace contact line ──────────────────────────────
    # Line 1: y=78.05 "Meknes, Morocco · ... · github.com/motheanalyst ·"
    # Line 2: y=89.05 "Mohammed's Datalab"
    # Redact both lines
    page.add_redact_annot(fitz.Rect(0, 70, 600, 95), fill=(1,1,1))
    
    # ── 2. EDUCATION: Change degree title ────────────────────────────
    # B03: "Moulay Ismail University — Faculty of Economics & Finance"  y=126.25
    page.add_redact_annot(fitz.Rect(44, 118, 410, 134), fill=(1,1,1))
    
    # B04 L00: "BSc Economics, Data Science & Finance — Honours Track"  y=138.75
    page.add_redact_annot(fitz.Rect(50, 131, 400, 146), fill=(1,1,1))
    
    # ── 3. COURSEWORK: Replace coursework lines ─────────────────────
    # B04 L01: bullet + "Coursework: Financial Modeling, Econometrics..." y=151.15
    # B04 L02: "Finance, Macroeconomic Theory" y=163.15
    page.add_redact_annot(fitz.Rect(50, 143, 560, 172), fill=(1,1,1))
    
    # ── 4. TECHINNOVATE: Remove entire section ──────────────────────
    # B07 starts at y=316.55, ends at B07 L06 y=381.05 + line height ~10
    # Next section "SELECTED PROJECTS" is at y=398.45
    # We need to blank TechInnovate and shift everything below it up
    tech_y_start = 308  # Just above TechInnovate title
    tech_y_end = 395    # Just before SELECTED PROJECTS line
    shift = tech_y_end - tech_y_start  # ~87px to shift up
    
    # Instead of shifting (which is complex), we'll redact TechInnovate and
    # move all content below up. The cleanest way: redact the entire area
    # from TechInnovate to the bottom, then re-insert everything shifted up.
    
    # First, collect all spans below TechInnovate (from SELECTED PROJECTS onward)
    blocks = page.get_text("dict")["blocks"]
    spans_to_reinsert = []
    drawings_to_reinsert = []
    
    for b in blocks:
        if b["type"] != 0:
            continue
        for line in b["lines"]:
            for s in line["spans"]:
                oy = s["origin"][1]
                if oy >= 398:  # From SELECTED PROJECTS onward
                    spans_to_reinsert.append({
                        "text": s["text"],
                        "origin": (s["origin"][0], s["origin"][1]),
                        "font": s["font"],
                        "size": s["size"],
                        "color": s["color"],
                    })
    
    # Collect drawings below TechInnovate
    for d in page.get_drawings():
        for item in d["items"]:
            if item[0] == "l" and item[1].y > 395:
                drawings_to_reinsert.append({
                    "p1": (item[1].x, item[1].y),
                    "p2": (item[2].x, item[2].y),
                    "color": d.get("color"),
                    "width": d.get("width", 1),
                })
    
    # Redact everything from TechInnovate to bottom
    page.add_redact_annot(fitz.Rect(0, tech_y_start, 600, 850), fill=(1,1,1))
    
    # ── 5. SKILLS: Add Sage, SAP ─────────────────────────────────────
    # Will be handled during re-insertion below
    
    # ── 6. LEADERSHIP: Fix github.com/motheanalyst → mohammedezzahar ──
    # Will be handled during re-insertion below
    
    # ── Apply all redactions ─────────────────────────────────────────
    page.apply_redactions()
    
    # ── Insert replacement text ──────────────────────────────────────
    
    # 1. New contact line (centered)
    contact = "Meknes, Morocco \u00b7 +212 609-233-284 \u00b7 m.ezzahar@edu.umi.ac.ma \u00b7 linkedin.com/in/mohammedezzahar \u00b7 github.com/mohammedezzahar"
    tw = fitz.get_text_length(contact, fontname="helv", fontsize=8.2)
    cx = (page.rect.width - tw) / 2
    page.insert_text(fitz.Point(cx, 78.05), contact, fontname="helv", fontsize=8.2, color=LIGHT_GREY)
    
    # 2. University name
    page.insert_text(fitz.Point(45.35, 126.25), "Moulay Ismail University \u2014 Faculty of Economics & Finance",
                     fontname="TiBo", fontsize=9.5, color=(26/255, 26/255, 26/255))
    
    # 3. Degree title  
    page.insert_text(fitz.Point(51.35, 138.75), "BSc Accounting, Finance & Fiscality \u2014 Honours Track",
                     fontname="TiIt", fontsize=9.0, color=DARK_GREY)
    
    # 4. New coursework
    page.insert_text(fitz.Point(51.35, 151.15), "\u2022", fontname="helv", fontsize=10.0, color=DARK_GREY)
    page.insert_text(fitz.Point(60.85, 151.15),
                     "Coursework: Financial Modeling, Accounting, Management, Marketing, Treasury Management, Machine Learning, Database Systems,",
                     fontname="helv", fontsize=8.6, color=DARK_GREY)
    page.insert_text(fitz.Point(61.35, 163.15),
                     "Tax Law & Public Finance, Macroeconomic Theory",
                     fontname="helv", fontsize=8.6, color=DARK_GREY)
    
    # 5. Re-insert all content below TechInnovate, shifted up
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
        r = ((c >> 16) & 255) / 255
        g = ((c >> 8) & 255) / 255
        b = (c & 255) / 255
        return (r, g, b)
    
    for sp in spans_to_reinsert:
        new_y = sp["origin"][1] - shift
        new_x = sp["origin"][0]
        text = sp["text"]
        fnt = map_font(sp["font"])
        sz = sp["size"]
        clr = color_int_to_rgb(sp["color"])
        
        # Check if it's a blue section title → make it black
        r_int = (sp["color"] >> 16) & 255
        g_int = (sp["color"] >> 8) & 255
        b_int = sp["color"] & 255
        if r_int == 26 and g_int == 58 and b_int == 107:
            clr = BLUE_COLOR  # Keep blue for section titles (user only said black for licence line)
        
        # Skills: Add Sage, SAP before the Analytics line content
        if "Power BI" in text and "Tableau" in text:
            text = "Sage \u00b7 SAP \u00b7 Power BI \u00b7 Tableau \u00b7 Plotly / Seaborn / Matplotlib \u00b7 Excel (pivot tables, macros, solver, Power Query)"
        
        # Leadership: Fix github URL
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
    print(f"EN CV saved to {dst}")


def edit_fr_cv():
    src = os.path.join(BASE, "Mohammed_Ezzahar_CV_FR_1.pdf")
    dst = os.path.join(BASE, "Mohammed_Ezzahar_CV_FR_1_new.pdf")
    doc = fitz.open(src)
    page = doc[0]
    
    # ── 1. HEADER: Replace contact line ──────────────────────────────
    page.add_redact_annot(fitz.Rect(0, 70, 600, 95), fill=(1,1,1))
    
    # ── 2. EDUCATION: Change university + degree ─────────────────────
    # B03: "Universite Moulay Ismail — Faculte des Sciences Economiques et de Gestion" y=126.25
    page.add_redact_annot(fitz.Rect(44, 118, 430, 134), fill=(1,1,1))
    
    # B04 L00: "Licence en Economie, Data Science & Finance — Mention Bien" y=138.75
    page.add_redact_annot(fitz.Rect(50, 131, 420, 146), fill=(1,1,1))
    
    # ── 3. COURSEWORK ────────────────────────────────────────────────
    page.add_redact_annot(fitz.Rect(50, 143, 560, 172), fill=(1,1,1))
    
    # ── 4. TECHINNOVATE ──────────────────────────────────────────────
    tech_y_start = 296
    tech_y_end = 383
    shift = tech_y_end - tech_y_start
    
    blocks = page.get_text("dict")["blocks"]
    spans_to_reinsert = []
    drawings_to_reinsert = []
    
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
    
    for d in page.get_drawings():
        for item in d["items"]:
            if item[0] == "l" and item[1].y > 383:
                drawings_to_reinsert.append({
                    "p1": (item[1].x, item[1].y),
                    "p2": (item[2].x, item[2].y),
                    "color": d.get("color"),
                    "width": d.get("width", 1),
                })
    
    page.add_redact_annot(fitz.Rect(0, tech_y_start, 600, 850), fill=(1,1,1))
    
    page.apply_redactions()
    
    # ── Insert replacements ──────────────────────────────────────────
    
    # 1. Contact line
    contact = "Meknes, Maroc \u00b7 +212 609-233-284 \u00b7 m.ezzahar@edu.umi.ac.ma \u00b7 linkedin.com/in/mohammedezzahar \u00b7 github.com/mohammedezzahar"
    tw = fitz.get_text_length(contact, fontname="helv", fontsize=8.2)
    cx = (page.rect.width - tw) / 2
    page.insert_text(fitz.Point(cx, 78.05), contact, fontname="helv", fontsize=8.2, color=LIGHT_GREY)
    
    # 2. University
    page.insert_text(fitz.Point(45.35, 126.25), 
                     "Universit\u00e9 Moulay Ismail \u2014 Facult\u00e9 des Sciences Economiques",
                     fontname="TiBo", fontsize=9.5, color=(26/255, 26/255, 26/255))
    
    # 3. Degree - with BLACK color as user requested
    page.insert_text(fitz.Point(51.35, 138.75), 
                     "Licence en Comptabilit\u00e9, Finance & Fiscalit\u00e9 \u2014 Mention Assez Bien",
                     fontname="TiIt", fontsize=9.0, color=BLACK)
    
    # 4. Coursework
    page.insert_text(fitz.Point(51.35, 151.15), "\u2022", fontname="helv", fontsize=10.0, color=DARK_GREY)
    page.insert_text(fitz.Point(60.85, 151.15),
                     "Cours pertinents : Comptabilit\u00e9 approfondie, Maths financiers, Mod\u00e9lisation financi\u00e8re, Machine Learning, Bases de donn\u00e9es,",
                     fontname="helv", fontsize=8.6, color=DARK_GREY)
    page.insert_text(fitz.Point(61.35, 163.15),
                     "Droit fiscal & Finances publiques, Macro\u00e9conomie",
                     fontname="helv", fontsize=8.6, color=DARK_GREY)
    
    # 5. Re-insert content below, shifted up
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
        r = ((c >> 16) & 255) / 255
        g = ((c >> 8) & 255) / 255
        b = (c & 255) / 255
        return (r, g, b)
    
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
    
    for dr in drawings_to_reinsert:
        p1 = fitz.Point(dr["p1"][0], dr["p1"][1] - shift)
        p2 = fitz.Point(dr["p2"][0], dr["p2"][1] - shift)
        page.draw_line(p1, p2, color=dr["color"], width=dr["width"])
    
    doc.save(dst)
    doc.close()
    print(f"FR CV saved to {dst}")


if __name__ == "__main__":
    edit_en_cv()
    edit_fr_cv()
