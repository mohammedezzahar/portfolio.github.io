document.addEventListener('DOMContentLoaded', () => {

    // 2. Global Fade-up Reveal (Intersection Observer)
    const revealOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Check if it's a skill group to trigger bars
                if (entry.target.classList.contains('skill-group')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, revealOptions);

    document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

    // Stagger delays for grid children
    const gridSelectors = ['.projects-grid', '.skills-grid', '.about-text'];
    gridSelectors.forEach(sel => {
        const grid = document.querySelector(sel);
        if (grid) {
            const children = grid.querySelectorAll('.fade-up');
            children.forEach((child, i) => {
                child.style.transitionDelay = `${i * 0.1}s`;
            });
        }
    });


    // 4. Skill Bar Animation
    function animateSkillBars(container) {
        const bars = container.querySelectorAll('.bar-fill');
        bars.forEach((bar, i) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, i * 120);
        });
    }

    // 5. Hero Parallax
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        const heroBg = document.getElementById('hero-parallax');

        if (scrollY < heroHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.18}px)`;
        }
    }, { passive: true });

    // 6. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                const burger = document.getElementById('nav-burger');
                const mobileMenu = document.getElementById('nav-mobile-menu');
                if (burger && burger.classList.contains('open')) {
                    burger.classList.remove('open');
                    mobileMenu.classList.remove('open');
                    burger.setAttribute('aria-expanded', 'false');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                }

                const offset = target.offsetTop - 68; // Adjusted for nav height
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Navbar Logic
    const burger = document.getElementById('nav-burger');
    const mobileMenu = document.getElementById('nav-mobile-menu');
    const navLinks = document.querySelectorAll('.pill-links a, .mobile-links a');
    const sections = document.querySelectorAll('section[id]');

    // Burger Toggle
    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            const isOpen = burger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            burger.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
        });
    }

    // Close mobile menu when a mobile link is clicked
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (burger && mobileMenu) {
                mobileMenu.classList.remove('open');
                burger.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Handle Active States on Scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const offset = 100; // Offset for top navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - offset) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // Stagger skill group entrance animation
    document.querySelectorAll('.skill-group-v2').forEach((group, i) => {
        group.style.transitionDelay = `${i * 0.1}s`;
    });

    // Scroll Progress & Active Links

    // Active Link Highlighting (Intersection Observer)
    const navObserverOptions = {
        threshold: 0.35,
        rootMargin: '-10% 0px -55% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // 8. Translation Engine
        // 8. Translation Engine (Refactored)
    window.setLanguage = function(lang) {
        // 1. Save to localStorage
        localStorage.setItem('lang', lang);

        // 2. Set dir and lang on <html>
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // 3. Swap every text node
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key] !== undefined) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Translate title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key] !== undefined) {
                el.setAttribute('title', translations[lang][key]);
            }
        });

        // Translate page title
        const titleEl = document.querySelector('title[data-i18n]');
        if (titleEl) {
            const key = titleEl.getAttribute('data-i18n');
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key] !== undefined) {
                document.title = translations[lang][key];
            }
        } else if (typeof translations !== 'undefined' && translations[lang] && translations[lang].page_title) {
            document.title = translations[lang].page_title;
        }

        // 4. Switch font class on body
        document.body.classList.remove('font-ar', 'font-en', 'font-fr');
        document.body.classList.add(lang === 'ar' ? 'font-ar' : 'font-en');

        // 5. Mark active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang || btn.getAttribute('data-lang') === lang);
        });
    }

    // Event listeners for lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang || btn.getAttribute('data-lang'));
        });
    });

    // Initialize from local storage
    const saved = localStorage.getItem('lang') || 'en';
    setLanguage(saved);

    // --- Project Page Interactivity ---

    // Parallax Effect for Hero
    const heroBg = document.querySelector('.project-detail-hero .hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        });
    }

    // Scroll Reveal for Gallery and Sections
    const revealElements = document.querySelectorAll('.gallery-img, .detail-text h3, .tech-item');
    const projectRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                projectRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        projectRevealObserver.observe(el);
    });
});
