// ============================================
// H Heuristics - Development Economics
// Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Navigation background on scroll
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.section-header, .content-main, .content-sidebar, .info-card, ' +
        '.implication-card, .mechanism-card, .driver-card, .geography-card, ' +
        '.policy-item, .context-card, .opportunity, .outcome-card, ' +
        '.flow-item, .channel, .bottleneck, .diffusion-concept'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });

    // Income bar animation on scroll
    const incomeBar = document.querySelector('.income-bar');
    if (incomeBar) {
        const incomeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    incomeBar.classList.add('animated');
                    incomeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        incomeObserver.observe(incomeBar);
    }

    // Stat counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    function animateValue(element) {
        const text = element.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const endValue = parseInt(match[1]);
        const suffix = text.replace(/\d+/, '');
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(endValue * easeOutQuart);
            
            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = text;
            }
        }

        requestAnimationFrame(update);
    }

    // Active section highlighting in nav
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -80% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

    // Trajectory bars animation
    const trajectories = document.querySelectorAll('.trajectory');
    const trajectoryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    trajectories.forEach(traj => {
        traj.style.width = '0';
        trajectoryObserver.observe(traj);
    });
});

// Add CSS for animations dynamically
const style = document.createElement('style');
style.textContent = `
    /* Fade in animation */
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered animations for grids */
    .implications-grid .fade-in:nth-child(1),
    .mechanism-grid .fade-in:nth-child(1),
    .driver-cards .fade-in:nth-child(1) { transition-delay: 0ms; }
    
    .implications-grid .fade-in:nth-child(2),
    .mechanism-grid .fade-in:nth-child(2),
    .driver-cards .fade-in:nth-child(2) { transition-delay: 100ms; }
    
    .implications-grid .fade-in:nth-child(3),
    .mechanism-grid .fade-in:nth-child(3),
    .driver-cards .fade-in:nth-child(3) { transition-delay: 200ms; }
    
    .mechanism-grid .fade-in:nth-child(4),
    .driver-cards .fade-in:nth-child(4) { transition-delay: 300ms; }
    
    .mechanism-grid .fade-in:nth-child(5),
    .driver-cards .fade-in:nth-child(5) { transition-delay: 400ms; }
    
    .mechanism-grid .fade-in:nth-child(6),
    .driver-cards .fade-in:nth-child(6) { transition-delay: 500ms; }
    
    /* Income bar animation */
    .income-bar .income-segment {
        transition: flex 1s ease;
    }
    
    .income-bar:not(.animated) .income-segment {
        flex: 0 !important;
    }
    
    /* Trajectory animation */
    .trajectory {
        transition: width 1s ease;
    }
    
    .trajectory.animated.advanced { width: 100% !important; }
    .trajectory.animated.emerging { width: 75% !important; }
    .trajectory.animated.stagnant { width: 35% !important; }
    
    /* Nav scroll state */
    .main-nav.scrolled {
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    }
    
    /* Active nav item */
    .nav-links a.active {
        color: var(--color-accent-dark);
    }
    
    /* Mobile menu */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: var(--color-paper);
            flex-direction: column;
            padding: var(--space-xl);
            gap: var(--space-md);
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-open {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }
`;
document.head.appendChild(style);
