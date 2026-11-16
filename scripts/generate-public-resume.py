"""Render public portfolio JSON supplied as argv[1]; requires reportlab.
Export JSON using the command documented in README.md. No private source PDF is read.
"""
import json, sys
from html import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
p=json.load(open(sys.argv[1]))
out=sys.argv[2] if len(sys.argv)>2 else 'public/resume/vishaka-parab-public-resume.pdf'
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameVP',fontName='Helvetica-Bold',fontSize=24,leading=28,textColor=HexColor('#273e2b'),spaceAfter=6))
styles.add(ParagraphStyle(name='SectionVP',fontName='Helvetica-Bold',fontSize=10,leading=13,textColor=HexColor('#345c40'),spaceBefore=13,spaceAfter=7))
styles.add(ParagraphStyle(name='BodyVP',fontName='Helvetica',fontSize=9,leading=13,spaceAfter=4,textColor=HexColor('#303630')))
styles.add(ParagraphStyle(name='SmallVP',fontName='Helvetica',fontSize=8,leading=11,spaceAfter=5,textColor=HexColor('#626a61')))
story=[]
def para(text,style='BodyVP'):
    story.append(Paragraph(text,styles[style]))
def section(title):
    para(title,'SectionVP')
    story.append(HRFlowable(width='100%',thickness=.4,color=HexColor('#dce1d7'),spaceAfter=6))
def clean(text):
    return escape(text.replace('—','-').replace('–','-').replace('’',"'").replace('·',' / '))
para(clean(p['profile']['name']).upper(),'NameVP')
para('FRONTEND ENGINEER | REACT | NEXT.JS | TYPESCRIPT')
para('Mumbai, India | <link href="https://www.linkedin.com/in/vishakaparab/">linkedin.com/in/vishakaparab</link> | <link href="https://github.com/vishaka1203">github.com/vishaka1203</link>','SmallVP')
section('PROFILE')
para(clean(p['profile']['summary']))
section('PROFESSIONAL EXPERIENCE')
for e in p['experience']:
    para('<b>'+clean(e['role'])+'</b> | '+clean(e['dates']))
    para(clean(e['company'])+' / '+clean(e['location']),'SmallVP')
    for point in e['points']: para('- '+clean(point))
    story.append(Spacer(1,4))
section('TECHNICAL SKILLS')
for group,items in p['skills'].items():
    para('<b>'+clean(group)+':</b> '+clean(', '.join(items)))
section('EDUCATION')
e=p['education']
para('<b>'+clean(e['degree'])+'</b> | '+clean(e['dates']))
para(clean(e['school'])+' | '+clean(e['result']))
section('CERTIFICATIONS')
for c in p['certifications']: para(clean(c['title'])+' | '+clean(c['issuer'])+' | '+c['year'])
para('Public portfolio edition / Phone number and email omitted. Contact via LinkedIn.','SmallVP')
SimpleDocTemplate(out,pagesize=(595.28,841.89),rightMargin=40,leftMargin=40,topMargin=35,bottomMargin=30,title='Vishaka Parab - Public Resume',author='Vishaka Parab').build(story)
print(out)
