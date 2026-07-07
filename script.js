document.addEventListener('DOMContentLoaded', () => {
    // Helper function for rigorous input sanitization
    function sanitizeInput(str) {
        if (!str) return null;
        // Only allow alphanumeric characters, spaces, dashes, and German umlauts
        let sanitized = str.replace(/[^a-zA-Z0-9 \-_äöüÄÖÜß]/g, '').trim();
        return sanitized.length > 0 ? sanitized : null;
    }

    // Parse query parameters and sanitize rigorously
    const urlParams = new URLSearchParams(window.location.search);
    const company = sanitizeInput(urlParams.get('c'));
    const recruiter = sanitizeInput(urlParams.get('ref'));
    const jobTitle = sanitizeInput(urlParams.get('job'));

    const greetingElement = document.getElementById('dynamic-greeting');

    // Dynamic greeting based on parameters
    if (company && recruiter) {
        greetingElement.textContent = `Hallo ${recruiter}, willkommen ${company} Team!`;
    } else if (company) {
        greetingElement.textContent = `Willkommen ${company} Team!`;
    } else if (recruiter) {
        greetingElement.textContent = `Hallo ${recruiter}!`;
    }

    // Analytics / Webhook Hook (Simulated)
    if (company || recruiter) {
        console.log(`Visit logged: Company=${company}, Recruiter=${recruiter}, Job=${jobTitle}`);
        // In a real scenario, we might trigger a serverless function here
        /*
        fetch('https://api.yourdomain.com/log-visit', {
            method: 'POST',
            body: JSON.stringify({ company, recruiter, timestamp: new Date() })
        });
        */
    }
});
