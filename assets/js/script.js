/*--------------- NAVIGATION BAR FUNCTION -----------*/
function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");

    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
    } else {
        menuBtn.className = "nav-menu";
    }
}

/*--------------- Add shodow on navigatoion bar while scrolling----------*/
window.onscroll = function () { headerShadow() };

function headerShadow() {
    const navHeader = document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, o.1)";
        navHeader.style.height = "70px";
        navHeader.style.lineHeight = "70px";

    } else {

        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.lineHeight = "90px";

    }
}

/*--------------- TYPING EFFECTS----------*/

var typingEffect = new Typed(".typedText", {
    strings: ["Cybersecurity Specialist", "Backend Developer", "Designer", "Youtuber", "TikToker"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
})

/*--------------- TYPING EFFECTS----------*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true,
})

/*--------------- HOME----------*/
sr.reveal('.featured-text-card', {})
sr.reveal('.featured_name', { delay: 100 })
sr.reveal('.featured-text-info', { delay: 200 })
sr.reveal('.featured-text-btn', { delay: 200 })
sr.reveal('.social_icons', { delay: 200 })
sr.reveal('.featured-image', { delay: 300 })




/*--------------- PROJECT BOX----------*/
sr.reveal('.prroject-box', { interval: 200 })


/*--------------- HEADINGS---------*/
sr.reveal('.top-header', {})

/*--------------- CERTIFICATION BOX----------*/
sr.reveal('.cert-card', { interval: 200 })


/*--------------- --##--- scroll reveal left-right animation ---##-- --------*/

/*--------------- About info & contact info--------*/

const srLeft = ScrollReveal({
    origin: 'left',
    distance: '80px',
    duration: 2000,
    reset: true,
})
srLeft.reveal('.about-text', { delay: 100 })
srLeft.reveal('.about-texts', { delay: 200 })
srLeft.reveal('.about-card', { delay: 100 })
sr.reveal('.about_details', { delay: 100 })

/*--------------- About skills & form box-------*/
const srRight = ScrollReveal({
    origin: 'right',
    distance: '80px',
    duration: 2000,
    reset: true,
})

srLeft.reveal('.about-card', { delay: 100 })
sr.reveal('.form-control', { delay: 100 })

/*--------------- CHANGE ACTIVE LINK-------*/
const sections = document.querySelectorAll('section[id]')
function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offTop - 50,
            sectionid = current.getAttribute('id');



        if (scrollY = sectionTop && scrollY <= sectionTop + sectionHeight) {


            document.querySelector('.nav-menu a[href*=' + sectionid + ']').classList.add('active-link')


        } else {

            document.querySelector('.nav-menu a[href*=' + sectionid + ']').classList.remove('active-link')


        }
    })
}




