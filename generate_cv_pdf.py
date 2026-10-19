import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def create_resume_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    header_name_style = ParagraphStyle(
        'HeaderName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#1e1b4b')
    )
    
    header_title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#7c3aed')
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#475569')
    )
    
    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#1e1b4b'),
        spaceBefore=8,
        spaceAfter=4
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#334155')
    )
    
    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=body_style,
        leftIndent=10,
        firstLineIndent=-10,
        spaceAfter=2
    )

    story = []

    story.append(Paragraph("Lubna Akter", header_name_style))
    story.append(Paragraph("B.Pharm Student | Pharmaceutical Research, Drug Information & Medical Writing", header_title_style))
    story.append(Spacer(1, 3))
    
    contact_text = "+88 0133 95 91 307  |  heyitslubnaakter@gmail.com  |  linkedin.com/in/heyitslubnaakter  |  Gulshan, Vatara, Dhaka, Bangladesh"
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceBefore=2, spaceAfter=6))

    left_content = []
    
    left_content.append(Paragraph("Professional Summary", section_heading_style))
    summary_text = (
        "4th-Year B.Pharm student with hands-on exposure to pharmacology, drug information analysis, "
        "laboratory-based pharmaceutical research, medical writing, and healthcare content development. "
        "Skilled in literature review, data interpretation, quality-focused documentation, and collaborative work, "
        "with strong attention to detail. Seeking an entry-level opportunity in pharmaceutical research, "
        "drug information, or healthcare communication to apply analytical and scientific communication skills."
    )
    left_content.append(Paragraph(summary_text, body_style))
    left_content.append(Spacer(1, 4))

    left_content.append(Paragraph("Work & Entrepreneurial Experience", section_heading_style))
    
    left_content.append(Paragraph("<b>Co-Founder</b> | Neymat Home Décor", body_bold))
    left_content.append(Paragraph("<font color='#7c3aed'>04/2026 - Present | Dhaka, Bangladesh</font>", body_style))
    left_content.append(Paragraph("• Co-founded an early-stage home décor brand, building it from the ground up primarily through social media-based sales and marketing.", bullet_style))
    left_content.append(Paragraph("• Grew order volume by nearly 20% since launch by managing sourcing, inventory, and customer engagement end-to-end.", bullet_style))
    left_content.append(Spacer(1, 3))

    left_content.append(Paragraph("<b>Education Byte Builder</b> | Pharma Insights", body_bold))
    left_content.append(Paragraph("<font color='#7c3aed'>01/2026 - 02/2026 | Dhaka, Bangladesh</font>", body_style))
    left_content.append(Paragraph("• Produced research-backed content that strengthened platform credibility.", bullet_style))
    left_content.append(Paragraph("• Simplified complex pharma concepts into clear, engaging content.", bullet_style))
    left_content.append(Paragraph("• Researched pharmacy and healthcare topics to ensure content accuracy.", bullet_style))
    left_content.append(Spacer(1, 3))

    left_content.append(Paragraph("<b>Branch In-Charge</b> | Emaan", body_bold))
    left_content.append(Paragraph("<font color='#7c3aed'>05/2023 - 07/2023 | Dhaka, Bangladesh</font>", body_style))
    left_content.append(Paragraph("• Promoted to Branch In-Charge within one month for performance.", bullet_style))
    left_content.append(Paragraph("• Grew branch sales by up to 20% through strong customer engagement.", bullet_style))
    left_content.append(Paragraph("• Managed daily branch operations and supervised sales team performance.", bullet_style))
    left_content.append(Spacer(1, 4))

    left_content.append(Paragraph("Educational Qualification", section_heading_style))
    left_content.append(Paragraph("<b>Bachelor of Pharmacy (B. Pharm)</b>", body_bold))
    left_content.append(Paragraph("University of Information Technology & Sciences (2022 - Present) | CGPA: 3.37 / 4.00", body_style))
    left_content.append(Spacer(1, 2))
    left_content.append(Paragraph("<b>Higher Secondary Certificate (Science Group)</b>", body_bold))
    left_content.append(Paragraph("Govt. Kalachandpur High School and College (2019 - 2022) | GPA: 5.00 / 5.00", body_style))
    left_content.append(Spacer(1, 2))
    left_content.append(Paragraph("<b>Secondary School Certificate (Science Group)</b>", body_bold))
    left_content.append(Paragraph("Khilbarirtek Islamia High School (2017 - 2019) | GPA: 4.56 / 5.00", body_style))
    left_content.append(Spacer(1, 4))

    left_content.append(Paragraph("Academic Research Projects", section_heading_style))
    left_content.append(Paragraph("<b>Anti-Inflammatory Activity of Commelina erecta Extracts</b>", body_bold))
    left_content.append(Paragraph("Co-Researcher | Evaluated anti-inflammatory activity of methanolic and ethanolic Commelina erecta extracts using protein denaturation and HRBC membrane stabilization assays.", body_style))
    left_content.append(Spacer(1, 2))
    left_content.append(Paragraph("<b>Comparative Efficacy of Entecavir vs. Lamivudine in Chronic Hepatitis B</b>", body_bold))
    left_content.append(Paragraph("Co-Author | Compared antiviral efficacy of Entecavir and Lamivudine in chronic Hepatitis B with emphasis on public health relevance in Bangladesh.", body_style))

    right_content = []

    right_content.append(Paragraph("Pharmaceutical Knowledge", section_heading_style))
    right_content.append(Paragraph("Pharmacology, Medicinal Chemistry, Pharmaceutical Analysis, Quality Control, Pharmaceutical Technology, Pharmacognosy, Microbiology, Biopharmaceutics, Clinical Pharmacy, Hospital Pharmacy, Regulatory Affairs, Toxicology, Pharmaceutical Biotechnology", body_style))
    right_content.append(Spacer(1, 4))

    right_content.append(Paragraph("Professional Strengths", section_heading_style))
    right_content.append(Paragraph("Pharmaceutical Research, Laboratory Techniques, Drug Information Analysis, Quality Control Awareness, Regulatory Compliance, Scientific Writing, Critical Thinking, Attention to Detail, Problem Solving, Team Collaboration, Time Management, Adaptability", body_style))
    right_content.append(Spacer(1, 4))

    right_content.append(Paragraph("Tools & Research Support", section_heading_style))
    right_content.append(Paragraph("Microsoft Word, Excel, PowerPoint, PubMed, Google Scholar, Mendeley, SPSS, Literature Search, Statistical Analysis, ChemDraw", body_style))
    right_content.append(Spacer(1, 4))

    right_content.append(Paragraph("Training and Certifications", section_heading_style))
    right_content.append(Paragraph("<b>Computer Aided Drug and Vaccine Design</b><br/>BioPC", body_style))
    right_content.append(Spacer(1, 2))
    right_content.append(Paragraph("<b>Medicine Concept Plus (10th Batch)</b><br/>Clear Concept", body_style))
    right_content.append(Spacer(1, 4))

    right_content.append(Paragraph("Affiliations & Volunteering", section_heading_style))
    right_content.append(Paragraph("<b>Member</b>, Pharmacy Council of Bangladesh (PCB) (2023 - Present)", body_style))
    right_content.append(Spacer(1, 2))
    right_content.append(Paragraph("<b>Volunteer</b>, Bangladesh Girls Guide (2014 - 2018)<br/>Completed leadership and first-aid training, health awareness drives, and tree-plantation campaigns.", body_style))
    right_content.append(Spacer(1, 4))

    right_content.append(Paragraph("Languages", section_heading_style))
    right_content.append(Paragraph("Bengali (Native) | English (Professional)", body_style))
    right_content.append(Spacer(1, 4))

    right_content.append(Paragraph("References", section_heading_style))
    right_content.append(Paragraph("<b>Dr. Md. Mofazzal Hossain</b><br/>Associate Professor & Head, PhD in Medicinal Chemistry<br/>University of Information Technology & Sciences<br/>Phone: +880 9678008487 Ext-309<br/>Email: mofazzal.hossain@uits.ac.bd", body_style))

    col_widths = [260, 260]
    table_data = [[left_content, right_content]]
    t = Table(table_data, colWidths=col_widths)
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (1,0), (1,0), 10),
        ('RIGHTPADDING', (0,0), (0,0), 10),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))

    story.append(t)
    doc.build(story)

if __name__ == '__main__':
    os.makedirs('public', exist_ok=True)
    os.makedirs('dist', exist_ok=True)
    create_resume_pdf('public/Lubna_Akter_BPharm_Resume.pdf')
    create_resume_pdf('dist/Lubna_Akter_BPharm_Resume.pdf')
    print("PDF generated successfully!")
