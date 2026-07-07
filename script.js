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

    const greetingElement = document.getElementById('dynamic-greeting');

    if (greetingElement) {
        // Dynamic greeting based on parameters
        if (company && recruiter) {
            greetingElement.textContent = `Hallo ${recruiter}, willkommen ${company} Team!`;
        } else if (company) {
            greetingElement.textContent = `Willkommen ${company} Team!`;
        } else if (recruiter) {
            greetingElement.textContent = `Hallo ${recruiter}!`;
        }
    } else {
        console.warn("Element with ID 'dynamic-greeting' not found.");
    }
}

// Run immediately if DOM is ready, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
