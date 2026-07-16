document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("c") || "";
    const ref = params.get("ref") || "";
    const cat = params.get("cat") || "IT & Technologie";
    const job = params.get("job") || "";
    const gender = (params.get("gender") || "m").toLowerCase();

    // Language detection
    const userLang = navigator.language || navigator.userLanguage || "";
    const lang = userLang.toLowerCase().startsWith("de") ? "de" : "en";

    // Texts
    const t = {
        nav_about: lang === "de" ? "Über mich" : "About Me",
        nav_skills: lang === "de" ? "Kompetenzen" : "Skills",
        nav_exp: lang === "de" ? "Werdegang" : "Experience",
        nav_contact: lang === "de" ? "Kontakt" : "Contact",
        cta_req: lang === "de" ? "Bewerbung anfordern" : "Request CV",
        hello: lang === "de" ? "Hallo, ich bin" : "Hello, I am",
        spec_for: lang === "de" ? "Speziell für" : "Specially for",
        proj_btn: lang === "de" ? "Projekte ansehen" : "View Projects",
        cont_btn: lang === "de" ? "Kontakt aufnehmen" : "Contact Me",
        stat_exp: lang === "de" ? "Jahre Erfahrung" : "Years Experience",
        stat_proj: lang === "de" ? "Erfolgreiche Projekte" : "Successful Projects",
        stat_cli: lang === "de" ? "Zufriedene Klienten" : "Happy Clients",
        zugang: lang === "de" ? "Zugang" : "Access"
    };

    // Category Logic
    let theme = "theme-it";
    let subtitle = lang === "de" ? "System-Administration & Security" : "System Administration & Security";
    let description = lang === "de" ? 
        "Spezialist für Systemhärtung, Linux/Unix-Administration und Netzwerk-Integrität. Praxis in der Konzeptionierung quelloffener Infrastrukturen und datenschutzkonformer Architekturen." : 
        "Specialist in system hardening, Linux/Unix administration, and network integrity. Experienced in designing open-source infrastructures and privacy-compliant architectures.";
    let img_keyword = gender === "m" ? "male,sysadmin" : "female,sysadmin";

    if (cat.includes("Soziales")) {
        theme = "theme-soziales";
        subtitle = lang === "de" ? "Soziale Fachkraft & Betreuung" : "Social Worker & Care Professional";
        description = lang === "de" ? 
            "Mit großem Einfühlungsvermögen und Engagement unterstütze ich Menschen in ihrem Alltag. Fokus auf individuelle Förderung, Kommunikation und eine vertrauensvolle Basis in der sozialen Arbeit." : 
            "With great empathy and dedication, I support people in their daily lives. Focusing on individual development, communication, and building a foundation of trust in social work.";
        img_keyword = gender === "m" ? "male,nurse" : "female,nurse";
    } else if (cat.includes("Verwaltung")) {
        theme = "theme-verwaltung";
        subtitle = lang === "de" ? "Verwaltung, Kontrolle & Organisation" : "Administration, Control & Organization";
        description = lang === "de" ? 
            "Akribische Arbeitsweise, hohe Zuverlässigkeit und starkes Verantwortungsbewusstsein. Ich sorge für reibungslose Abläufe und die exakte Einhaltung von Richtlinien im öffentlichen Dienst." : 
            "Meticulous work ethic, high reliability, and a strong sense of responsibility. I ensure smooth operations and strict compliance with guidelines in public service.";
        img_keyword = gender === "m" ? "businessman,office" : "businesswoman,office";
    } else if (cat.includes("Kaufmännisch")) {
        theme = "theme-kaufmaennisch";
        subtitle = lang === "de" ? "Vertrieb & Kaufmännisches Management" : "Sales & Commercial Management";
        description = lang === "de" ? 
            "Zielorientiert, kommunikationsstark und kundenfokussiert. Mein Ziel ist es, durch strategisches Handeln und Verhandlungsgeschick messbare Erfolge für das Unternehmen zu erzielen." : 
            "Goal-oriented, strong communicator, and customer-focused. My objective is to achieve measurable success for the company through strategic action and negotiation skills.";
        img_keyword = gender === "m" ? "male,manager" : "female,manager";
    } else if (cat.includes("Handwerk")) {
        theme = "theme-handwerk";
        subtitle = lang === "de" ? "Handwerkliche & Technische Fachkraft" : "Craft & Technical Specialist";
        description = lang === "de" ? 
            "Praxisorientierte Problemlösungen, handwerkliches Geschick und absolute Verlässlichkeit. Ich packe an, wo es nötig ist, und lege großen Wert auf saubere und dauerhafte Ergebnisse." : 
            "Practical problem-solving, craftsmanship, and absolute reliability. I get hands-on where needed and place great value on clean and durable results.";
        img_keyword = gender === "m" ? "male,mechanic" : "female,mechanic";
    }

    // Apply Theme
    document.body.className = theme;
    
    // Apply Static Texts
    document.getElementById("nav-about").innerText = t.nav_about;
    document.getElementById("nav-skills").innerText = t.nav_skills;
    document.getElementById("nav-exp").innerText = t.nav_exp;
    document.getElementById("nav-contact").innerText = t.nav_contact;
    document.getElementById("cta-req").innerText = t.cta_req;
    document.getElementById("hello-text").innerText = t.hello;
    document.getElementById("proj-btn").innerText = t.proj_btn;
    document.getElementById("cont-btn").innerText = t.cont_btn;
    document.getElementById("stat-exp").innerText = t.stat_exp;
    document.getElementById("stat-proj").innerText = t.stat_proj;
    document.getElementById("stat-cli").innerText = t.stat_cli;
    
    // Apply Dynamic Texts
    document.getElementById("dynamic-subtitle").innerText = subtitle;
    document.getElementById("dynamic-description").innerText = description;
    
    // Set Avatar Image
    const avatarSrc = `https://loremflickr.com/400/500/${img_keyword}?random=1`;
    document.getElementById("hero-avatar").src = avatarSrc;

    // Greeting Badge
    if (c) {
        document.getElementById("dynamic-badge").style.display = "inline-flex";
        document.getElementById("dynamic-badge-text").innerText = `${c} ${t.zugang}`;
    }

    // Personalization Banner
    const pBox = document.getElementById("personalization-box");
    const specFor = document.getElementById("spec-for");
    const msgText = document.getElementById("msg-text");

    if (c || ref) {
        pBox.style.display = "block";
        if (c) {
            specFor.innerText = `${t.spec_for} ${c}`;
        } else {
            specFor.style.display = "none";
        }

        let job_text = "";
        if (job) {
            job_text = lang === "de" ? `als ${job} ` : `as ${job} `;
        }
        
        if (ref) {
            msgText.innerHTML = lang === "de" ? 
                `Sehr geehrte/r ${ref}, vielen Dank für Ihr Interesse an meinem Profil. Ich habe diese Mappe speziell auf die Anforderungen Ihrer Vakanz <strong>${job_text}</strong>abgestimmt.` :
                `Dear ${ref}, thank you for your interest in my profile. I have tailored this portfolio specifically to the requirements of your vacancy <strong>${job_text}</strong>.`;
        } else {
            msgText.innerHTML = lang === "de" ? 
                "Vielen Dank für Ihr Interesse an meinem Profil. Ich habe diese Mappe speziell auf Ihre Anforderungen abgestimmt." : 
                "Thank you for your interest in my profile. I have tailored this portfolio specifically to your requirements.";
        }
    } else {
        pBox.style.display = "none";
    }
});
