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
    
    # Configure template variables based on category
    if "Soziales" in cat:
        theme = "theme-soziales"
        subtitle = "Soziale Fachkraft & Betreuung"
        description = "Mit großem Einfühlungsvermögen und Engagement unterstütze ich Menschen in ihrem Alltag. Fokus auf individuelle Förderung, Kommunikation und eine vertrauensvolle Basis in der sozialen Arbeit."
    elif "Verwaltung" in cat:
        theme = "theme-verwaltung"
        subtitle = "Verwaltung, Kontrolle & Organisation"
        description = "Akribische Arbeitsweise, hohe Zuverlässigkeit und starkes Verantwortungsbewusstsein. Ich sorge für reibungslose Abläufe und die exakte Einhaltung von Richtlinien im öffentlichen Dienst."
    elif "Kaufmännisch" in cat:
        theme = "theme-kaufmaennisch"
        subtitle = "Vertrieb & Kaufmännisches Management"
        description = "Zielorientiert, kommunikationsstark und kundenfokussiert. Mein Ziel ist es, durch strategisches Handeln und Verhandlungsgeschick messbare Erfolge für das Unternehmen zu erzielen."
    elif "Handwerk" in cat:
        theme = "theme-handwerk"
        subtitle = "Handwerkliche & Technische Fachkraft"
        description = "Praxisorientierte Problemlösungen, handwerkliches Geschick und absolute Verlässlichkeit. Ich packe an, wo es nötig ist, und lege großen Wert auf saubere und dauerhafte Ergebnisse."
    else:
        theme = ""
        subtitle = "Open-Source & Network Security Specialist"
        description = "Spezialist für Systemhärtung, Linux/Unix-Administration und Netzwerk-Integrität. Über zwei Jahrzehnte Praxis in der Konzeptionierung und Absicherung quelloffener Infrastrukturen, restriktiver Firewalls und datenschutzkonformer Architekturen."

    return templates.TemplateResponse('index.html.j2', {
        'request': request,
        'company': c,
        'recruiter': ref,
        'category': cat,
        'job': job,
        'theme_class': theme,
        'subtitle': subtitle,
        'description': description
    })

app = Starlette(debug=False, routes=[
    Route('/', homepage),
    Mount('/static', app=StaticFiles(directory='static'), name='static'),
])