document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded: Script started.');
    console.log('servicesData (from data.js):', servicesData);

    const serviceItems = document.querySelectorAll('.service_item');
    const contentArea = document.querySelector('.services_right');

    const contentTitle = contentArea.querySelector('.content-title');
    // Now selecting the DIV container for description paragraphs
    const contentDescriptionContainer = contentArea.querySelector('.description');
    const demoButton = contentArea.querySelector('.btns-s');

    // --- IMPORTANT DEBUGGING CHECK (Added checks for new container) ---
    if (!contentTitle) console.error("Error: 'content-title-dynamic' element not found in services_right.");
    if (!contentDescriptionContainer) console.error("Error: 'content-description-dynamic' container not found in services_right.");
    if (!demoButton) console.error("Error: 'btns-s' (or check-demo-btn-dynamic) element not found in services_right.");
    // --- END DEBUGGING CHECK ---


    /**
     * Updates the content of the right panel based on the selected service.
     * Specifically, it now splits the description into paragraphs.
     * @param {Object} service - The service data object from servicesData.
     */
    function updateContent(service) {
        contentArea.classList.add('fade-out');

        setTimeout(() => {
            if (contentTitle) {
                contentTitle.textContent = service.name;
            }

            // --- IMPORTANT CHANGE HERE: Handling multiple paragraphs ---
            if (contentDescriptionContainer) {
                contentDescriptionContainer.innerHTML = ''; // Clear existing paragraphs

                // Split the description by double newlines to get logical paragraphs
                let paragraphs = service.description.split(/\s*\n\s*\n\s*/).filter(p => p.trim() !== '');

                // Limit to the first 4 paragraphs as requested
                const paragraphsToShow = paragraphs.slice(0, 4);

                paragraphsToShow.forEach(text => {
                    const p = document.createElement('p');
                    p.textContent = text.trim(); // Trim extra whitespace from each paragraph
                    contentDescriptionContainer.appendChild(p);
                });
            }

            if (demoButton) {
                demoButton.href = service.demoLink;
            }

            contentArea.classList.remove('fade-out');
        }, 300);
    }

    /**
     * Handles the selection of a service category in the sidebar.
     * Updates the active state of sidebar items and refreshes the right content.
     * @param {string} id - The ID of the selected service.
     */
    function selectCategory(id) {
        console.log('selectCategory called with ID:', id);

        serviceItems.forEach(item => {
            item.classList.remove('active');
        });

        const selectedItem = document.querySelector(`.service_item[data-id="${id}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        const selectedService = servicesData.find(service => service.id === id);

        console.log('Found service:', selectedService);

        if (selectedService) {
            updateContent(selectedService);
            srLeft.reveal('.description', { delay: 100 })
        } else {
            console.error(`Error: Service with ID "${id}" not found in servicesData.`);
            if (contentTitle) contentTitle.textContent = 'Service Details Not Available';
            if (contentDescriptionContainer) contentDescriptionContainer.innerHTML = '<p>The details for this service could not be loaded. Please try again or select another service.</p>';
            if (demoButton) demoButton.href = '#';
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
    } else if (servicesData.length > 0) {
        selectCategory(servicesData[0].id);
    } else {
        console.warn('servicesData is empty. Cannot initialize services section.');
    }
});





// projects sections
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const viewAllProjectsBtn = document.getElementById('viewAllProjectsBtn');

let currentFilter = 'all'; // Keep track of the current active filter
let projectsShownCount = 0; // Keep track of how many projects are currently displayed

// Function to create a project card HTML element
function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.setAttribute('data-type', project.type);

    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/cccccc/333333?text=Image+Error';">
        <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-buttons">
                <a href="${project.demoLink}" class="project-button demo" target="_blank">Demo</a>
                <a href="${project.githubLink}" class="project-button github" target="_blank">GitHub</a>
            </div>
        </div>
    `;
    return projectCard;
}

// Function to render projects based on filter and limit
function renderProjects(filterType, limit = Infinity, animateNew = false) {
    // Clear existing projects only if a new filter is applied or if we are re-rendering
    if (projectsGrid.innerHTML !== '' && !animateNew) {
        projectsGrid.innerHTML = '';
    }

    const filteredProjects = filterType === 'all'
        ? projectsData
        : projectsData.filter(project => project.type === filterType);

    // Determine which projects to render
    const projectsToRender = filteredProjects.slice(0, limit);

    // If we are animating new projects, only add the ones that are not already there
    const existingProjectIds = Array.from(projectsGrid.children).map(card => parseInt(card.id));
    const newProjects = projectsToRender.filter(project => !existingProjectIds.includes(project.id));

    newProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.id = `project-${project.id}`; // Assign an ID for easier manipulation

        // Add animation classes for projects beyond the initial 6
        if (animateNew) {
            if (index % 2 === 0) { // Even index, slide from left
                projectCard.classList.add('hidden-left');
            } else { // Odd index, slide from right
                projectCard.classList.add('hidden-right');
            }
        }
        projectsGrid.appendChild(projectCard);

        // Trigger animation after a slight delay
        if (animateNew) {
            setTimeout(() => {
                projectCard.classList.remove('hidden-left', 'hidden-right');
                projectCard.classList.add('visible-animated');
            }, 50 * index); // Staggered animation
        }
    });

    projectsShownCount = projectsToRender.length;

    // Show/hide "View All Projects" button
    if (filterType === 'all' && projectsShownCount < projectsData.length) {
        viewAllProjectsBtn.style.display = 'block';
        viewAllProjectsBtn.disabled = false;
    } else {
        viewAllProjectsBtn.style.display = 'none';
        viewAllProjectsBtn.disabled = true;
    }
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');

        currentFilter = button.getAttribute('data-filter');
        projectsGrid.innerHTML = ''; // Clear grid before re-rendering
        // If 'all' is clicked, show initial 6 projects, otherwise show all filtered projects
        if (currentFilter === 'all') {
            renderProjects(currentFilter, 6);
        } else {
            renderProjects(currentFilter, Infinity); // Show all filtered projects
        }
    });
});

