"""Generate the approved resume from the portfolio's verified public content.
Export profile.ts to JSON as documented in README.md; requires reportlab.
"""
import json
import sys
from html import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor

with open(sys.argv[1]) as source:
    content = json.load(source)
output = sys.argv[2] if len(sys.argv) > 2 else 'public/resume/vishaka-parab-public-resume.pdf'
profile = content['profile']
portfolio = 'https://vishaka-parab-portfolio.vercel.app'
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameVP', fontName='Helvetica-Bold', fontSize=24, leading=28, textColor=HexColor('#273e2b'), spaceAfter=7))
styles.add(ParagraphStyle(name='SectionVP', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=HexColor('#345c40'), spaceBefore=14, spaceAfter=6, keepWithNext=True))
styles.add(ParagraphStyle(name='BodyVP', fontName='Helvetica', fontSize=9, leading=13, spaceAfter=5, textColor=HexColor('#303630')))
styles.add(ParagraphStyle(name='SmallVP', fontName='Helvetica', fontSize=8, leading=11, spaceAfter=5, textColor=HexColor('#626a61')))
styles.add(ParagraphStyle(name='RoleVP', parent=styles['BodyVP'], fontName='Helvetica-Bold', keepWithNext=True))
story = []
def clean(text):
    return escape(text.replace('—', '-').replace('–', '-').replace('’', "'").replace('·', ' / '))
def para(text, style='BodyVP'):
    story.append(Paragraph(text, styles[style]))
def section(title):
    para(title, 'SectionVP')
    story.append(HRFlowable(width='100%', thickness=.4, color=HexColor('#dce1d7'), spaceAfter=6))
def link(url, label):
    return '<link href="' + escape(url, quote=True) + '">' + clean(label) + '</link>'

para(clean(profile['name']).upper(), 'NameVP')
para('SOFTWARE DEVELOPER | REACT | NEXT.JS | TYPESCRIPT')
para('Mumbai, India | ' + link('mailto:' + profile['email'], profile['email']), 'SmallVP')
para(link(portfolio, 'Portfolio: vishaka-parab-portfolio.vercel.app'), 'SmallVP')
para(link(profile['linkedin'], 'linkedin.com/in/vishakaparab') + ' | ' + link(profile['github'], 'github.com/vishaka1203'), 'SmallVP')
section('PROFILE')
para(clean(profile['summary']))
para(clean(profile['about']))
section('PROFESSIONAL EXPERIENCE')
project_labels = [
    'Cloud Protect - cloud security, governance, compliance, analytics, and reporting.',
    'Budget Management and Leave Management HR Application for logistics operations.',
    'Learning Management System (LMS) - responsive UI development and API integration.',
]
for index, experience in enumerate(content['experience']):
    para(clean(experience['role']) + ' | ' + clean(experience['dates']), 'RoleVP')
    para(clean(experience['company']) + ' / ' + clean(experience['location']), 'SmallVP')
    para('<b>Company projects:</b> ' + clean(project_labels[index]))
    for point in experience['points']:
        para('- ' + clean(point))
    story.append(Spacer(1, 5))

story.append(PageBreak())
para('VISHAKA PARAB / SOFTWARE DEVELOPER', 'RoleVP')
section('SELECTED INDEPENDENT PROJECTS')
for slug in ['curating-frames', 'wushu-goa', 'url-shortener']:
    project = next(project for project in content['projects'] if project['slug'] == slug)
    items = [Paragraph(clean(project['title']) + ' | ' + project['createdAt'][:4], styles['RoleVP']),
             Paragraph(clean(project['summary']), styles['BodyVP']),
             Paragraph(clean(', '.join(project['technologies'])), styles['SmallVP']),
             Paragraph(link(project['githubUrl'], 'Source code') + (' | ' + link(project['liveUrl'], 'Live website') if project.get('liveUrl') else ''), styles['SmallVP']),
             Spacer(1, 6)]
    story.append(KeepTogether(items))
section('TECHNICAL SKILLS')
for group, items in content['skills'].items():
    para('<b>' + clean(group) + ':</b> ' + clean(', '.join(items)))
section('EDUCATION')
education = content['education']
para('<b>' + clean(education['degree']) + '</b> | ' + clean(education['dates']))
para(clean(education['school']) + ' | ' + clean(education['result']))
section('CERTIFICATIONS')
for certification in content['certifications']:
    para(clean(certification['title']) + ' | ' + clean(certification['issuer']) + ' | ' + certification['year'])

def footer(canvas, doc):
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(HexColor('#626a61'))
    canvas.drawString(40, 22, 'Vishaka Parab | Software Developer')
    canvas.drawRightString(555, 22, str(doc.page))

SimpleDocTemplate(output, pagesize=(595.28, 841.89), rightMargin=40, leftMargin=40, topMargin=35, bottomMargin=38, title='Vishaka Parab - Software Developer Resume', author='Vishaka Parab').build(story, onFirstPage=footer, onLaterPages=footer)
print(output)
