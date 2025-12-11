/**
 * Luxury Animations JavaScript
 * D.i.G Homes - Premium Real Estate
 */

class LuxuryAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoader();
        this.setupParticles();
        this.setupTypingAnimation();
        this.setupCounterAnimation();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupScrollToTop();
        this.setupNavigation();
        this.setupMobileMenu();
    }

    setupLoader() {
        const loader = document.querySelector('.luxury-loader');
        
        // Simulate loading progress
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress > 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Hide loader after delay
                    setTimeout(() => {
                        if (loader) {
                            loader.classList.add('hidden');
                        }
                        
                        // Trigger initial animations
                        this.triggerInitialAnimations();
                    }, 500);
                }
                progressFill.style.width = `${progress}%`;
            }, 100);
        }
    }

    setupParticles() {
        const container = document.querySelector('.particle-container');
        if (!container) return;

        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 20;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            container.appendChild(particle);
        }
    }

    setupTypingAnimation() {
        const typingElements = document.querySelectorAll('.typing-text');
        
        typingElements.forEach(element => {
            const words = element.dataset.words.split(',');
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let isPaused = false;
            
            const type = () => {
                if (isPaused) return;
                
                const currentWord = words[wordIndex];
                
                if (isDeleting) {
                    // Deleting characters
                    element.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                    
                    if (charIndex === 0) {
                        isDeleting = false;
                        wordIndex = (wordIndex + 1) % words.length;
                        isPaused = true;
                        
                        // Pause before typing next word
                        setTimeout(() => {
                            isPaused = false;
                        }, 1000);
                    }
                } else {
                    // Typing characters
                    element.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                    
                    if (charIndex === currentWord.length) {
                        isDeleting = true;
                        isPaused = true;
                        
                        // Pause before deleting
                        setTimeout(() => {
                            isPaused = false;
                        }, 2000);
                    }
                }
                
                // Type speed
                const typeSpeed = isDeleting ? 50 : 100;
                setTimeout(type, typeSpeed);
            };
            
            // Start typing animation
            setTimeout(type, 1000);
        });
    }

    setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-value[data-count], .counter[data-target]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.count || counter.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            // Start counter when in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        };
        
        counters.forEach(animateCounter);
    }

    setupScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.85) {
                    element.classList.add('active');
                }
            });
        };
        
        // Initial check
        revealOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', revealOnScroll);
        
        // Check on resize
        window.addEventListener('resize', revealOnScroll);
    }

    triggerInitialAnimations() {
        // Add fade-in class to body for initial animation
        document.body.classList.add('loaded');
        
        // Trigger initial reveal animations
        setTimeout(() => {
            const initialReveals = document.querySelectorAll('.reveal');
            initialReveals.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 100);
            });
        }, 100);
    }

    setupHoverEffects() {
        // Add hover effect to cards
        const cards = document.querySelectorAll('.feature-card, .property-card, .info-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });
        
        // Add hover effect to buttons
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-consultation');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createButtonRipple(e);
            });
        });
    }

    createRippleEffect(event) {
        const card = event.currentTarget;
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.background = 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)';
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    createButtonRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        ripple.classList.add('button-ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupScrollToTop() {
        const backToTop = document.getElementById('backToTop');
        
        if (!backToTop) return;
        
        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };
        
        // Initial check
        toggleBackToTop();
        
        // Check on scroll
        window.addEventListener('scroll', toggleBackToTop);
        
        // Scroll to top on click
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupNavigation() {
        const header = document.getElementById('mainNav');
        let lastScroll = 0;
        
        if (!header) return;
        
        const toggleHeader = () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        };
        
        // Initial check
        toggleHeader();
        
        // Check on scroll
        window.addEventListener('scroll', toggleHeader);
        
        // Update active nav link on scroll
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const updateActiveLink = () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}` || 
                    link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', updateActiveLink);
    }

    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!mobileToggle || !navMenu) return;
        
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Parallax effect for hero section
    setupParallax() {
        const hero = document.querySelector('.luxury-hero');
        if (!hero) return;
        
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        };
        
        window.addEventListener('scroll', handleParallax);
    }

    // Initialize all animations
    static initAll() {
        new LuxuryAnimations();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    LuxuryAnimations.initAll();
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});