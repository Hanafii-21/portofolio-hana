// === THEME TOGGLE ===
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIconSun = document.getElementById('theme-icon-sun');
const themeIconMoon = document.getElementById('theme-icon-moon');

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
}
updateThemeIcon();

// Update icon sesuai mode
function updateThemeIcon() {
    const darkMode = htmlElement.classList.contains('dark');
    themeIconSun.classList.toggle('hidden', !darkMode);
    themeIconMoon.classList.toggle('hidden', darkMode);
}

// On click: toggle dark mode
themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    localStorage.setItem('theme',
        htmlElement.classList.contains('dark') ? 'dark' : 'light'
    );
    updateThemeIcon();
});


// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Projects Data
const projects = [
    {
        title: 'IOT SMART PLUG IN',
        description: 'Stop Kontak Pintar yang dapat dikontrol menggunakan HP .',
        tech: [ 'Esp8266', 'Arduino'],
        image: 'img/stopkontak.jpg'
    },
    {
        title: 'Website Toko Sayur',
        description: 'Website toko sayur',
        tech: ['HTML', 'CSS', 'JavaScript'],
        image: 'img/web.png'
    },
   
];

// Load Projects Dynamically
const projectsGrid = document.getElementById('projects-grid');

function loadProjects() {
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg';
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${project.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2">
                    ${project.tech.map(tech => `
                        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Load projects when page loads
loadProjects();

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    formMessage.classList.remove('hidden');
    formMessage.className = 'mt-4 text-center p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg';
    formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});