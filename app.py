from starlette.applications import Starlette
from starlette.routing import Route, Mount
from starlette.templating import Jinja2Templates
from starlette.staticfiles import StaticFiles
import html

templates = Jinja2Templates(directory='templates')

async def homepage(request):
    c = html.escape(request.query_params.get('c', ''))
    ref = html.escape(request.query_params.get('ref', ''))
    cat = html.escape(request.query_params.get('cat', 'IT & Technologie'))
    job = html.escape(request.query_params.get('job', ''))
    gender = html.escape(request.query_params.get('gender', 'm')).lower()
    
    # Language detection
    accept_lang = request.headers.get('accept-language', '').lower()
    lang = 'de' if 'de' in accept_lang else 'en'

    t = {
        'nav_about': 'Über mich' if lang == 'de' else 'About Me',
        'nav_skills': 'Kompetenzen' if lang == 'de' else 'Skills',
        'nav_exp': 'Werdegang' if lang == 'de' else 'Experience',
        'nav_contact': 'Kontakt' if lang == 'de' else 'Contact',
        'cta_req': 'Bewerbung anfordern' if lang == 'de' else 'Request CV',
        'hello': 'Hallo, ich bin' if lang == 'de' else 'Hello, I am',
        'spec_for': 'Speziell für' if lang == 'de' else 'Specially for',
        'proj_btn': 'Projekte ansehen' if lang == 'de' else 'View Projects',
        'cont_btn': 'Kontakt aufnehmen' if lang == 'de' else 'Contact Me',
        'stat_exp': 'Jahre Erfahrung' if lang == 'de' else 'Years Experience',
        'stat_proj': 'Abgeschlossene Projekte' if lang == 'de' else 'Completed Projects',
        'stat_cli': 'Sicherheits-Audits' if lang == 'de' else 'Security Audits',
        'zugang': 'Zugang' if lang == 'de' else 'Access'
    }

    if ref:
        if job:
            job_text = f"als <strong>{job}</strong> " if lang == 'de' else f"as <strong>{job}</strong> "
        else:
            job_text = ""
        
        if lang == 'de':
            t['msg'] = f"Sehr geehrte/r {ref}, vielen Dank für Ihr Interesse an meinem Profil. Ich habe diese Mappe speziell auf die Anforderungen Ihrer Vakanz {job_text}abgestimmt."
        else:
            t['msg'] = f"Dear {ref}, thank you for your interest in my profile. I have tailored this portfolio specifically to the requirements of your vacancy {job_text}."
    else:
        t['msg'] = "Vielen Dank für Ihr Interesse an meinem Profil. Ich habe diese Mappe speziell auf Ihre Anforderungen abgestimmt." if lang == 'de' else "Thank you for your interest in my profile. I have tailored this portfolio specifically to your requirements."

    # Configure template variables based on category
    if "Soziales" in cat:
        theme = "theme-soziales"
        subtitle = "Soziale Fachkraft & Betreuung" if lang == 'de' else "Social Worker & Care Professional"
        description = "Mit großem Einfühlungsvermögen und Engagement unterstütze ich Menschen in ihrem Alltag. Fokus auf individuelle Förderung, Kommunikation und eine vertrauensvolle Basis in der sozialen Arbeit." if lang == 'de' else "With great empathy and dedication, I support people in their daily lives. Focusing on individual development, communication, and building a foundation of trust in social work."
        img_keyword = "male,nurse" if gender == "m" else "female,nurse"
    elif "Verwaltung" in cat:
        theme = "theme-verwaltung"
        subtitle = "Verwaltung, Kontrolle & Organisation" if lang == 'de' else "Administration, Control & Organization"
        description = "Akribische Arbeitsweise, hohe Zuverlässigkeit und starkes Verantwortungsbewusstsein. Ich sorge für reibungslose Abläufe und die exakte Einhaltung von Richtlinien im öffentlichen Dienst." if lang == 'de' else "Meticulous work ethic, high reliability, and a strong sense of responsibility. I ensure smooth operations and strict compliance with guidelines in public service."
        img_keyword = "businessman,office" if gender == "m" else "businesswoman,office"
    elif "Kaufmännisch" in cat:
        theme = "theme-kaufmaennisch"
        subtitle = "Vertrieb & Kaufmännisches Management" if lang == 'de' else "Sales & Commercial Management"
        description = "Zielorientiert, kommunikationsstark und kundenfokussiert. Mein Ziel ist es, durch strategisches Handeln und Verhandlungsgeschick messbare Erfolge für das Unternehmen zu erzielen." if lang == 'de' else "Goal-oriented, strong communicator, and customer-focused. My objective is to achieve measurable success for the company through strategic action and negotiation skills."
        img_keyword = "male,manager" if gender == "m" else "female,manager"
    elif "Handwerk" in cat:
        theme = "theme-handwerk"
        subtitle = "Handwerkliche & Technische Fachkraft" if lang == 'de' else "Craft & Technical Specialist"
        description = "Praxisorientierte Problemlösungen, handwerkliches Geschick und absolute Verlässlichkeit. Ich packe an, wo es nötig ist, und lege großen Wert auf saubere und dauerhafte Ergebnisse." if lang == 'de' else "Practical problem-solving, craftsmanship, and absolute reliability. I get hands-on where needed and place great value on clean and durable results."
        img_keyword = "male,mechanic" if gender == "m" else "female,mechanic"
    else:
        theme = "theme-it"
        subtitle = "System-Administration & Security" if lang == 'de' else "System Administration & Security"
        description = "Spezialist für Systemhärtung, Linux/Unix-Administration und Netzwerk-Integrität. Praxis in der Konzeptionierung quelloffener Infrastrukturen und datenschutzkonformer Architekturen." if lang == 'de' else "Specialist in system hardening, Linux/Unix administration, and network integrity. Experienced in designing open-source infrastructures and privacy-compliant architectures."
        img_keyword = "male,sysadmin" if gender == "m" else "female,sysadmin"

    hero_image = f"https://loremflickr.com/400/500/{img_keyword}?random=1"

    return templates.TemplateResponse('index.html.j2', {
        'request': request,
        'company': c,
        't': t,
        'theme_class': theme,
        'subtitle': subtitle,
        'description': description,
        'hero_image': hero_image
    })

app = Starlette(debug=False, routes=[
    Route('/', homepage),
    Mount('/static', app=StaticFiles(directory='static'), name='static'),
])
