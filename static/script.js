// Rigorous input sanitization
function sanitizeInput(str) {
    if (!str) return null;
    // Allow alphanumeric, space, underscore, hyphen and German umlauts
    let sanitized = str.replace(/[^a-zA-Z0-9 _\-äöüÄÖÜß]/g, '').trim();
    return sanitized.length > 0 ? sanitized : null;
}

function initPortfolio() {
    console.log("Portfolio script initialized.");
    
    const urlParams = new URLSearchParams(window.location.search);
    const company = sanitizeInput(urlParams.get('c'));
    const recruiter = sanitizeInput(urlParams.get('ref'));
    const category = sanitizeInput(urlParams.get('cat'));
    
    console.log(`Parsed params - Company: ${company}, Recruiter: ${recruiter}`);

    const personalizationBox = document.getElementById('personalization-box');
    const personalizationText = document.getElementById('personalization-text');
    const dynamicBadge = document.getElementById('dynamic-badge');
    const dynamicBadgeText = document.getElementById('dynamic-badge-text');

    if (personalizationBox && personalizationText) {
        if (company && recruiter) {
            personalizationText.textContent = `Hallo ${recruiter}, willkommen ${company} Team! Schön, dass ihr hier seid.`;
            personalizationBox.style.display = 'block';
        } else if (company) {
            personalizationText.textContent = `Willkommen ${company} Team! Schön, dass ihr hier seid.`;
            personalizationBox.style.display = 'block';
        } else if (recruiter) {
            personalizationText.textContent = `Hallo ${recruiter}! Schön, dass du hier bist.`;
            personalizationBox.style.display = 'block';
        }

        if (company && dynamicBadge && dynamicBadgeText) {
            dynamicBadgeText.textContent = `${company} Zugang`;
            dynamicBadge.style.display = 'inline-flex';
        }
    } else {
        console.warn("Personalization elements not found.");
    }

    const dynamicSubtitle = document.getElementById('dynamic-subtitle');
    const dynamicDescription = document.getElementById('dynamic-description');
    
    if (category) {
        if (category.includes("Soziales")) {
            document.body.classList.add('theme-soziales');
            if (dynamicSubtitle) dynamicSubtitle.textContent = "Soziale Fachkraft & Betreuung";
            if (dynamicDescription) dynamicDescription.textContent = "Mit großem Einfühlungsvermögen und Engagement unterstütze ich Menschen in ihrem Alltag. Fokus auf individuelle Förderung, Kommunikation und eine vertrauensvolle Basis in der sozialen Arbeit.";
        } else if (category.includes("Verwaltung")) {
            document.body.classList.add('theme-verwaltung');
            if (dynamicSubtitle) dynamicSubtitle.textContent = "Verwaltung, Kontrolle & Organisation";
            if (dynamicDescription) dynamicDescription.textContent = "Akribische Arbeitsweise, hohe Zuverlässigkeit und starkes Verantwortungsbewusstsein. Ich sorge für reibungslose Abläufe und die exakte Einhaltung von Richtlinien im öffentlichen Dienst.";
        } else if (category.includes("Kaufmännisch")) {
            document.body.classList.add('theme-kaufmaennisch');
            if (dynamicSubtitle) dynamicSubtitle.textContent = "Vertrieb & Kaufmännisches Management";
            if (dynamicDescription) dynamicDescription.textContent = "Zielorientiert, kommunikationsstark und kundenfokussiert. Mein Ziel ist es, durch strategisches Handeln und Verhandlungsgeschick messbare Erfolge für das Unternehmen zu erzielen.";
        } else if (category.includes("Handwerk")) {
            document.body.classList.add('theme-handwerk');
            if (dynamicSubtitle) dynamicSubtitle.textContent = "Handwerkliche & Technische Fachkraft";
            if (dynamicDescription) dynamicDescription.textContent = "Praxisorientierte Problemlösungen, handwerkliches Geschick und absolute Verlässlichkeit. Ich packe an, wo es nötig ist, und lege großen Wert auf saubere und dauerhafte Ergebnisse.";
        }
    }
}

// Run immediately if DOM is ready, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
