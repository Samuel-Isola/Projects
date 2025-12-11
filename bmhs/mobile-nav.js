// mobile-nav.js - Enhanced mobile navigation and animations
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.getElementById('mainHeader');
    const nav = header.querySelector('nav');
    
    // Insert toggle button
    header.appendChild(menuToggle);
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Scroll animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                revealOnScroll();
            }, 100);
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    nav.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Form validation animation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                    
                    // Shake animation for error
                    input.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
    // Add animation classes on load
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Add animations to hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const h1 = heroContent.querySelector('h1');
            const p = heroContent.querySelector('p');
            const button = heroContent.querySelector('.cta-button');
            
            if (h1) h1.classList.add('animate-fade-in-up');
            if (p) {
                p.classList.add('animate-fade-in-up');
                p.style.animationDelay = '0.2s';
            }
            if (button) {
                button.classList.add('animate-fade-in-up');
                button.style.animationDelay = '0.4s';
            }
        }
    }, 100);
});