document.addEventListener("DOMContentLoaded", () => {
    // Utility to prevent DOM XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }

    const params = new URLSearchParams(window.location.search);
    const c = escapeHTML(params.get("c") || "");
    const ref = escapeHTML(params.get("ref") || "");
    const cat = escapeHTML(params.get("cat") || "IT & Technologie");
    const job = escapeHTML(params.get("job") || "");
    let gender = (params.get("gender") || "m").toLowerCase();
    if (gender !== "m" && gender !== "f") {
        gender = "m";
    }

    // Language detection: Default to German unless English is requested
    const userLang = navigator.language || navigator.userLanguage || "";
    const lang = userLang.toLowerCase().startsWith("en") ? "en" : "de";

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
        zugang: lang === "de" ? "Zugang" : "Access",
        contact_tag: lang === "de" ? "Verbindung" : "Connect",
        contact_title: lang === "de" ? "Bewerbungsunterlagen & Kontakt" : "Application Documents & Contact",
        contact_desc: lang === "de" ? "Fordern Sie meine vollständigen Zeugnisse und Lebensläufe an oder treten Sie direkt in Kontakt." : "Request my complete certificates and resume or contact me directly.",
        contact_info_title: lang === "de" ? "Kontaktinformationen" : "Contact Information",
        req_docs_title: lang === "de" ? "Bewerbungs-Paket anfordern" : "Request Application Package",
        req_docs_desc: lang === "de" ? "Vollständiger Lebenslauf, Zertifikate und Zeugnisse als PDF-Dokument." : "Complete resume, certificates, and references as a PDF document.",
        req_docs_btn: lang === "de" ? "Unterlagen anfordern" : "Request Documents",
        label_name: lang === "de" ? "Ihr Name" : "Your Name",
        label_email: lang === "de" ? "E-Mail-Adresse" : "Email Address",
        label_subject: lang === "de" ? "Betreff" : "Subject",
        label_message: lang === "de" ? "Nachricht" : "Message",
        submit_btn_text: lang === "de" ? "Nachricht senden" : "Send Message",
        placeholder_name: lang === "de" ? "z. B. Nicole Nellen" : "e.g. Jane Doe",
        placeholder_email: lang === "de" ? "ihre.adresse@firma.de" : "your.address@company.com",
        placeholder_subject: lang === "de" ? "z. B. Bewerbung als IT-Systemadministrator" : "e.g. Application as System Administrator",
        placeholder_message: lang === "de" ? "Sehr geehrter Herr Rudnicki..." : "Dear Mr. Rudnicki..."
    };

    // Category Logic
    let theme = "theme-it";
    let subtitle = lang === "de" ? "System-Administration & Security" : "System Administration & Security";
    let description = lang === "de" ? 
        "Spezialist für Systemhärtung, Linux/Unix-Administration und Netzwerk-Integrität. Praxis in der Konzeptionierung quelloffener Infrastrukturen und datenschutzkonformer Architekturen." : 
        "Specialist in system hardening, Linux/Unix administration, and network integrity. Experienced in designing open-source infrastructures and privacy-compliant architectures.";
    let avatarSrc = `/static/avatars/it_${gender}.jpg`;
    let contactInfoText = lang === "de" ? 
        "Daniel Rudnicki ist bereit für anspruchsvolle Aufgaben in der Systemintegration, Härtung und Netzwerkabsicherung." : 
        "Daniel Rudnicki is ready for challenging tasks in system integration, hardening, and network security.";

    if (cat.includes("Soziales")) {
        theme = "theme-soziales";
        subtitle = lang === "de" ? "Soziale Fachkraft & Betreuung" : "Social Worker & Care Professional";
        description = lang === "de" ? 
            "Mit großem Einfühlungsvermögen und Engagement unterstütze ich Menschen in ihrem Alltag. Fokus auf individuelle Förderung, Kommunikation und eine vertrauensvolle Basis in der sozialen Arbeit." : 
            "With great empathy and dedication, I support people in their daily lives. Focusing on individual development, communication, and building a foundation of trust in social work.";
        avatarSrc = `/static/avatars/soziales_${gender}.jpg`;
        contactInfoText = lang === "de" ? 
            "Daniel Rudnicki ist bereit für anspruchsvolle Aufgaben in der Betreuung, Pflege und sozialen Arbeit." : 
            "Daniel Rudnicki is ready for challenging tasks in care, support, and social work.";
    } else if (cat.includes("Administration") || cat.includes("Verwaltung")) {
        theme = "theme-verwaltung";
        subtitle = lang === "de" ? "Verwaltung, Kontrolle & Organisation" : "Administration, Control & Organization";
        description = lang === "de" ? 
            "Akribische Arbeitsweise, hohe Zuverlässigkeit und starkes Verantwortungsbewusstsein. Ich sorge für reibungslose Abläufe und die exakte Einhaltung von Richtlinien im öffentlichen Dienst." : 
            "Meticulous work ethic, high reliability, and a strong sense of responsibility. I ensure smooth operations and strict compliance with guidelines in public service.";
        avatarSrc = `/static/avatars/verwaltung_${gender}.jpg`;
        contactInfoText = lang === "de" ? 
            "Daniel Rudnicki ist bereit für anspruchsvolle Aufgaben in der Sachbearbeitung, Verwaltung und Compliance." : 
            "Daniel Rudnicki is ready for challenging tasks in administration, organization, and compliance.";
    } else if (cat.includes("Sales")) {
        theme = "theme-sales";
        subtitle = lang === "de" ? "Vertrieb & Kaufmännisches Management" : "Sales & Commercial Management";
        description = lang === "de" ? 
            "Zielorientiert, kommunikationsstark und kundenfokussiert. Mein Ziel ist es, durch strategisches Handeln und Verhandlungsgeschick messbare Erfolge für das Unternehmen zu erzielen." : 
            "Goal-oriented, strong communicator, and customer-focused. My objective is to achieve measurable success for the company through strategic action and negotiation skills.";
        avatarSrc = `/static/avatars/sales_${gender}.jpg`;
        contactInfoText = lang === "de" ? 
            "Daniel Rudnicki ist bereit für anspruchsvolle Aufgaben im Vertrieb, Key Account Management und kaufmännischen Bereich." : 
            "Daniel Rudnicki is ready for challenging tasks in sales, account management, and commercial operations.";
    } else if (cat.includes("Handwerk")) {
        theme = "theme-handwerk";
        subtitle = lang === "de" ? "Handwerkliche & Technische Fachkraft" : "Craft & Technical Specialist";
        description = lang === "de" ? 
            "Praxisorientierte Problemlösungen, handwerkliches Geschick und absolute Verlässlichkeit. Ich packe an, wo es nötig ist, und lege großen Wert auf saubere und dauerhafte Ergebnisse." : 
            "Practical problem-solving, craftsmanship, and absolute reliability. I get hands-on where needed and place great value on clean and durable results.";
        avatarSrc = `/static/avatars/handwerk_${gender}.jpg`;
        contactInfoText = lang === "de" ? 
            "Daniel Rudnicki ist bereit für anspruchsvolle Aufgaben in der technischen Instandhaltung, Wartung und Reparatur." : 
            "Daniel Rudnicki is ready for challenging tasks in technical maintenance, assembly, and repair.";
    } else if (cat.includes("milit") || cat.includes("MIL_IT")) {
        theme = "theme-mil_it";
        subtitle = lang === "de" ? "Militärische IT & KRITIS-Absicherung" : "Military IT & Critical Infrastructure";
        description = lang === "de" ? 
            "Absolute Verschwiegenheit, höchste Sicherheitsstandards und tiefgehende Erfahrung im Aufbau gehärteter Systeme. Zuverlässiger Schutz verteidigungsrelevanter Infrastrukturen." : 
            "Absolute confidentiality, highest security standards, and deep experience in building hardened systems. Reliable protection of defense-critical infrastructures.";
        avatarSrc = `/static/avatars/mil_it_${gender}.jpg`;
        contactInfoText = lang === "de" ? 
            "Daniel Rudnicki ist bereit für anspruchsvolle Aufgaben in der KRITIS-Absicherung und militärischen IT." : 
            "Daniel Rudnicki is ready for challenging tasks in critical infrastructure protection and military IT.";
    }

    // Apply Theme
    document.body.className = theme;
    
    // Apply Static Texts
    if (document.getElementById("nav-about")) document.getElementById("nav-about").innerText = t.nav_about;
    if (document.getElementById("nav-skills")) document.getElementById("nav-skills").innerText = t.nav_skills;
    if (document.getElementById("nav-exp")) document.getElementById("nav-exp").innerText = t.nav_exp;
    if (document.getElementById("nav-contact")) document.getElementById("nav-contact").innerText = t.nav_contact;
    if (document.getElementById("cta-req")) document.getElementById("cta-req").innerText = t.cta_req;
    
    // Dynamic Logo Update
    const navLogo = document.getElementById("nav-logo");
    if (navLogo) {
        if (c && c.trim() !== "") {
            navLogo.innerHTML = `<span class="logo-accent"><i class="fa-solid fa-building"></i></span> ${c}`;
        } else {
            navLogo.innerHTML = `<span class="logo-accent"><i class="fa-solid fa-briefcase"></i></span> ${subtitle}`;
        }
    }
    if (document.getElementById("hello-text")) document.getElementById("hello-text").innerText = t.hello;
    if (document.getElementById("proj-btn")) document.getElementById("proj-btn").innerText = t.proj_btn;
    if (document.getElementById("cont-btn")) document.getElementById("cont-btn").innerText = t.cont_btn;
    if (document.getElementById("stat-exp")) document.getElementById("stat-exp").innerText = t.stat_exp;
    if (document.getElementById("stat-proj")) document.getElementById("stat-proj").innerText = t.stat_proj;
    if (document.getElementById("stat-cli")) document.getElementById("stat-cli").innerText = t.stat_cli;
    
    // Apply Dynamic Texts
    if (document.getElementById("dynamic-subtitle")) document.getElementById("dynamic-subtitle").innerText = subtitle;
    if (document.getElementById("dynamic-description")) document.getElementById("dynamic-description").innerText = description;
    
    // Set Avatar Image
    if (document.getElementById("hero-avatar")) document.getElementById("hero-avatar").src = avatarSrc;

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
        if (pBox) pBox.style.display = "none";
    }

    // Dynamic Section Content (Skills & Experience)
    if (typeof contentData !== "undefined") {
        const cData = contentData[theme] && contentData[theme][lang] ? contentData[theme][lang] : contentData["theme-it"]["de"];
        if (cData) {
            if (document.getElementById("skills-main-title")) document.getElementById("skills-main-title").innerText = cData.skillsTitle;
            if (document.getElementById("skills-main-desc")) document.getElementById("skills-main-desc").innerText = cData.skillsDesc;
            
            if (document.getElementById("skill-1-icon")) document.getElementById("skill-1-icon").innerHTML = cData.skill1Icon;
            if (document.getElementById("skill-1-title")) document.getElementById("skill-1-title").innerText = cData.skill1Title;
            if (document.getElementById("skill-1-desc")) document.getElementById("skill-1-desc").innerText = cData.skill1Desc;
            if (document.getElementById("skill-1-tags")) document.getElementById("skill-1-tags").innerHTML = cData.skill1Tags;
            
            if (document.getElementById("skill-2-icon")) document.getElementById("skill-2-icon").innerHTML = cData.skill2Icon;
            if (document.getElementById("skill-2-title")) document.getElementById("skill-2-title").innerText = cData.skill2Title;
            if (document.getElementById("skill-2-desc")) document.getElementById("skill-2-desc").innerText = cData.skill2Desc;
            if (document.getElementById("skill-2-tags")) document.getElementById("skill-2-tags").innerHTML = cData.skill2Tags;
            
            if (document.getElementById("skill-3-icon")) document.getElementById("skill-3-icon").innerHTML = cData.skill3Icon;
            if (document.getElementById("skill-3-title")) document.getElementById("skill-3-title").innerText = cData.skill3Title;
            if (document.getElementById("skill-3-desc")) document.getElementById("skill-3-desc").innerText = cData.skill3Desc;
            if (document.getElementById("skill-3-tags")) document.getElementById("skill-3-tags").innerHTML = cData.skill3Tags;
            
            if (document.getElementById("skill-4-icon")) document.getElementById("skill-4-icon").innerHTML = cData.skill4Icon;
            if (document.getElementById("skill-4-title")) document.getElementById("skill-4-title").innerText = cData.skill4Title;
            if (document.getElementById("skill-4-desc")) document.getElementById("skill-4-desc").innerText = cData.skill4Desc;
            if (document.getElementById("skill-4-tags")) document.getElementById("skill-4-tags").innerHTML = cData.skill4Tags;
            
            if (document.getElementById("exp-main-title")) document.getElementById("exp-main-title").innerText = cData.expTitle;
            if (document.getElementById("exp-main-desc")) document.getElementById("exp-main-desc").innerText = cData.expDesc;
            
            if (document.getElementById("exp-1-title")) document.getElementById("exp-1-title").innerText = cData.exp1Title;
            if (document.getElementById("exp-1-comp")) document.getElementById("exp-1-comp").innerText = cData.exp1Comp;
            if (document.getElementById("exp-1-desc")) document.getElementById("exp-1-desc").innerText = cData.exp1Desc;
            
            if (document.getElementById("exp-2-title")) document.getElementById("exp-2-title").innerText = cData.exp2Title;
            if (document.getElementById("exp-2-comp")) document.getElementById("exp-2-comp").innerText = cData.exp2Comp;
            if (document.getElementById("exp-2-desc")) document.getElementById("exp-2-desc").innerText = cData.exp2Desc;
            
            if (document.getElementById("exp-3-title")) document.getElementById("exp-3-title").innerText = cData.exp3Title;
            if (document.getElementById("exp-3-comp")) document.getElementById("exp-3-comp").innerText = cData.exp3Comp;
            if (document.getElementById("exp-3-desc")) document.getElementById("exp-3-desc").innerText = cData.exp3Desc;
        }
    }

    // Apply Contact and Footer Translations
    if (document.getElementById("contact-tag")) document.getElementById("contact-tag").innerText = t.contact_tag;
    if (document.getElementById("contact-title")) document.getElementById("contact-title").innerText = t.contact_title;
    if (document.getElementById("contact-desc")) document.getElementById("contact-desc").innerText = t.contact_desc;
    if (document.getElementById("contact-info-title")) document.getElementById("contact-info-title").innerText = t.contact_info_title;
    if (document.getElementById("contact-info-text")) document.getElementById("contact-info-text").innerText = contactInfoText;
    if (document.getElementById("req-docs-title")) document.getElementById("req-docs-title").innerText = t.req_docs_title;
    if (document.getElementById("req-docs-desc")) document.getElementById("req-docs-desc").innerText = t.req_docs_desc;
    if (document.getElementById("req-docs-btn-text")) document.getElementById("req-docs-btn-text").innerText = t.req_docs_btn;

    // Form inputs and placeholders
    if (document.getElementById("label-name")) document.getElementById("label-name").innerText = t.label_name;
    if (document.getElementById("name")) document.getElementById("name").placeholder = t.placeholder_name;
    if (document.getElementById("label-email")) document.getElementById("label-email").innerText = t.label_email;
    if (document.getElementById("email")) document.getElementById("email").placeholder = t.placeholder_email;
    if (document.getElementById("label-subject")) document.getElementById("label-subject").innerText = t.label_subject;
    if (document.getElementById("subject")) document.getElementById("subject").placeholder = t.placeholder_subject;
    if (document.getElementById("label-message")) document.getElementById("label-message").innerText = t.label_message;
    if (document.getElementById("message")) document.getElementById("message").placeholder = t.placeholder_message;
    if (document.getElementById("submit-btn-text")) document.getElementById("submit-btn-text").innerText = t.submit_btn_text;

    // Footer Rights
    const footerText = document.getElementById("footer-text");
    if (footerText) {
        const impressumLink = `<a href="/impressum.html">Impressum</a>`;
        const datenschutzLink = `<a href="/datenschutz.html">Datenschutz</a>`;
        footerText.innerHTML = lang === "de" ?
            `&copy; 2026 Daniel Rudnicki. Alle Rechte vorbehalten. | ${impressumLink} | ${datenschutzLink}` :
            `&copy; 2026 Daniel Rudnicki. All rights reserved. | ${impressumLink} | ${datenschutzLink}`;
    }

    // Secure Email / Mailto functionality
    const user = "daniel.rudnicki";
    const domain = "gmx.de";
    const mail = user + "@" + domain;
    
    const emailContainer = document.getElementById("secure-email-container");
    if (emailContainer) {
        emailContainer.innerHTML = `<a href="mailto:${mail}" class="nav-link" style="padding: 0;">${mail}</a>`;
    }

    const requestDocsBtn = document.getElementById("request-docs-btn");
    if (requestDocsBtn) {
        requestDocsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const subject = encodeURIComponent(lang === "de" ? "Bewerbungsunterlagen anfordern" : "Request Application Documents");
            const body = encodeURIComponent(lang === "de" ? 
                "Sehr geehrter Herr Rudnicki,\n\nbitte senden Sie mir Ihre vollständigen Bewerbungsunterlagen (Lebenslauf und Zeugnisse) als PDF zu.\n\nMit freundlichen Grüßen\n" :
                "Dear Mr. Rudnicki,\n\nplease send me your complete application documents (resume and references) as PDF.\n\nBest regards,\n");
            window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
        });
    }

    // Serverless Functional Contact Form via client-side Mailto fallback
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const senderName = document.getElementById("name").value;
            const senderEmail = document.getElementById("email").value;
            const subjectVal = document.getElementById("subject").value || (lang === "de" ? "Kontaktanfrage Portfolio" : "Contact Request Portfolio");
            const msgVal = document.getElementById("message").value;
            
            const mailSubject = encodeURIComponent(subjectVal);
            const mailBody = encodeURIComponent(lang === "de" ?
                `Hallo Herr Rudnicki,\n\nSie haben eine Nachricht über Ihr Online-Portfolio erhalten.\n\nName: ${senderName}\nE-Mail: ${senderEmail}\n\nNachricht:\n${msgVal}\n` :
                `Hello Mr. Rudnicki,\n\nyou received a message via your online portfolio.\n\nName: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${msgVal}\n`
            );
            
            window.location.href = `mailto:${mail}?subject=${mailSubject}&body=${mailBody}`;
        });
    }
    
    // Propagate URL parameters to internal links (Impressum, Datenschutz)
    document.querySelectorAll('a').forEach(a => {
        if (a.href.includes('impressum') || a.href.includes('datenschutz')) {
            let url = new URL(a.href, window.location.href);
            for (let [key, value] of params.entries()) {
                url.searchParams.set(key, value);
            }
            a.href = url.href;
        }
    });
});
