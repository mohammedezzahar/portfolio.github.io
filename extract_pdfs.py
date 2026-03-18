import sys
try:
    import fitz  # PyMuPDF
except ImportError:
    import os
    os.system('pip install pymupdf')
    import fitz

pdf_paths = [
    r"c:\Users\Simohamed ezzahar\OneDrive\portfolio\Finance_Analytics_Skills_Report_2026.pdf",
    r"c:\Users\Simohamed ezzahar\OneDrive\portfolio\IB_HedgeFunds_StockMarkets_Report_2026.pdf",
    r"c:\Users\Simohamed ezzahar\OneDrive\portfolio\Mohammed_Ezzahar_CV_EN_1page.pdf",
    r"c:\Users\Simohamed ezzahar\OneDrive\portfolio\Mohammed_Ezzahar_CV_EN_2.pdf",
    r"c:\Users\Simohamed ezzahar\OneDrive\portfolio\Mohammed_Ezzahar_CV_FR_1.pdf",
    r"c:\Users\Simohamed ezzahar\OneDrive\portfolio\Mohammed_Ezzahar_CV_FR_1page.pdf"
]

with open('pdf_content.txt', 'w', encoding='utf-8') as out:
    for path in pdf_paths:
        out.write(f"\n\n--- EXTRACTING: {path} ---\n\n")
        try:
            doc = fitz.open(path)
            for page in doc:
                out.write(page.get_text() + "\n")
            doc.close()
        except Exception as e:
            out.write(f"Failed to read with PyMuPDF: {e}\n")
print("Done extracting PDFs to pdf_content.txt")
