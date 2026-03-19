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

    // Stagger skill group entrance animation
    document.querySelectorAll('.skill-group-v2').forEach((group, i) => {
        group.style.transitionDelay = `${i * 0.1}s`;
    });

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
                    // Match either by data-section or href
                    if (link.getAttribute('data-section') === id || link.getAttribute('href').includes(id)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // 8. Translation Engine
    const translations = {
        en: {
            // Nav
            nav_about_short: "About",
            nav_projects_short: "Projects",
            nav_skills_short: "Skills",
            nav_contact_short: "Contact",
            nav_about: "About",
            nav_projects: "Projects",
            nav_skills: "Skills",
            nav_contact: "Contact",
            nav_experience_short: "Methodology",
            footer_name: "Mohammed Ezzahar",
            page_title: "Mohammed Ezzahar | Financial Analyst · AI/Data Engineer · Accounting Automation",
            meta_desc: "Mohammed Ezzahar — Financial Analyst & AI Engineer. Bridging Accounting Integrity with AI-Driven Financial Intelligence. Python · SQL · Power BI · XGBoost · Financial Modeling.",
            
            // Tooltips
            tt_linkedin: "LinkedIn",
            tt_github: "GitHub",
            tt_twitter: "X (Twitter)",
            tt_medium: "Medium",
            tt_reddit: "Reddit",
            tt_substack: "Bookmark",
            tt_youtube: "YouTube",

            // Hero
            hero_name_first: "MOHAMMED",
            hero_name_last: "EZZAHAR",
            hero_eyebrow: "Financial Analyst · AI/Data Engineer · Accounting Automation",
            hero_tagline: "Engineering the intersection of Accounting Integrity, Python Automation, and AI-Driven Financial Intelligence — from Morocco to global markets.",
            hero_status: "Global Market Alignment Active",

            // About
            about_eyebrow: "THE PHILOSOPHY",
            about_h2: "The Convergence of <em>Logic & Capital</em>",
            about_lead: "Engineering the intersection of Accounting Integrity and AI-Driven Financial Intelligence — measurable impact at every layer of the financial stack.",
            about_p1: "Rooted in the academic precision of <strong>Université Moulay Ismail</strong> and forged as Co-founder and CFO/CTO of <strong>ALIFFA Startup</strong>, I represent a rare 2026 profile: the synthesis of <strong>Accounting Integrity</strong> (IFRS, GAAP, SOX-adjacent frameworks), <strong>Python-driven automation</strong>, and <strong>AI/ML engineering</strong> — the exact convergence demanded by Deloitte's Omnia AI teams, PwC's digital advisory, and fintech quant desks globally.",
            about_p2: "From engineering automated bank reconciliation pipelines that eliminate 95% of manual errors, to building XGBoost fraud classifiers at 91% precision and transformer-based financial recommenders — every project I build is calibrated to the standards expected by top-tier firms in the Big 4, investment banking, and data-driven hedge fund analytics.",
            testimonial_text: "\"The work Mohammed and his team produced wasn't just technical\u2014it was <strong>generational</strong> in Morocco's financial landscape.\"",
            testimonial_author: "\u2014 Executive Board, ALIFFA Startup",

            // Projects
            projects_eyebrow: "SELECTED WORKS",
            projects_h2: "Portfolio <em>Excellence</em>",
            proj_f_eyebrow: "FEATURED · FINTECH & AI",
            proj_f_title: "Fraud Detection & AI Recommender",
            proj_f_p: "XGBoost fraud classifier achieving 91% precision with 30% false-positive reduction on live transaction data — combined with a Transformer-based financial product recommender that lifted session depth 8%.",
            proj_1_eyebrow: "ACCOUNTING · AUTOMATION",
            proj_1_title: "Bank Reconciliation Pipeline",
            proj_1_p: "Python & SQL automated reconciliation pipeline eliminating manual entry errors by 95%.",
            proj_2_eyebrow: "DATA SCIENCE · FINANCE",
            proj_2_title: "Sentiment-AI Market Bot",
            proj_2_p: "NLP pipeline utilizing FinBERT to extract proprietary sentiment signals from unstructured Bloomberg/Reuters data.",
            proj_3_eyebrow: "FINANCE · TAX STRATEGY",
            proj_3_title: "Corporate Tax Impact Study",
            proj_3_p: "Econometric Python & Power BI modeling forecasting a 20% corporate tax (IS) savings.",
            proj_4_eyebrow: "AI · MULTI-MODAL",
            proj_4_title: "Deep Recommender System",
            proj_4_p: "Multi-vector recommendation engine for personalized financial product matching.",

            // Skills
            skills_eyebrow: "TECHNICAL ARSENAL",
            skills_h2: "Technical <em>Infrastructure</em>",
            skills_g1: "Programming",
            skills_g2: "Data & BI",
            skills_g3: "Finance & Accounting",
            skills_g4: "AI & Strategy",
            skills_g5: "Financial Modeling & Valuation",
            skills_g6: "Cloud, ERP & Infrastructure",

            // Market Alignment

            // Certifications
            cert_eyebrow: "CREDENTIALS",
            cert_h2: "Professional <em>Validation</em>",
            cert_status_completed: "Completed",
            cert_status_progress: "In Progress",
            cert_1_h3: "Moroccan Finance Law & IS Tax Framework",
            cert_1_p: "Demonstrated via Corporate Tax Impact Study Project",
            cert_2_h3: "Python for Data Science",
            cert_2_p: "Demonstrated via 4+ production-grade AI projects",
            cert_3_h3: "SQL & Database Engineering",
            cert_3_p: "Demonstrated via Bank Reconciliation ETL Pipeline",
            cert_4_h3: "IFRS Standards Awareness",
            cert_4_p: "Demonstrated via Financial Reporting & Analysis",
            cert_5_h3: "CFA Level 1 Candidate",
            cert_5_p: "Targets Senior Investment Banking/Hedge Fund Roles",
            cert_6_h3: "FMVA® — Financial Modeling & Valuation Analyst",
            cert_6_p: "CFI Institute · Practical 3-Statement & DCF Modeling",
            cert_7_h3: "Power BI Data Analyst (PL-300)",
            cert_7_p: "Microsoft Certified Associate",
            cert_8_h3: "AWS Cloud Practitioner",
            cert_8_p: "Cloud-based AI/Data Pipeline Deployment",

            // Contact
            contact_eyebrow: "OPEN TO OPPORTUNITIES",
            contact_h2: "Let's Build <em>Something Real</em>",
            contact_lead: "Whether you're hiring for <strong>Big 4 financial analytics</strong>, a <strong>fintech data science</strong> role, or building at the intersection of <strong>AI and institutional finance</strong> — I build production-grade systems that combine accounting rigor with machine learning precision. Open to full-time, remote, and international opportunities.",
            contact_label_email: "EMAIL",
            contact_label_phone: "PHONE",
            contact_label_location: "LOCATION",
            contact_location: "Meknès, Morocco · Available Remotely",
            contact_avail: "Currently available for full-time roles and consulting engagements",
            
            // Footer
            footer_role: "Financial & Data Analyst · AI Developer",
            footer_location: "Meknès, Morocco",
            copyright: "© 2026 Mohammed Ezzahar",

            // Tag Translations
            tag_python: "Python",
            tag_tensorflow: "TensorFlow",
            tag_pytorch: "PyTorch",
            tag_sql: "SQL",
            tag_vba: "VBA / Excel",
            tag_pandas: "Pandas",
            tag_numpy: "NumPy",
            tag_sklearn: "Scikit-learn",
            tag_powerbi: "PowerBI",
            tag_tableau: "Tableau",
            tag_matplotlib: "Matplotlib",
            tag_seaborn: "Seaborn",
            tag_plotly: "Plotly",
            tag_streamlit: "Streamlit",
            tag_pandas_prof: "Pandas Profiling",
            tag_fin_model: "Financial Modeling",
            tag_tax_plan: "Tax Planning (MA)",
            tag_standards: "GAAP / IFRS / SOX-adjacent",
            tag_bank_recon: "Bank Reconciliation",
            tag_audit: "Audit Frameworks",
            tag_fiscal_opt: "Fiscal Optimization",
            tag_fpa: "FP&A Frameworks",
            tag_esg: "ESG Reporting Awareness",
            tag_forensic: "Forensic Data Analytics",
            tag_ml: "LSTMs / Transformers",
            tag_nlp: "NLP / FinBERT",
            tag_vector: "Vector Search (FAISS)",
            tag_logic: "Critical Thinking",
            tag_geo: "Geopolitical Analysis",
            tag_proto: "Strategic Communication",
            tag_dcf: "DCF Modeling",
            tag_3statement: "3-Statement Models",
            tag_lbo: "LBO Fundamentals",
            tag_ebitda: "EV/EBITDA Valuation",
            tag_scenario: "Scenario Analysis",
            tag_wcap: "Working Capital Analysis",
            tag_cloud: "AWS / GCP",
            tag_db: "PostgreSQL / Redis",
            tag_docker: "Docker",
            tag_erp: "ERP Awareness (SAP/Oracle)",
            tag_snowflake: "Snowflake (learning)",
            tag_api: "FastAPI / Celery",
            tag_frontend: "Modern Frontend",
            role_1: "Financial Analyst",
            role_2: "AI & Data Engineer",
            role_3: "Automation Expert",
            role_4: "Strategic Wealth Optimizer"
        },
        fr: {
            // Nav
            nav_about: "À propos",
            nav_projects: "Projets",
            nav_skills: "Compétences",
            nav_contact: "Contact",
            nav_about_short: "À propos",
            nav_projects_short: "Projets",
            nav_skills_short: "Compétences",
            nav_contact_short: "Contact",
            nav_experience_short: "Méthodologie",

            // Tooltips
            tt_linkedin: "LinkedIn",
            tt_github: "GitHub",
            tt_twitter: "X (Twitter)",
            tt_medium: "Medium",
            tt_reddit: "Reddit",
            tt_substack: "Signet",
            tt_youtube: "YouTube",

            // Hero
            hero_name_first: "MOHAMMED",
            hero_name_last: "EZZAHAR",
            hero_eyebrow: "Analyste Financier · Ingénieur IA/Données · Automatisation Comptable",
            hero_tagline: "Ingénierie à l'intersection de l'Intégrité Comptable, de l'Automatisation Python et de l'Intelligence Financière — du Maroc aux marchés mondiaux.",
            hero_status: "Alignement Marché Mondial Actif",

            // About
            about_eyebrow: "LA PHILOSOPHIE",
            about_h2: "La Convergence de la <em>Logique et du Capital</em>",
            about_lead: "Ingénierie à la convergence de l'intégrité comptable et de l'intelligence financière pilotée par l'IA — un impact mesurable à chaque strate.",
            about_p1: "Ancré dans la précision académique de l'<strong>Université Moulay Ismaïl</strong> et forgé en tant que Co-fondateur et CFO/CTO de la startup <strong>ALIFFA</strong>, je représente un profil rare de 2026 : la synthèse de l'<strong>Intégrité Comptable</strong> (IFRS, GAAP), de l'<strong>automatisation via Python</strong> et de l'<strong>ingénierie IA/ML</strong> — la convergence exigée par les équipes Omnia AI de Deloitte et le conseil digital de PwC.",
            about_p2: "De l'ingénierie de pipelines automatisés de rapprochement bancaire éliminant 95% des erreurs manuelles, à la construction de classificateurs de fraude XGBoost à 91% de précision — chaque projet est calibré selon les standards des Big 4 et de la banque d'investissement.",
            testimonial_text: "\"Le travail produit par Mohammed et son équipe n'était pas seulement technique\u2014il était <strong>générationnel</strong> pour le paysage financier du Maroc.\"",
            testimonial_author: "\u2014 Conseil d'administration, ALIFFA Startup",

            // Projects
            projects_eyebrow: "TRAVAUX SÉLECTIONNÉS",
            projects_h2: "Excellence du <em>Portfolio</em>",
            proj_f_eyebrow: "VEDETTE · FINTECH & IA",
            proj_f_title: "Détection de Fraude & Recommandeur IA",
            proj_f_p: "Classificateur de fraude XGBoost atteignant 91% de précision avec une réduction de 30% des faux positifs sur les transactions en direct — combiné à un moteur de recommandation basé sur Transformers.",
            proj_1_eyebrow: "COMPTABILITÉ · AUTOMATISATION",
            proj_1_title: "Pipeline de Rapprochement Bancaire",
            proj_1_p: "Pipeline ETL automatisé en Python et SQL éliminant 95% des erreurs de saisie manuelle.",
            proj_2_eyebrow: "DATA SCIENCE · FINANCE",
            proj_2_title: "Modèle de Sentiment & Génération de Texte IA",
            proj_2_p: "Pipeline NLP basé sur BERT pour extraire des insights à travers plus de 50 000 interactions clients.",
            proj_3_eyebrow: "FINANCE · STRATÉGIE FISCALE",
            proj_3_title: "Étude d'Impact Fiscal des Entreprises",
            proj_3_p: "Modélisation économétrique prévoyant 20% d'économies d'impôt sur les sociétés (IS) via Power BI.",
            proj_4_eyebrow: "IA · MULTI-MODAL",
            proj_4_title: "Système de Recommandation Profond",
            proj_4_p: "Moteur de recommandation multi-vectoriel pour l'appariement personnalisé de produits financiers.",

            // Skills
            skills_eyebrow: "ARSENAL TECHNIQUE",
            skills_h2: "Infrastructure <em>Technique</em>",
            skills_g1: "Programmation",
            skills_g2: "Données & BI",
            skills_g3: "Finance & Comptabilité",
            skills_g4: "IA & Stratégie",
            skills_g5: "Modélisation Financière & Évaluation",
            skills_g6: "Cloud, ERP & Infrastructure",

            // Market Alignment

            // Certifications
            cert_eyebrow: "DIPLÔMES & CERTIFICATIONS",
            cert_h2: "Validation <em>Professionnelle</em>",
            cert_status_completed: "Terminé",
            cert_status_progress: "En Cours",
            cert_1_h3: "Droit Financier Marocain & Cadre Fiscal IS",
            cert_1_p: "Démontré via le projet Étude d'Impact Fiscal",
            cert_2_h3: "Python pour la Data Science",
            cert_2_p: "Démontré via 4+ projets IA de grade production",
            cert_3_h3: "SQL & Ingénierie de Bases de Données",
            cert_3_p: "Démontré via le Pipeline ETL de Rapprochement Bancaire",
            cert_4_h3: "Connaissance des Normes IFRS",
            cert_4_p: "Démontré via le Reporting & Analyse Financière",
            cert_5_h3: "Candidat CFA Niveau 1",
            cert_5_p: "Vise des rôles Seniors en Banque d'Investissement",
            cert_6_h3: "FMVA® — Analyste en Modélisation Financière",
            cert_6_p: "CFI Institute · Modélisation Pratique 3-Statement & DCF",
            cert_7_h3: "Analyste de Données Power BI (PL-300)",
            cert_7_p: "Microsoft Certified Associate",
            cert_8_h3: "AWS Cloud Practitioner",
            cert_8_p: "Déploiement de Pipelines IA/Données sur le Cloud",

            // Contact
            contact_eyebrow: "OUVERT AUX OPPORTUNITÉS",
            contact_h2: "Construisons <em>Quelque Chose de Réel</em>",
            contact_lead: "Que vous recrutiez pour l'analyse financière Big 4, un rôle en data science fintech, ou l'IA institutionnelle — je construis des systèmes robustes combinant rigueur comptable et machine learning. Ouvert à l'international.",
            contact_label_email: "EMAIL",
            contact_label_phone: "TÉLÉPHONE",
            contact_label_location: "EMPLACEMENT",
            contact_location: "Meknès, Maroc · Disponible à distance",
            contact_avail: "Actuellement disponible pour des rôles à plein temps et missions de conseil",
            
            // Footer
            footer_role: "Analyste Financier & IA",
            footer_location: "Meknès, Maroc",
            footer_name: "Mohammed Ezzahar",
            page_title: "Mohammed Ezzahar | Analyste Financier · Ingénieur IA/Données · Automatisation Comptable",
            meta_desc: "Mohammed Ezzahar — Analyste Financier et Ingénieur IA. Allier l'intégrité comptable à l'intelligence financière basée sur l'IA. Python · SQL · Power BI · XGBoost · Modélisation Financière.",
            copyright: "© 2026 Mohammed Ezzahar",

            // Tag Translations
            tag_python: "Python",
            tag_tensorflow: "TensorFlow",
            tag_pytorch: "PyTorch",
            tag_sql: "SQL",
            tag_vba: "VBA / Excel",
            tag_pandas: "Pandas",
            tag_numpy: "NumPy",
            tag_sklearn: "Scikit-learn",
            tag_powerbi: "PowerBI",
            tag_tableau: "Tableau",
            tag_matplotlib: "Matplotlib",
            tag_seaborn: "Seaborn",
            tag_plotly: "Plotly",
            tag_streamlit: "Streamlit",
            tag_pandas_prof: "Pandas Profiling",
            tag_fin_model: "Modélisation Financière",
            tag_tax_plan: "Planification Fiscale (MA)",
            tag_standards: "GAAP / IFRS / SOX-adjacent",
            tag_bank_recon: "Rapprochement Bancaire",
            tag_audit: "Frameworks d'Audit",
            tag_fiscal_opt: "Optimisation Fiscale",
            tag_fpa: "Cadres FP&A",
            tag_esg: "Sensibilisation Reporting ESG",
            tag_forensic: "Analyse de Données Judiciaires",
            tag_ml: "LSTMs / Transformers",
            tag_nlp: "NLP / FinBERT",
            tag_vector: "Recherche Vectorielle (FAISS)",
            tag_logic: "Pensée Critique",
            tag_geo: "Analyse Géopolitique",
            tag_proto: "Communication Stratégique",
            tag_dcf: "Modélisation DCF",
            tag_3statement: "Modèles 3-Statement",
            tag_lbo: "Fondamentaux LBO",
            tag_ebitda: "Valorisation EV/EBITDA",
            tag_scenario: "Analyse de Scénarios",
            tag_wcap: "Analyse du Fonds de Roulement",
            tag_cloud: "AWS / GCP",
            tag_db: "PostgreSQL / Redis",
            tag_docker: "Docker",
            tag_erp: "Sensibilisation ERP (SAP/Oracle)",
            tag_snowflake: "Snowflake (apprentissage)",
            tag_api: "FastAPI / Celery",
            tag_frontend: "Frontend Moderne",
            role_1: "Analyste Financier",
            role_2: "Ingénieur IA & Données",
            role_3: "Expert en Automatisation",
            role_4: "Optimiseur de Patrimoine"
        },
        ar: {
            // Nav
            nav_about: "من أنا",
            nav_projects: "المشاريع",
            nav_skills: "المهارات",
            nav_contact: "تواصل معي",
            nav_about_short: "عنّي",
            nav_projects_short: "المشاريع",
            nav_skills_short: "المهارات",
            nav_contact_short: "التواصل",
            nav_experience_short: "المنهجية",

            // Tooltips
            tt_linkedin: "لينكد إن",
            tt_github: "جيت هاب",
            tt_twitter: "إكس (تويتر)",
            tt_medium: "ميديوم",
            tt_reddit: "ريديت",
            tt_substack: "المدونة",
            tt_youtube: "يوتيوب",

            // Hero
            hero_name_first: "مـحـمد",
            hero_name_last: "الـزهـر",
            hero_eyebrow: "محلل مالي · مهندس بيانات وذكاء اصطناعي · أتمتة المحاسبة",
            hero_tagline: "هندسة التقاطع بين نزاهة المحاسبة، أتمتة بايثون، والذكاء المالي المدفوع بالذكاء الاصطناعي — من المغرب إلى الأسواق العالمية.",
            hero_status: "تفعيل التوافق مع السوق العالمي",
            
            // About
            about_eyebrow: "الفلسفة",
            about_h2: "التقاء <em>المنطق ورأس المال</em>",
            about_lead: "هندسة التقاطع بين نزاهة المحاسبة والذكاء المالي المدفوع بالذكاء الاصطناعي — تأثير ملموس في كل طبقة من النظام المالي.",
            about_p1: "بفضل الدقة الأكاديمية في <strong>جامعة مولاي إسماعيل</strong> وخبرتي كمؤسس شريك ومدير مالي وتقني لشركة <strong>ALIFFA</strong>، أمثل ملفاً نادراً لعام 2026: مزيج من <strong>نزاهة المحاسبة</strong> (معايير IFRS ،GAAP)، <strong>الأتمتة باستخدام بايثون</strong>، و <strong>هندسة الذكاء الاصطناعي</strong> — وهو التوافق الذي تطلبه فرق Omnia AI في Deloitte والاستشارات الرقمية في PwC.",
            about_p2: "من بناء مسارات أتمتة لمطابقة الحسابات البنكية تمنع 95% من الأخطاء، إلى تطوير نماذج XGBoost لكشف الاحتيال بدقة 91% — كل مشروع مصمم وفقاً لأعلى المعايير المطلوبة في الشركات الكبرى (Big 4) وبنوك الاستثمار.",
            testimonial_text: "\"العمل الذي قدمه محمد وفريقه لم يكن مجرد عمل تقني فحسب، بل كان <strong>نقلة نوعية</strong> في المشهد المالي بالمغرب.\"",
            testimonial_author: "\u2014 المجلس التنفيذي، شركة ALIFFA",

            // Projects
            projects_eyebrow: "أعمال مختارة",
            projects_h2: "تميز <em>المشاريع</em>",
            proj_f_eyebrow: "مميز · التكنولوجيا المالية والذكاء الاصطناعي",
            proj_f_title: "كشف الاحتيال ونظام التوصية الذكي",
            proj_f_p: "نموذج XGBoost لكشف الاحتيال بدقة 91% مع تقليل الإنذارات الكاذبة بنسبة 30%، مدمج مع نظام توصية ذكي حسن تفاعل المستخدمين بنسبة 8%.",
            proj_1_eyebrow: "المحاسبة · الأتمتة",
            proj_1_title: "مسار مطابقة الحسابات البنكية",
            proj_1_p: "أتمتة شاملة باستخدام بايثون و SQL لمطابقة الحسابات وتجنب الأخطاء اليدوية بنسبة 95%.",
            proj_2_eyebrow: "علم البيانات · المالية",
            proj_2_title: "بوت ذكاء اصطناعي لتحليل المشاعر",
            proj_2_p: "بوت معالجة لغة طبيعية (NLP) يعتمد على BERT لاستخراج رؤى من أكثر من 50 ألف تفاعل مع العملاء وتوقع الاتجاهات.",
            proj_3_eyebrow: "المالية · الاستراتيجية الضريبية",
            proj_3_title: "دراسة تأثير ضريبة الشركات",
            proj_3_p: "نمذجة اقتصادية قياسية تتوقع توفيراً ضريبياً بنسبة 20% على الشركات (IS) عبر Power BI.",
            proj_4_eyebrow: "ذكاء اصطناعي · متعدد الأنماط",
            proj_4_title: "نظام توصية مالي عميق",
            proj_4_p: "محرك توصية مالي مخصص لمطابقة العملاء مع المنتجات المالية المناسبة بدقة عالية.",

            // Skills
            skills_eyebrow: "الترسانة التقنية",
            skills_h2: "البنية <em>التحتية</em>",
            skills_g1: "البرمجة",
            skills_g2: "البيانات وذكاء الأعمال",
            skills_g3: "المالية والمحاسبة",
            skills_g4: "الذكاء الاصطناعي والاستراتيجية",
            skills_g5: "النمذجة المالية والتقييم",
            skills_g6: "السحابة والبنية التحتية",

            // Market Alignment

            // Certifications
            cert_eyebrow: "المؤهلات المهنية",
            cert_h2: "الاعتماد <em>الاحترافي</em>",
            cert_status_completed: "مكتمل",
            cert_status_progress: "قيد المتابعة",
            cert_1_h3: "قانون المالية المغربي والإطار الضريبي (IS)",
            cert_1_p: "تم إثباته من خلال مشروع دراسة التأثير الضريبي",
            cert_2_h3: "بايثون لعلوم البيانات",
            cert_2_p: "تم إثباته من خلال أكثر من 4 مشاريع ذكاء اصطناعي",
            cert_3_h3: "هندسة قواعد البيانات و SQL",
            cert_3_p: "تم إثباته من خلال مسار مطابقة الحسابات البنكية",
            cert_4_h3: "الوعي بمعايير التقارير الدولية (IFRS)",
            cert_4_p: "تم إثباته من خلال التقارير والتحليلات المالية",
            cert_5_h3: "مرشح لشهادة CFA المستوى الأول",
            cert_5_p: "يستهدف أدواراً عليا في بنوك الاستثمار",
            cert_6_h3: "FMVA® — محلل النمذجة والتقييم المالي",
            cert_6_p: "معهد CFI · نمذجة القوائم المالية و DCF",
            cert_7_h3: "محلل بيانات Power BI (PL-300)",
            cert_7_p: "شهادة معتمدة من مايكروسوفت",
            cert_8_h3: "AWS Cloud Practitioner",
            cert_8_p: "نشر مسارات الذكاء الاصطناعي على السحابة",

            // Contact
            contact_eyebrow: "متاح لفرص العمل",
            contact_h2: "لنقم ببناء <em>شيء حقيقي</em>",
            contact_lead: "سواء كنت تبحث عن محلل مالي للشركات الكبرى، أو مهندس بيانات للتكنولوجيا المالية، أو بناء أنظمة تجمع بين <strong>المحاسبة والذكاء الاصطناعي</strong> — فأنا أقوم ببناء أنظمة جاهزة للإنتاج. متاح للعمل عن بُعد وللفرص الدولية.",
            contact_label_email: "البريد الإلكتروني",
            contact_label_phone: "الهاتف",
            contact_label_location: "الموقع",
            contact_location: "مكناس، المغرب · متاح للعمل عن بُعد",
            contact_avail: "متاح حالياً للوظائف بدوام كامل والتعاقدات الاستشارية",
            
            // Footer
            footer_role: "محلل مالي وبيانات · مطور ذكاء اصطناعي",
            footer_location: "مكناس، المغرب",
            footer_name: "محمد الزهر",
            page_title: "محمد الزهر | محلل مالي · مهندس بيانات وذكاء اصطناعي · أتمتة المحاسبة",
            meta_desc: "محمد الزهر — محلل مالي ومهندس ذكاء اصطناعي. الجمع بين نزاهة المحاسبة والذكاء المالي المدفوع بالذكاء الاصطناعي. بايثون · SQL · باور بي آي · نمذجة مالية.",
            copyright: "© 2026 محمد الزهر",

            // Tag Translations
            tag_python: "بايثون",
            tag_tensorflow: "تينسور فلو (TensorFlow)",
            tag_pytorch: "باي تورش (PyTorch)",
            tag_sql: "قواعد البيانات SQL",
            tag_vba: "VBA / إكسيل المتقدم",
            tag_pandas: "بانداس (Pandas)",
            tag_numpy: "نامباي (NumPy)",
            tag_sklearn: "سايكيت ليرن (Scikit-learn)",
            tag_powerbi: "باور بي آي (PowerBI)",
            tag_tableau: "تابلو (Tableau)",
            tag_matplotlib: "مات بلوت ليب",
            tag_seaborn: "سيبورن (Seaborn)",
            tag_plotly: "بلوتلي (Plotly)",
            tag_streamlit: "ستريم ليت (Streamlit)",
            tag_pandas_prof: "تحليل البيانات التلقائي",
            tag_fin_model: "النمذجة المالية",
            tag_tax_plan: "التخطيط الضريبي (المغرب)",
            tag_standards: "المعايير المحاسبية (IFRS/GAAP)",
            tag_bank_recon: "مطابقة الحسابات البنكية",
            tag_audit: "أطر التدقيق والمراجعة",
            tag_fiscal_opt: "التحسين الضريبي",
            tag_fpa: "أطر التخطيط والتحليل المالي",
            tag_esg: "تقارير الاستدامة (ESG)",
            tag_forensic: "تحليل البيانات الجنائي",
            tag_ml: "الشبكات العصبية والترانسفورمرز",
            tag_nlp: "معالجة اللغات الطبيعية (NLP)",
            tag_vector: "البحث المتجهي (FAISS)",
            tag_logic: "التفكير النقدي",
            tag_geo: "التحليل الجيوسياسي",
            tag_proto: "التواصل الاستراتيجي",
            tag_dcf: "نمذجة التدفقات النقدية (DCF)",
            tag_3statement: "نمذجة القوائم المالية الثلاث",
            tag_lbo: "أساسيات الاستحواذ بالرافعة المالية",
            tag_ebitda: "تقييم الشركات (EV/EBITDA)",
            tag_scenario: "تحليل السيناريوهات",
            tag_wcap: "تحليل رأس المال العامل",
            tag_cloud: "السحابة (AWS / GCP)",
            tag_db: "قواعد البيانات (PostgreSQL)",
            tag_docker: "دوكر (Docker)",
            tag_erp: "أنظمة ERP (SAP/Oracle)",
            tag_snowflake: "سـنو فـليك (تعلم)",
            tag_api: "برمجة الواجهات (FastAPI)",
            tag_frontend: "واجهات أمامية حديثة",
            role_1: "محلل مالي",
            role_2: "مهندس ذكاء اصطناعي وبيانات",
            role_3: "خبير أتمتة المحاسبة",
            role_4: "محسن ثروة استراتيجي"
        }
    };

    function switchLanguage(lang) {
        const data = translations[lang];
        if (!data) return;
        
        // Translate innerHTML
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (data[key]) {
                el.innerHTML = data[key];
            }
        });

        // Translate Title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (data[key]) {
                el.setAttribute('title', data[key]);
            }
        });

        // Translate Placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (data[key]) {
                el.setAttribute('placeholder', data[key]);
            }
        });

        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        if (data.page_title) document.title = data.page_title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && data.meta_desc) {
            metaDesc.setAttribute('content', data.meta_desc);
        }

        localStorage.setItem('preferred_lang', lang);

        // Restart Typed.js with translated strings
        initTyped(lang);
    }

    let typedInstance = null;
    function initTyped(lang) {
        if (typedInstance) typedInstance.destroy();
        
        const data = translations[lang];
        const strings = [
            data.role_1,
            data.role_2,
            data.role_3,
            data.role_4
        ];

        if (document.querySelector('#typed-role')) {
            typedInstance = new Typed('#typed-role', {
                strings: strings,
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                cursorChar: '|'
            });
        }
    }

    // Event listeners for lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.getAttribute('data-lang'));
        });
    });

    // Initialize from local storage
    const savedLang = localStorage.getItem('preferred_lang') || 'en';
    switchLanguage(savedLang);

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
    const revealElements = document.querySelectorAll('.gallery-img, .detail-text h3, .tech-item, h2');
    const projectRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-init');
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

    // --- Phase 2: Advanced Interactions ---

    // 1. Custom Cursor Implementation
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth Lerp for Cursor Outline
        const animateCursor = () => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor Hover Effects
        const hoverTargets = document.querySelectorAll('a, button, .p-card, .sg-tag');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            target.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // 2. Magnetic Button Effects
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // 3. Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
        }, { passive: true });
    }

    // 4. Hero Staggered Reveal
    const heroElements = [
        '.hero-job-eyebrow',
        '.hero-name',
        '.hero-divider',
        '.hero-tagline-text',
        '.hero-socials'
    ];

    heroElements.forEach((selector, i) => {
        const el = document.querySelector(selector);
        if (el) {
            setTimeout(() => {
                el.classList.add('reveal-init');
            }, 300 + (i * 150));
        }
    });

    // 5. Typed.js Role Cycling
    initTyped(savedLang);
});
