document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic Navbar Generation from navConfig
    const desktopHeader = document.getElementById('desktop-header');
    const mobileHeader = document.getElementById('mobile-header');

    if (desktopHeader && mobileHeader && typeof navConfig !== 'undefined') {
        // Build Desktop Header
        desktopHeader.innerHTML = `
            <div class="nav-container">
                <a href="#hero" class="nav-logo" data-i18n="nav_logo">M. Ezzahar</a>
                <div class="nav-menu">
                    <div class="nav-links">
                        ${navConfig.links.map(link => `
                            <a href="${link.href}" data-section="${link.id}" data-i18n="${link.i18nKey}"></a>
                        `).join('')}
                    </div>
                    <div class="nav-actions">
                        <button class="theme-toggle-btn" aria-label="Toggle Theme">
                            <i class="fa-solid fa-moon"></i>
                        </button>
                        <div class="lang-switch">
                            ${navConfig.languages.map(lang => `
                                <button class="lang-btn" data-lang="${lang.code}">${lang.label}</button>
                            `).join('')}
                        </div>
                        <a href="#contact" class="nav-cta-btn" data-i18n="nav_cta">Get in touch</a>
                    </div>
                </div>
            </div>
        `;

        // Build Mobile Header (distinct slide-in layout & accessibility)
        mobileHeader.innerHTML = `
            <div class="nav-container">
                <a href="#hero" class="nav-logo" data-i18n="nav_logo">M. Ezzahar</a>
                <div class="nav-actions-mobile">
                    <button class="theme-toggle-btn" aria-label="Toggle Theme">
                        <i class="fa-solid fa-moon"></i>
                    </button>
                    <button class="nav-burger" id="nav-burger" aria-label="Open menu" aria-expanded="false">
                        <span class="burger-line"></span>
                        <span class="burger-line"></span>
                    </button>
                </div>
            </div>
            <div class="nav-mobile-overlay" id="nav-mobile-overlay"></div>
            <nav class="nav-mobile-menu" id="nav-mobile-menu" aria-hidden="true" role="dialog" aria-modal="true">
                <div class="mobile-links">
                    ${navConfig.links.map(link => `
                        <a href="${link.href}" data-section="${link.id}" data-i18n="${link.i18nKey}"></a>
                    `).join('')}
                    <a href="#contact" class="nav-cta-btn mobile-cta-btn" data-i18n="nav_cta" style="margin-top: 20px; text-align: center; display: block;">Get in touch</a>
                </div>
                <div class="mobile-lang-container">
                    <div class="lang-switch">
                        ${navConfig.languages.map(lang => `
                            <button class="lang-btn" data-lang="${lang.code}">${lang.label}</button>
                        `).join('')}
                    </div>
                </div>
            </nav>
        `;
    }

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
                toggleMenu(true);

                const offset = target.offsetTop - 68; // Adjusted for nav height
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Navbar Logic (Dynamic switching, slide-in drawer, overlay, Esc close, scroll locking, focus trapping)
    const burger = document.getElementById('nav-burger');
    const mobileMenu = document.getElementById('nav-mobile-menu');
    const overlay = document.getElementById('nav-mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-links a');
    const sections = document.querySelectorAll('section[id]');

    function toggleMenu(forceClose = false) {
        const currentBurger = document.getElementById('nav-burger');
        const currentMenu = document.getElementById('nav-mobile-menu');
        const currentOverlay = document.getElementById('nav-mobile-overlay');
        if (!currentBurger || !currentMenu) return;

        const isOpen = forceClose ? false : !currentBurger.classList.contains('open');

        currentBurger.classList.toggle('open', isOpen);
        currentMenu.classList.toggle('open', isOpen);
        if (currentOverlay) currentOverlay.classList.toggle('open', isOpen);

        currentBurger.setAttribute('aria-expanded', isOpen);
        currentBurger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        currentMenu.setAttribute('aria-hidden', !isOpen);
        document.body.classList.toggle('no-scroll', isOpen);

        if (isOpen) {
            // Focus the first navigation link after transitioning
            const focusables = getFocusableElements();
            if (focusables.length > 1) {
                setTimeout(() => focusables[1].focus(), 100);
            }
        }
    }

    function getFocusableElements() {
        const currentBurger = document.getElementById('nav-burger');
        const currentMenu = document.getElementById('nav-mobile-menu');
        if (!currentMenu || !currentBurger) return [];
        const elementsInMenu = Array.from(currentMenu.querySelectorAll('a, button, [tabindex="0"]'));
        return [currentBurger, ...elementsInMenu].filter(el => {
            return el.tabIndex >= 0 && !el.disabled && el.offsetParent !== null;
        });
    }

    // Toggle menu events
    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }
    if (overlay) {
        overlay.addEventListener('click', () => {
            toggleMenu(true);
        });
    }

    // Close menu when a link inside mobile menu is clicked
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(true);
        });
    });

    // Keyboard accessibility: Escape to close and Tab key trap
    document.addEventListener('keydown', (e) => {
        const currentBurger = document.getElementById('nav-burger');
        if (e.key === 'Escape') {
            if (currentBurger && currentBurger.classList.contains('open')) {
                toggleMenu(true);
            }
            return;
        }

        if (e.key === 'Tab') {
            if (currentBurger && currentBurger.classList.contains('open')) {
                const focusables = getFocusableElements();
                if (focusables.length === 0) return;

                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        last.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === last) {
                        first.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        const currentBurger = document.getElementById('nav-burger');
        const currentMenu = document.getElementById('nav-mobile-menu');
        if (currentBurger && currentBurger.classList.contains('open') && currentMenu) {
            if (!currentMenu.contains(e.target) && !currentBurger.contains(e.target)) {
                toggleMenu(true);
            }
        }
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

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key] !== undefined) {
                el.setAttribute('placeholder', translations[lang][key]);
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

    // --- Direct Info Obfuscation (Anti-Scraping) ---
    const obfuscateContact = () => {
        const user = "m.ezzahar";
        const domain = "edu.umi.ac.ma";
        const emailLink = document.getElementById("email-link");
        const emailVal = document.getElementById("email-val");
        if (emailLink && emailVal) {
            emailLink.href = `mailto:${user}@${domain}`;
            emailVal.textContent = `${user}@${domain}`;
        }

        const pCode = "+212";
        const pNum = "609233284";
        const phoneLink = document.getElementById("phone-link");
        const phoneVal = document.getElementById("phone-val");
        if (phoneLink && phoneVal) {
            phoneLink.href = `tel:${pCode}${pNum}`;
            phoneVal.textContent = `${pCode} 6 09 23 32 84`;
        }

        // Obfuscate footer email as well
        const footerEmailLink = document.getElementById("footer-email-link");
        if (footerEmailLink) {
            footerEmailLink.href = `mailto:${user}@${domain}`;
            footerEmailLink.textContent = `${user}@${domain}`;
        }
    };
    obfuscateContact();

    // --- Category Filter Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectElements = document.querySelectorAll('.featured-project-wheeler, .project-card-v4');

    if (filterButtons.length > 0 && projectElements.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active state & accessibility
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                
                // Apply visual filter
                projectElements.forEach(el => {
                    const category = el.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        el.style.display = '';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    } else {
                        el.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Light/Dark Theme Switching Logic ---
    const initTheme = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleIcons(theme);
    };

    const updateToggleIcons = (theme) => {
        const icons = document.querySelectorAll('.theme-toggle-btn i');
        icons.forEach(icon => {
            if (theme === 'dark') {
                icon.className = 'fa-solid fa-sun';
            } else {
                icon.className = 'fa-solid fa-moon';
            }
        });
    };

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcons(newTheme);
    };

    // Global listener on theme toggles
    document.addEventListener('click', (e) => {
        if (e.target.closest('.theme-toggle-btn')) {
            toggleTheme();
        }
    });

    initTheme();
});
