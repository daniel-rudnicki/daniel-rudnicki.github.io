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
    
    # Configure template variables based on category
    if "Soziales" in cat:
        theme = "theme-soziales"
        subtitle = "Soziale Fachkraft & Betreuung"
        description = "Mit großem Einfühlungsvermögen und Engagement unterstütze ich Menschen in ihrem Alltag. Fokus auf individuelle Förderung, Kommunikation und eine vertrauensvolle Basis in der sozialen Arbeit."
        img_keyword = "male,nurse" if gender == "m" else "female,nurse"
        img_bg = "16a34a"
    elif "Verwaltung" in cat:
        theme = "theme-verwaltung"
        subtitle = "Verwaltung, Kontrolle & Organisation"
        description = "Akribische Arbeitsweise, hohe Zuverlässigkeit und starkes Verantwortungsbewusstsein. Ich sorge für reibungslose Abläufe und die exakte Einhaltung von Richtlinien im öffentlichen Dienst."
        img_keyword = "businessman,office" if gender == "m" else "businesswoman,office"
        img_bg = "0f172a"
    elif "Kaufmännisch" in cat:
        theme = "theme-kaufmaennisch"
        subtitle = "Vertrieb & Kaufmännisches Management"
        description = "Zielorientiert, kommunikationsstark und kundenfokussiert. Mein Ziel ist es, durch strategisches Handeln und Verhandlungsgeschick messbare Erfolge für das Unternehmen zu erzielen."
        img_keyword = "male,manager" if gender == "m" else "female,manager"
        img_bg = "b45309"
    elif "Handwerk" in cat:
        theme = "theme-handwerk"
        subtitle = "Handwerkliche & Technische Fachkraft"
        description = "Praxisorientierte Problemlösungen, handwerkliches Geschick und absolute Verlässlichkeit. Ich packe an, wo es nötig ist, und lege großen Wert auf saubere und dauerhafte Ergebnisse."
        img_keyword = "male,mechanic" if gender == "m" else "female,mechanic"
        img_bg = "ea580c"
    else:
        theme = ""
        subtitle = "Open-Source & Network Security Specialist"
        description = "Spezialist für Systemhärtung, Linux/Unix-Administration und Netzwerk-Integrität. Über zwei Jahrzehnte Praxis in der Konzeptionierung und Absicherung quelloffener Infrastrukturen, restriktiver Firewalls und datenschutzkonformer Architekturen."
        img_keyword = "male,sysadmin" if gender == "m" else "female,sysadmin"
        img_bg = "0088ff"

    hero_image = f"https://loremflickr.com/400/500/{img_keyword}?random=1"

    return templates.TemplateResponse('index.html.j2', {
        'request': request,
        'company': c,
        'recruiter': ref,
        'category': cat,
        'job': job,
        'theme_class': theme,
        'subtitle': subtitle,
        'description': description,
        'hero_image': hero_image
    })

app = Starlette(debug=False, routes=[
    Route('/', homepage),
    Mount('/static', app=StaticFiles(directory='static'), name='static'),
])
