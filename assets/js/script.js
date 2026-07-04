/*--------------- NAVIGATION BAR FUNCTION -----------*/
function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");

    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
    } else {
        menuBtn.className = "nav-menu";
    }
}

/*--------------- Add shadow on navigation bar while scrolling----------*/
window.onscroll = function () { headerShadow() };

function headerShadow() {
    const navHeader = document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
        navHeader.style.height = "70px";
        navHeader.style.lineHeight = "70px";

    } else {

        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.lineHeight = "90px";

    }
}

/*--------------- RESPECT REDUCED MOTION PREFERENCE----------*/
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/*--------------- TYPING EFFECT----------*/
if (prefersReducedMotion) {
    const typedTextEl = document.getElementById('typedText');
    if (typedTextEl) typedTextEl.textContent = 'Cybersecurity Enthusiast';
} else {
    var typingEffect = new Typed(".typedText", {
        strings: [
            "Cybersecurity Enthusiast",
            "Secure App Developer",
            "AI & Cloud Security Learner",
            "Founder of CyberNurdin"
        ],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 2000,
    })
}

/*--------------- SCROLL REVEAL----------*/
const srOptions = prefersReducedMotion
    ? { distance: '0px', duration: 1, delay: 0, reset: false }
    : { origin: 'top', distance: '80px', duration: 2000, reset: true };

const sr = ScrollReveal(srOptions)

/*--------------- HOME----------*/
sr.reveal('.featured-text-card', {})
sr.reveal('.featured-name', { delay: 100 })
sr.reveal('.featured-text-info', { delay: 200 })
sr.reveal('.featured-text-btn', { delay: 200 })
sr.reveal('.featured-image', { delay: 300 })

/*--------------- HEADINGS---------*/
sr.reveal('.top-header', {})

/*--------------- CERTIFICATION BOX----------*/
sr.reveal('.cert-card', { interval: 200 })


/*--------------- --##--- scroll reveal left-right animation ---##-- --------*/

/*--------------- About info & contact info--------*/

const srLeftOptions = prefersReducedMotion
    ? { distance: '0px', duration: 1, delay: 0, reset: false }
    : { origin: 'left', distance: '80px', duration: 2000, reset: true };

const srLeft = ScrollReveal(srLeftOptions)
srLeft.reveal('.about-text', { delay: 100 })
srLeft.reveal('.about-texts', { delay: 200 })
sr.reveal('.about_details', { delay: 100 })

/*--------------- About skills & form box-------*/
sr.reveal('.form-control', { delay: 100 })

/*--------------- CHANGE ACTIVE LINK-------*/
const sections = document.querySelectorAll('section[id]')
function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 100,
            sectionId = current.getAttribute('id');

        const navLink = document.querySelector('.nav-menu a[href*="#' + sectionId + '"]');
        if (!navLink) return;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLink.classList.add('active-link')
        } else {
            navLink.classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)


