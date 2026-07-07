// Rigorous input sanitization
function sanitizeInput(str) {
    if (!str) return null;
    // Allow alphanumeric, space, underscore, hyphen and German umlauts
    let sanitized = str.replace(/[^a-zA-Z0-9 _\-äöüÄÖÜß]/g, '').trim();
    return sanitized.length > 0 ? sanitized : null;
}

function initPortfolio() {
    console.log("Portfolio script initialized.");
    
    // Parse query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const company = sanitizeInput(urlParams.get('c'));
    const recruiter = sanitizeInput(urlParams.get('ref'));
    
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
}

// Run immediately if DOM is ready, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
