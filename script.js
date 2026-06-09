// ==========================================================================
// DYNAMIC PORTFOLIO PERSONALIZATION ENGINE
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Read Query Parameters
    const params = new URLSearchParams(window.location.search);
    const companyParam = params.get("c");      // Company name (e.g., "BBC Chartering", "Tec Networks")
    const recruiterParam = params.get("ref");  // Recruiter name (e.g., "Nicole Nellen", "Liam Luca Rothe")
    const jobParam = params.get("job");        // Job title (e.g., "IT Support Engineer", "IT Cloud Engineer")

    // UI Elements
    const dynamicBadge = document.getElementById("dynamic-badge");
    const dynamicBadgeText = document.getElementById("dynamic-badge-text");
    const personalizationBox = document.getElementById("personalization-box");
    const personalizationText = document.getElementById("personalization-text");
    const heroSubtitle = document.getElementById("dynamic-subtitle");

    let matchedCategory = "";

    // 2. Personalize Header and Greeting
    if (companyParam || recruiterParam || jobParam) {
        // Show personalization badge
        dynamicBadge.style.display = "flex";
        personalizationBox.style.display = "block";

        let greetingMessage = "Herzlich willkommen auf meinem IT-Portfolio! ";
        
        // Handle recruiter personal greeting
        if (recruiterParam) {
            const cleanRecruiter = decodeURIComponent(recruiterParam);
            // Check if salutation is needed
            let salutation = "Hallo";
            if (cleanRecruiter.toLowerCase().startsWith("frau ") || cleanRecruiter.toLowerCase().startsWith("herr ")) {
                salutation = "Sehr geehrte(r)";
            } else {
                // Infer salutation if common names or genders are known, otherwise general
                salutation = "Sehr geehrte(r) " + cleanRecruiter;
            }
            
            greetingMessage = `**${cleanRecruiter}**, herzlich willkommen auf meinem IT-Portfolio! Ich freue mich sehr über Ihre Sichtung meiner Bewerbungsunterlagen. `;
            dynamicBadgeText.textContent = "Direkt-Bewerbung";
        } else {
            dynamicBadgeText.textContent = "Personalisiertes Profil";
        }

        // Handle company customization
        if (companyParam) {
            const cleanCompany = decodeURIComponent(companyParam);
            greetingMessage += `Speziell für das Team von **${cleanCompany}** habe ich meine relevantesten Projekte und Systemkonfigurationen hervorgehoben.`;
            
            // Determine tech matching category based on company name (for highlighting)
            const compLower = cleanCompany.toLowerCase();
            if (compLower.includes("tec") || compLower.includes("security") || compLower.includes("firewall") || compLower.includes("network") || compLower.includes("vpn") || compLower.includes("openbsd")) {
                matchedCategory = "network";
            } else if (compLower.includes("chartering") || compLower.includes("briese") || compLower.includes("quality") || compLower.includes("gmbh")) {
                matchedCategory = "linux";
            } else if (compLower.includes("nordfrost") || compLower.includes("system") || compLower.includes("klinik")) {
                matchedCategory = "privacy";
            } else if (compLower.includes("roboter") || compLower.includes("atlantec") || compLower.includes("automobil")) {
                matchedCategory = "automation";
            }
        }

        // Handle job role customization
        if (jobParam) {
            const cleanJob = decodeURIComponent(jobParam);
            heroSubtitle.textContent = cleanJob;
            greetingMessage += ` Passend zu der ausgeschriebenen Position als **${cleanJob}** finden Sie unten meine entsprechenden Projektnachweise.`;
            
            const jobLower = cleanJob.toLowerCase();
            if (jobLower.includes("security") || jobLower.includes("network") || jobLower.includes("firewall") || jobLower.includes("vpn") || jobLower.includes("openbsd")) {
                matchedCategory = "network";
            } else if (jobLower.includes("qualität") || jobLower.includes("qa") || jobLower.includes("automation") || jobLower.includes("roboter")) {
                matchedCategory = "automation";
            } else if (jobLower.includes("privacy") || jobLower.includes("datenschutz") || jobLower.includes("proxmox") || jobLower.includes("docker")) {
                matchedCategory = "privacy";
            } else if (jobLower.includes("system") || jobLower.includes("linux") || jobLower.includes("admin")) {
                matchedCategory = "linux";
            }
        }

        // Insert formatted text
        personalizationText.innerHTML = greetingMessage.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    }

    // 3. Highlight Relevant Skills & Projects based on Match
    if (matchedCategory) {
        console.log(`Matching portfolio content to category: ${matchedCategory}`);
        
        // Highlight skill card
        const skillCards = document.querySelectorAll(".skill-category-card");
        skillCards.forEach(card => {
            const cat = card.getAttribute("data-tech-category");
            if (cat === matchedCategory) {
                card.classList.add("highlighted");
                // Bring to top visually if on mobile
                card.style.order = "-1";
            }
        });

        // Highlight project cards
        const projectCards = document.querySelectorAll(".project-card");
        projectCards.forEach(card => {
            const type = card.getAttribute("data-project-type");
            // Mapping project types to tech categories
            let isMatch = false;
            if (matchedCategory === "linux" && type === "security") isMatch = true;
            if (matchedCategory === "network" && type === "security") isMatch = true;
            if (matchedCategory === "privacy" && type === "privacy") isMatch = true;
            if (matchedCategory === "automation" && type === "automation") isMatch = true;

            if (isMatch) {
                card.classList.add("highlighted");
                card.style.order = "-1";
            }
        });
    }

    // 4. Portfolio Filter Bar Logic
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const type = card.getAttribute("data-project-type");
                if (filterValue === "all" || type === filterValue) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 5. Simulated Recruiter Web Analytics (Logging telemetry safely)
    const logVisitTelemetry = () => {
        const telemetry = {
            timestamp: new Date().toISOString(),
            company: companyParam || "Direktzugriff",
            recruiter: recruiterParam || "Anonym",
            job: jobParam || "Unspezifiziert",
            referrer: document.referrer || "Kein Referrer",
            screenResolution: `${window.screen.width}x${window.screen.height}`
        };

        // Simulated logging (would call a REST endpoint in production)
        console.log("📊 Telemetrie-Log an Bewerbungsmanagement-Server gesendet:", telemetry);
        
        // Save visit to local storage for dynamic return-visit welcome message
        localStorage.setItem("last_portfolio_visit", JSON.stringify(telemetry));
    };

    logVisitTelemetry();

    // 6. Application Document Request Button Handler
    const requestBtn = document.getElementById("request-docs-btn");
    if (requestBtn) {
        requestBtn.addEventListener("click", () => {
            requestBtn.innerHTML = "<i class='fa-solid fa-circle-notch fa-spin'></i> Anfrage wird gesendet...";
            requestBtn.disabled = true;
            
            setTimeout(() => {
                requestBtn.innerHTML = "<i class='fa-solid fa-circle-check'></i> Anfrage gesendet!";
                requestBtn.classList.remove("btn-primary");
                requestBtn.classList.add("btn-secondary");
                alert("Vielen Dank für Ihr Interesse! Die vollständigen Bewerbungsunterlagen (inkl. Zeugnisse und Lebenslauf) werden Ihnen in Kürze an die angegebene E-Mail-Adresse zugestellt.");
            }, 1500);
        });
    }

    // 7. Contact Form Handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector("button[type='submit']");
            submitBtn.innerHTML = "<i class='fa-solid fa-circle-notch fa-spin'></i> Wird übertragen...";
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = "<i class='fa-solid fa-circle-check'></i> Erfolgreich gesendet!";
                alert("Ihre Nachricht wurde erfolgreich an Daniel Rudnicki übermittelt. Sie erhalten in Kürze eine Rückmeldung.");
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = "<i class='fa-solid fa-paper-plane'></i> Nachricht senden";
            }, 1200);
        });
    }
});