/*--------------- EXPERTISE TABS----------*/
document.addEventListener('DOMContentLoaded', () => {
    const serviceItems = document.querySelectorAll('.service_item');
    const contentArea = document.querySelector('.services_right');
    if (!contentArea) return;

    const contentTitle = contentArea.querySelector('.content-title');
    const contentDescriptionContainer = contentArea.querySelector('.description');
    const demoButton = contentArea.querySelector('.demo-btns');

    function updateContent(service) {
        contentArea.classList.add('fade-out');

        setTimeout(() => {
            if (contentTitle) {
                contentTitle.textContent = service.name;
            }

            if (contentDescriptionContainer) {
                contentDescriptionContainer.innerHTML = '';

                const paragraphs = service.description.split(/\s*\n\s*\n\s*/).filter(p => p.trim() !== '');
                const paragraphsToShow = paragraphs.slice(0, 4);

                paragraphsToShow.forEach(text => {
                    const p = document.createElement('p');
                    p.textContent = text.trim();
                    contentDescriptionContainer.appendChild(p);
                });
            }

            if (demoButton) {
                demoButton.href = service.demoLink;
            }

            contentArea.classList.remove('fade-out');
        }, 300);
    }

    function selectCategory(id) {
        serviceItems.forEach(item => {
            item.classList.remove('active');
        });

        const selectedItem = document.querySelector(`.service_item[data-id="${id}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        const selectedService = expertiseData.find(service => service.id === id);

        if (selectedService) {
            updateContent(selectedService);
            srLeft.reveal('.description', { delay: 100 })
        }
    }

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            selectCategory(item.dataset.id);
        });
    });

    const initialActiveItem = document.querySelector('.service_item.active');
    if (initialActiveItem) {
        selectCategory(initialActiveItem.dataset.id);
    } else if (expertiseData.length > 0) {
        selectCategory(expertiseData[0].id);
    }
});


/*--------------- PROJECTS SECTION----------*/
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
const viewAllProjectsBtn = document.getElementById('viewAllProjectsBtn');

let currentFilter = 'all';
let projectsShownCount = 0;

function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.setAttribute('data-type', project.type);

    const techTags = (project.tech || [])
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');

    const buttons = [];
    if (project.demoLink) {
        buttons.push(`<a href="${project.demoLink}" class="project-button demo" target="_blank" rel="noopener">Demo</a>`);
    }
    if (project.githubLink) {
        buttons.push(`<a href="${project.githubLink}" class="project-button github" target="_blank" rel="noopener">GitHub</a>`);
    }

    projectCard.innerHTML = `
        <div class="project-card-icon-header">
            <i class="${project.icon || 'uil uil-apps'}"></i>
        </div>
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
            ${buttons.length ? `<div class="project-buttons">${buttons.join('')}</div>` : ''}
        </div>
    `;
    return projectCard;
}

function renderProjects(filterType, limit = Infinity, animateNew = false) {
    if (!projectsGrid) return;

    if (projectsGrid.innerHTML !== '' && !animateNew) {
        projectsGrid.innerHTML = '';
    }

    const filteredProjects = filterType === 'all'
        ? projectsData
        : projectsData.filter(project => project.type === filterType);

    const projectsToRender = filteredProjects.slice(0, limit);

    if (projectsToRender.length === 0) {
        projectsGrid.innerHTML = '<p class="projects-empty">More projects in this category are on the way.</p>';
        projectsShownCount = 0;
        if (viewAllProjectsBtn) {
            viewAllProjectsBtn.style.display = 'none';
            viewAllProjectsBtn.disabled = true;
        }
        return;
    }

    const existingProjectIds = Array.from(projectsGrid.children).map(card => parseInt(card.id));
    const newProjects = projectsToRender.filter(project => !existingProjectIds.includes(project.id));

    newProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.id = `project-${project.id}`;

        if (animateNew) {
            if (index % 2 === 0) {
                projectCard.classList.add('hidden-left');
            } else {
                projectCard.classList.add('hidden-right');
            }
        }
        projectsGrid.appendChild(projectCard);

        if (animateNew) {
            setTimeout(() => {
                projectCard.classList.remove('hidden-left', 'hidden-right');
                projectCard.classList.add('visible-animated');
            }, 50 * index);
        }
    });

    projectsShownCount = projectsToRender.length;

    if (viewAllProjectsBtn) {
        if (filterType === 'all' && projectsShownCount < projectsData.length) {
            viewAllProjectsBtn.style.display = 'block';
            viewAllProjectsBtn.disabled = false;
        } else {
            viewAllProjectsBtn.style.display = 'none';
            viewAllProjectsBtn.disabled = true;
        }
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        currentFilter = button.getAttribute('data-filter');
        if (projectsGrid) projectsGrid.innerHTML = '';

        if (currentFilter === 'all') {
            renderProjects(currentFilter, 6);
        } else {
            renderProjects(currentFilter, Infinity);
        }
    });
});

if (viewAllProjectsBtn) {
    viewAllProjectsBtn.addEventListener('click', () => {
        renderProjects(currentFilter, Infinity, true);
        viewAllProjectsBtn.style.display = 'none';
        viewAllProjectsBtn.disabled = true;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
});


/*--------------- CERTIFICATIONS SECTION----------*/
const certificatesGrid = document.querySelector('.certification-container');
const certFilterButtons = document.querySelectorAll('.filter-btn[data-cert-filter]');

function createCertCard(cert) {
    const card = document.createElement('div');
    card.classList.add('cert-card');
    card.setAttribute('data-category', cert.category);

    const statusLabels = {
        completed: 'Verified',
        'in-progress': 'In Progress',
        planned: 'Planned / To Upload'
    };
    const statusLabel = statusLabels[cert.status] || statusLabels.planned;
    const statusClass = `cert-status-${cert.status || 'planned'}`;

    const media = cert.image
        ? `<img src="${cert.image}" alt="${cert.title} certificate" class="cert-image" loading="lazy">`
        : `<i class="uil uil-award cert-icon"></i>`;

    card.innerHTML = `
        <span class="cert-status ${statusClass}">${statusLabel}</span>
        ${media}
        <h3>${cert.title}</h3>
        <p class="cert-issuer">${cert.issuer} &bull; ${cert.year}</p>
        ${cert.credentialUrl
            ? `<a href="${cert.credentialUrl}" class="view-cert-btn" target="_blank" rel="noopener">View Credential</a>`
            : `<p class="cert-pending-note">Certificate will be uploaded soon</p>`}
    `;
    return card;
}

function renderCertificates(filter = 'all') {
    if (!certificatesGrid) return;

    certificatesGrid.innerHTML = '';
    const filtered = filter === 'all'
        ? certificatesData
        : certificatesData.filter(cert => cert.category === filter);

    if (filtered.length === 0) {
        certificatesGrid.innerHTML = '<p class="cert-empty">More certifications in this category are coming soon.</p>';
        return;
    }

    filtered.forEach(cert => certificatesGrid.appendChild(createCertCard(cert)));
}

certFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        certFilterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderCertificates(button.getAttribute('data-cert-filter'));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderCertificates('all');
});


/*
Legacy mail app fallback kept inactive; Supabase handler below sends messages.
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('user_name').value.trim();
        const email = document.getElementById('user_email').value.trim();
        const message = document.getElementById('message').value.trim();

        const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

        window.location.href = '#';
    });
});

*/

/*--------------- CONTACT FORM (Resend email endpoint)----------*/
const CONTACT_ENDPOINT = 'api/contact.php';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const statusEl = document.getElementById('contactStatus');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    function setFormStatus(message, type = '') {
        if (!statusEl) return;
        statusEl.textContent = message;
        statusEl.className = `form-status ${type}`.trim();
    }

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const name = document.getElementById('user_name').value.trim();
        const email = document.getElementById('user_email').value.trim();
        const message = document.getElementById('message').value.trim();
        const company = document.getElementById('company')?.value.trim();

        if (company) {
            contactForm.reset();
            setFormStatus('Thank you. Your message has been sent.', 'success');
            return;
        }

        if (!name || !email || !message) {
            setFormStatus('Please complete all fields before sending.', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        const payload = {
            name,
            email,
            message,
            company,
            source_url: window.location.href,
            user_agent: navigator.userAgent
        };

        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending <i class="uil uil-message"></i>';
            }
            setFormStatus('Sending your message...', 'loading');

            const response = await fetch(CONTACT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok || result.ok === false) {
                throw new Error(result.message || 'Could not send message');
            }

            contactForm.reset();
            setFormStatus('Thank you. Your message has been sent.', 'success');
        } catch (error) {
            console.error('Contact form submission failed:', error);
            setFormStatus('The form could not send right now. Please use WhatsApp or email me directly.', 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send <i class="uil uil-message"></i>';
            }
        }
    }, true);
});
