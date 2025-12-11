// script.js - Shared JavaScript for all pages

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const heroHeight = hero.offsetHeight;
        
        if (window.scrollY > heroHeight * 0.7) {
            header.classList.remove('transparent');
            header.classList.add('scrolled');
        } else {
            header.classList.add('transparent');
            header.classList.remove('scrolled');
        }
    }
});

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});