// Event listener for "View All Projects" button
viewAllProjectsBtn.addEventListener('click', () => {
    // Render all projects of the current filter type, animating the new ones
    renderProjects(currentFilter, Infinity, true);
    viewAllProjectsBtn.style.display = 'none'; // Hide button after showing all
    viewAllProjectsBtn.disabled = true;
});

// Initial render: show only the first 6 projects of type 'all'
document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
});








// ----------------------------Gallery 

const carouselTrack = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-nav.prev');
const nextBtn = document.querySelector('.carousel-nav.next');
const paginationContainer = document.querySelector('.carousel-pagination');

let currentIndex = 0;
let slideWidth = 0; // Will be calculated dynamically
let autoPlayInterval; // For autoplay functionality

// Function to create a single carousel slide
function createSlide(item) {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    slide.innerHTML = `
        <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null;this.src='https://placehold.co/800x450/cccccc/333333?text=Image+Not+Found';">
        <div class="slide-content">
            <h3 class="slide-title">${item.title}</h3>
            <p class="slide-description">${item.description}</p>
        </div>
    `;
    return slide;
}

// Function to create pagination dots
function createPaginationDot(index) {
    const dot = document.createElement('span');
    dot.classList.add('pagination-dot');
    dot.dataset.index = index; // Store index for navigation
    dot.addEventListener('click', () => goToSlide(index));
    return dot;
}

// Function to update the carousel position
function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Update active pagination dot
    document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Function to go to a specific slide
function goToSlide(index) {
    if (index < 0) {
        currentIndex = galleryItems.length - 1; // Loop to last slide
    } else if (index >= galleryItems.length) {
        currentIndex = 0; // Loop to first slide
    } else {
        currentIndex = index;
    }
    updateCarousel();
    resetAutoplay(); // Reset autoplay timer on manual navigation
}

// Navigation functions
function showNextSlide() {
    goToSlide(currentIndex + 1);
}

function showPrevSlide() {
    goToSlide(currentIndex - 1);
}

// Autoplay functionality (optional)
function startAutoplay() {
    autoPlayInterval = setInterval(showNextSlide, 5000); // Change slide every 5 seconds
}

function resetAutoplay() {
    clearInterval(autoPlayInterval);
    startAutoplay();
}

// --- Event Listeners ---
prevBtn.addEventListener('click', showPrevSlide);
nextBtn.addEventListener('click', showNextSlide);

// Recalculate slide width on window resize
window.addEventListener('resize', () => {
    // Only recalculate if carouselTrack has children
    if (carouselTrack.children.length > 0) {
        slideWidth = carouselTrack.children[0].offsetWidth;
        updateCarousel(); // Adjust position to maintain current slide visibility
    }
});

// --- Touch/Swipe functionality ---
let touchStartX = 0;
let touchEndX = 0;

carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    carouselTrack.style.transition = 'none'; // Disable transition for immediate feedback
    clearInterval(autoPlayInterval); // Pause autoplay during touch
});

carouselTrack.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
    const currentTranslation = -currentIndex * slideWidth;
    const dragDistance = touchEndX - touchStartX;
    carouselTrack.style.transform = `translateX(${currentTranslation + dragDistance}px)`;
});

carouselTrack.addEventListener('touchend', () => {
    carouselTrack.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
    const touchThreshold = slideWidth / 4; // Swipe distance threshold (e.g., 25% of slide width)

    if (touchEndX < touchStartX - touchThreshold) {
        showNextSlide(); // Swipe left, go to next
    } else if (touchEndX > touchStartX + touchThreshold) {
        showPrevSlide(); // Swipe right, go to previous
    } else {
        updateCarousel(); // Snap back to current slide if not enough swipe
    }
    startAutoplay(); // cv autoplay after touch interaction
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Populate carousel with slides and pagination dots
    galleryItems.forEach((item, index) => {
        carouselTrack.appendChild(createSlide(item));
        paginationContainer.appendChild(createPaginationDot(index));
    });

    // Calculate initial slide width after slides are in DOM
    if (carouselTrack.children.length > 0) {
        slideWidth = carouselTrack.children[0].offsetWidth;
    }

    // Set initial active dot and carousel position
    updateCarousel();

    // Start autoplay (if desired)
    startAutoplay();
});

window.addEventListener('scroll', scrollActive)