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
    const translations = {
        en: {
            nav_experience: "Experience",
            nav_projects: "Projects",
            nav_skills: "Skills",
            nav_contact: "Contact",
            hero_name_first: "MOHAMMED",
            hero_name_last: "EZZAHAR",
            hero_eyebrow: "Financial Analyst · AI/Data Engineer · Accounting Automation",
            hero_tagline: "Engineering the intersection of Accounting Integrity, Python Automation, and AI-Driven Financial Intelligence — from Morocco to global markets.",
            hero_status: "Active Analysis",
            about_eyebrow: "THE PHILOSOPHY",
            about_h2: "The Convergence of <em>Logic & Capital</em>",
            about_lead: "Bridging the gap between raw data and monumental decisions. My approach transcends simple analysis—it is about architecting clarity in a world of financial noise.",
            about_p1: "Rooted in the academic precision of <strong>Université Moulay Ismail</strong> and forged as Co-founder and CFO/CTO of <strong>ALIFFA Startup</strong>, I represent a rare 2026 profile: the synthesis of <strong>Accounting Integrity</strong> (IFRS, GAAP, SOX-adjacent frameworks), <strong>Python-driven automation</strong>, and <strong>AI/ML engineering</strong> — the exact convergence demanded by global digital advisory and fintech quant desks.",
            about_p2: "From engineering automated bank reconciliation pipelines that eliminate 95% of manual errors, to building XGBoost fraud classifiers at 91% precision and transformer-based financial recommenders — every project I build is calibrated to the standards expected by top-tier firms. My edge: <strong>financial domain knowledge that makes my code meaningful</strong>, and technical depth that makes my accounting decisions measurable.",
            about_s1: "Strategic Vision",
            about_s2: "Technical Depth",
            about_s3: "Fiscal Precision",
            projects_eyebrow: "SELECTED WORKS",
            projects_h2: "Portfolio <em>Excellence</em>",
            proj_f_eyebrow: "FEATURED · FINTECH & AI",
            proj_f_title: "Fintech & AI Analytics Engine",
            proj_f_p: "XGBoost fraud classifier adapted for Moroccan transaction patterns (CMI) achieving 91% precision — combined with a Transformer-based recommender for Moroccan financial products based on HCP and BAM economic indicators.",
            exp_eyebrow: "PROFESSIONAL IMPACT",
            exp_h2: "Market <em>Differentiators</em>",
            exp_1_title: "ALIFFA Startup Portfolio",
            exp_1_p: "Engineered a 15% increase in tax efficiency and a 40% speedup in audit readiness during my tenure as CFO/CTO.",
            exp_2_title: "Accounting Automation",
            exp_2_p: "Developed proprietary ETL pipelines that reduced manual bank reconciliation verification time by 90%.",
            exp_3_title: "Technical Synthesis",
            exp_3_p: "Bridging IFRS integrity with Python-driven data engineering for institutional-grade reliability.",
            exp_status: "Co-Founder & CFO/CTO",
            proj_1_eyebrow: "ACCOUNTING · AUTOMATION",
            proj_1_title: "Bank Reconciliation Pipeline",
            proj_1_p: "Automated reconciliation system for Moroccan bank accounts (BAM, Attijari, BCP) reducing manual verification by 90% using custom Python logic to handle MAD transactions and local statement formats.",
            market_fit_eyebrow: "CAREER TARGET",
            market_fit_h2: "Market Alignment",
            market_card_1_h: "Big 4 & Audit Analytics",
            market_card_1_l1: "AI Audit Automation (Omnia / Halo / Clara)",
            market_card_1_l2: "Financial Data Analytics & BI",
            market_card_1_l3: "Tax Technology Advisory",
            market_card_1_l4: "ESG Reporting & Assurance",
            market_card_1_l5: "Finance Transformation Consulting",
            market_card_2_h: "Investment Banking & Fintech",
            market_card_2_l1: "Risk Analytics & Fraud Detection",
            market_card_2_l2: "Financial Product Data Science",
            market_card_2_l3: "M&A Financial Modeling Support",
            market_card_2_l4: "Alternative Data Pipeline Engineering",
            market_card_2_l5: "FP&A Automation & Forecasting",
            market_card_3_h: "Quant Finance & Research",
            market_card_3_l1: "Quantitative Data Analysis",
            market_card_3_l2: "Sentiment Signal Engineering",
            market_card_3_l3: "Financial Recommender Systems",
            market_card_3_l4: "ML Factor Model Prototyping",
            market_card_3_l5: "Alternative Data Evaluation",
            proj_view_arch: "Review Architecture →",
            skills_eyebrow: "TECHNICAL ARSENAL",
            skills_h2: "Technical <em>Infrastructure</em>",
            skills_g1: "Programming",
            skills_g2: "Data & BI",
            skills_g3: "Finance & Accounting",
            skills_g4: "AI & Strategy",
            skills_g5: "Financial Modeling & Valuation",
            skills_g6: "Cloud, ERP & Infrastructure",
            skill_excel: "VBA / Excel",
            skill_modeling: "Financial Modeling",
            skill_tax: "Tax Planning (Moroccan Law)",
            skill_politics: "Politics & Geopolitics Understanding",
            skill_critical: "Critical Thinking & Analysis",
            skill_comm: "Strategic Communication",
            contact_lead: "Whether you're an institutional investor, a recruiting partner, or building something at the intersection of finance and AI — I want to hear from you.",
            contact_avail: "Currently available for full-time roles and consulting engagements",
            cta_h2: "Let's Build the <em>Future of Finance</em>",
            cta_p: "Open for collaborations in Data Engineering, Financial Analysis, and AI Research.",
            cta_location: "Meknès, Morocco",
            back_to_projects: "Return to Projects ←",
            detail_h_challenge: "The Challenge",
            detail_h_solution: "The Solution",
            detail_h_conclusion: "Project Conclusion",
            detail_role: "Role",
            detail_tech: "Tech Stack",
            detail_impact: "Impact",
            detail_year: "Year",
            detail_tools: "Tools & Environment",
            proj_f_long_p1: "This mission-critical platform handles high-velocity financial data from the CMI and Moroccan banking sector...",
            proj_f_challenge: "Developing fraud models for the Moroccan market requires accounting for specific local transaction patterns and regulatory requirements from Bank Al-Maghrib.",
            proj_f_solution: "We deployed XGBoost models achieving 91% precision on local data, combined with HCP economic indicators to refine financial product recommendations for Moroccan users.",
            proj_f_conclusion: "The platform proves that AI can bridge the gap in Moroccan fintech, turning fragmented banking data into strategic assets.",
            method_1_h: "Discovery & Data Audit",
            method_1_p: "Mapped the CMI transaction lifecycle and identified local data bottlenecks.",
            method_2_h: "Model Engineering",
            method_2_p: "Developed architectures tailored for Moroccan market volatility and MAD currency signals.",
            method_3_h: "Pipeline Integration",
            method_3_p: "Integrated real-time feeds from Bank Al-Maghrib and commercial banking APIs.",
            proj_1_long_p1: "Manual bank reconciliation in Moroccan institutions is often complicated by diverse report formats and MAD currency offsets.",
            proj_1_challenge: "Processing transactions from Attijariwafa, BCP, and BMCE manually was creating massive bottlenecks during monthly closings in Morocco.",
            proj_1_solution: "I developed a custom matching algorithm using fuzzy logic to automate 90% of the verification process for Moroccan bank statements.",
            proj_1_conclusion: "The pipeline has transformed the closing process for local SMEs and institutions, proving the value of localized Python automation.",
            method_1_h_1: "Data Extraction",
            method_1_p_1: "Automated retrieval of MAD statements from local banking portals and PDFs.",
            method_2_h_1: "Fuzzy Matching Logic",
            method_2_p_1: "Implemented Levenshtein distance for local vendor description matching.",
            method_3_h_1: "Exception Reporting",
            method_3_p_1: "Developed a dashboard to isolate unmatched Moroccan transaction types.",
            proj_2_long_p1: "This AI bot monitors the Casablanca Stock Exchange (MASI) and Moroccan business news in real-time.",
            proj_2_challenge: "Tracking sentiment across Medias24, L'Economiste, and social media manually is impossible for active MASI trading.",
            proj_2_solution: "I built an NLP pipeline fine-tuned for Moroccan financial French and Arabic to forecast Casablanca Stock Exchange trends.",
            proj_2_conclusion: "The bot successfully extracts alpha signals from the unique Moroccan financial news landscape.",
            method_1_h_2: "News Ingestion",
            method_1_p_2: "Designed a real-time scraper for Medias24, L'Economiste, and BAM press releases.",
            method_2_h_2: "NLP Classification",
            method_2_p_2: "Fine-tuned FinBERT to detect sentiment specific to Moroccan listed companies.",
            method_3_h_2: "Signal Generation",
            method_3_p_2: "Calculated sentiment scores weighted by MASI market capitalization.",
            proj_3_long_p1: "This study analyzes the impact of recent reforms in the Moroccan Finance Law (Loi de Finances) for corporations.",
            proj_3_challenge: "Navigating DGI circulars and IS/VAT reforms is a prerequisite for any institutional investor in Morocco.",
            proj_3_solution: "I developed a diagnostic framework that evaluates tax scenarios based on the latest Moroccan Investment Charter.",
            proj_3_conclusion: "The study serves as a key reference for tax optimization within the unique Moroccan fiscal environment.",
            method_1_h_3: "Contextual Analysis",
            method_1_p_3: "Mapped the 2024/2025 reforms in the Moroccan Finance Law (DGI).",
            method_2_h_3: "Risk Quantification",
            method_2_p_3: "Modeled IS liabilities for companies in Moroccan Free Trade Zones.",
            method_3_h_3: "Strategic Roadmap",
            method_3_p_3: "Delivered prioritized compliance actions for the Moroccan market.",
            proj_4_long_p1: "This recommender matches Moroccan customers with local banking and insurance products.",
            proj_4_challenge: "Matching products to Moroccan consumer behavior requires deep demographic context from HCP.",
            proj_4_solution: "I developed deep embedding networks that integrate HCP consumption trends with individual risk tolerance.",
            proj_4_conclusion: "The system has significantly improved engagement for local retail financial services.",
            method_1_h_4: "Embedding Design",
            method_1_p_4: "Built an auto-encoder to compress HCP-derived consumer features.",
            method_2_h_4: "Local Product Matching",
            method_2_p_4: "Implemented vector search across a catalog of Moroccan savings and credit products.",
            method_3_h_4: "Validation",
            method_3_p_4: "Achieved a 20% higher conversion rate compared to non-localized baseline models.",
            // New keys
            testimonial_text: "\"The work Mohammed and his team produced wasn't just technical\u2014it was <strong>generational</strong> in Morocco's financial landscape.\"",
            testimonial_author: "\u2014 From official Mentors &amp; Referees",
            contact_eyebrow: "OPEN TO OPPORTUNITIES",
            contact_h2: "Let's Build <em>Something Real</em>",
            contact_resume_en: "Download CV (EN)",
            contact_resume_fr: "Download CV (FR)",
            contact_case_study: "View Case Study PDF",
            contact_location: "Mekn\u00e8s, Morocco \u00b7 Available Remotely",
            footer_role: "Financial &amp; Data Analyst \u00b7 AI Developer",
            footer_location: "Mekn\u00e8s, Morocco",
            nav_about_short: "About",
            nav_experience_short: "Experience",
            nav_projects_short: "Projects",
            nav_skills_short: "Skills",
            nav_contact_short: "Contact",
            detail_h_methodology: "Methodology",
            proj_f_role: "AI/ML Engineer \u00b7 FinTech Risk & Personalization",
            proj_f_impact: "91% Precision \u00b7 +8% Session Uplift",
            view_github_profile: "View GitHub Profile",
            proj_2_eyebrow: "DATA SCIENCE \u00b7 FINANCE",
            proj_2_title: "Sentiment-AI Market Bot",
            proj_2_p: "Natural Language Processing bot filtering market sentiment from news feeds to forecast trends.",
            proj_3_eyebrow: "FINANCE \u00b7 TAX STRATEGY",
            proj_3_title: "Corporate Tax Impact Study",
            proj_3_p: "Comprehensive analysis of Moroccan fiscal frameworks for institutional investment planning.",
            proj_4_eyebrow: "AI \u00b7 MULTI-MODAL",
            proj_4_title: "Deep Recommender System",
            proj_4_p: "Multi-vector recommendation engine for personalized financial product matching."
        },
        fr: {
            nav_about: "About",
            nav_experience: "Expérience",
            nav_projects: "Projets",
            nav_skills: "Compétences",
            nav_contact: "Contact",
            hero_name_first: "MOHAMMED",
            hero_name_last: "EZZAHAR",
            hero_eyebrow: "Analyste Financier · Ingénieur IA/Data · Automatisation Comptable",
            hero_tagline: "Ingénierie à l'intersection de l'intégrité comptable, de l'automatisation Python et de l'intelligence financière pilotée par l'IA — du Maroc aux marchés mondiaux.",
            hero_status: "Analyse Active",
            about_eyebrow: "LA PHILOSOPHIE",
            about_h2: "La Convergence de la <em>Logique et du Capital</em>",
            about_lead: "Combler le fossé entre les données brutes et les décisions monumentales. Mon approche transcende l'analyse simple—elle consiste à architecturer la clarté dans un monde de bruit financier.",
            about_p1: "Ancré dans la précision académique de l'<strong>Université Moulay Ismaïl</strong> et forgé en tant que Co-fondateur et CFO/CTO de la <strong>Startup ALIFFA</strong>, je représente un profil rare en 2026 : la synthèse de l'<strong>Intégrité Comptable</strong> (IFRS, GAAP, SOX), de l'<strong>automatisation via Python</strong> et de l'<strong>ingénierie IA/ML</strong>.",
            about_p2: "De l'ingénierie de pipelines de rapprochement bancaire automatisés éliminant 95% des erreurs manuelles, à la construction de classificateurs de fraude XGBoost avec 91% de précision — chaque projet est calibré selon les standards des plus grandes firmes. Mon atout : une <strong>connaissance du domaine financier qui donne du sens à mon code</strong>.",
            about_s1: "Vision Stratégique",
            about_s2: "Profondeur Technique",
            about_s3: "Précision Fiscale",
            projects_eyebrow: "TRAVAUX SÉLECTIONNÉS",
            projects_h2: "Excellence du <em>Portfolio</em>",
            proj_f_eyebrow: "VEDETTE · FINTECH & IA",
            proj_f_title: "Moteur d'Analyse Fintech & IA",
            proj_f_p: "Classificateur de fraude XGBoost adapté aux schémas de transactions marocains (CMI) avec 91% de précision — combiné à un recommandeur basé sur les indicateurs économiques du HCP et de BAM.",
            exp_eyebrow: "IMPACT PROFESSIONNEL",
            exp_h2: "Différenciateurs de <em>Marché</em>",
            exp_1_title: "Portefeuille ALIFFA Startup",
            exp_1_p: "Augmentation de 15% de l'efficacité fiscale et accélération de 40% de la préparation à l'audit en tant que CFO/CTO.",
            exp_2_title: "Automatisation Comptable",
            exp_2_p: "Développement de pipelines ETL réduisant de 90% le temps de vérification manuelle des rapprochements bancaires.",
            exp_3_title: "Synthèse Technique",
            exp_3_p: "Fusionner la rigueur IFRS avec l'ingénierie de données via Python pour une fiabilité institutionnelle.",
            exp_status: "Co-Fondateur & CFO/CTO",
            proj_1_eyebrow: "COMPTABILITÉ · AUTOMATISATION",
            proj_1_title: "Pipeline de Rapprochement Bancaire",
            proj_1_p: "Système de rapprochement automatisé pour les comptes bancaires marocains (BAM, Attijari, BCP) réduisant la vérification manuelle de 90% via Python.",
            proj_2_eyebrow: "DATA SCIENCE · FINANCE",
            proj_2_title: "Bot de Marché Sentiment-IA",
            proj_2_p: "Bot NLP surveillant la Bourse de Casablanca (MASI/MSI20), filtrant le sentiment des actualités financières marocaines (Medias24, L'Economiste).",
            proj_3_eyebrow: "FINANCE · STRATÉGIE FISCALE",
            proj_3_title: "Étude d'Impact Fiscal des Entreprises",
            proj_3_p: "Analyse complète des dernières Lois de Finances marocaines (DGI), centrée sur les réformes IS/TVA pour le marché marocain.",
            proj_4_eyebrow: "IA · MULTIMODAL",
            proj_4_title: "Système de Recommandation Profonde",
            proj_4_p: "Moteur de recommandation pour l'appariement personnalisé de produits financiers marocains (épargne, crédit PME) basé sur les tendances du HCP.",
            proj_view_arch: "Consulter l'Architecture →",
            skills_eyebrow: "ARSENAL TECHNIQUE",
            skills_h2: "Infrastructure <em>Technique</em>",
            skills_g1: "Programmation",
            skills_g2: "Données & BI",
            skills_g3: "Finance & Comptabilité",
            skills_g4: "IA & Stratégie",
            skills_g5: "Modélisation Financière et d'Évaluation",
            skills_g6: "Cloud, ERP et Infrastructure",
            skill_excel: "VBA / Excel",
            skill_modeling: "Modélisation Financière",
            skill_tax: "Planification Fiscale (Droit Marocain)",
            skill_politics: "Compréhension Politique et Géopolitique",
            skill_critical: "Pensée Critique et Analyse",
            skill_comm: "Communication Stratégique",
            contact_lead: "Que vous soyez un investisseur institutionnel, un partenaire de recrutement, ou en train de construire quelque chose à l'intersection de la finance et de l'IA — je veux vous entendre.",
            contact_avail: "Actuellement disponible pour des opportunités à temps plein ou des missions de conseil",
            cta_h2: "Bâtissons l'<em>Avenir de la Finance</em>",
            cta_p: "Ouvert aux collaborations en ingénierie des données, analyse financière et recherche en IA.",
            cta_location: "Meknès, Maroc",
            back_to_projects: "Retour aux Projets ←",
            detail_h_challenge: "Le Défi",
            detail_h_solution: "La Solution",
            de            proj_f_long_p1: "Cette plateforme critique gère des données financières à haute vélocité du secteur bancaire marocain et du CMI...",
            proj_f_challenge: "Le développement de modèles de fraude pour le Maroc nécessite l'intégration des spécificités locales et des directives de Bank Al-Maghrib.",
            proj_f_solution: "Nous avons déployé des modèles XGBoost atteignant 91% de précision, couplés aux indicateurs du HCP pour affiner les recommandations financières locales.",
            proj_f_conclusion: "La plateforme prouve que l'IA peut transformer le paysage fintech marocain en intelligence actionnable.",
            proj_1_long_p1: "Le rapprochement bancaire au Maroc est souvent complexifié par des formats disparates et la gestion du Dirham (MAD).",
            proj_1_challenge: "Le traitement manuel d'Attijari, BCP et BMCE créait des goulots d'étranglement majeurs lors des clôtures au Maroc.",
            proj_1_solution: "J'ai développé un algorithme de correspondance floue automatisant 90% du processus pour les relevés bancaires marocains.",
            proj_1_conclusion: "Le pipeline a transformé la clôture pour les PME locales, prouvant la valeur de l'automatisation Python localisée.",
            proj_2_long_p1: "Ce bot IA surveille la Bourse de Casablanca (MASI) et l'actualité économique marocaine en temps réel.",
            proj_2_challenge: "Suivre le sentiment sur Medias24 et L'Economiste manuellement est impossible pour un trading MASI actif.",
            proj_2_solution: "J'ai construit un pipeline NLP affiné pour le français et l'arabe financier marocain pour prévoir les tendances de la place de Casablanca.",
            proj_2_conclusion: "Le bot extrait avec succès des signaux alpha du paysage médiatique financier marocain.",
            proj_3_long_p1: "Cette étude analyse l'impact des réformes de la Loi de Finances marocaine (DGI) pour les entreprises.",
            proj_3_challenge: "Naviguer dans les circulaires de la DGI et les réformes IS/TVA est crucial pour tout investisseur au Maroc.",
            proj_3_solution: "J'ai développé un cadre de diagnostic évaluant les scénarios basés sur la nouvelle Charte de l'Investissement.",
            proj_3_conclusion: "L'étude sert de référence pour l'optimisation fiscale dans l'environnement marocain unique.",
            proj_4_long_p1: "Ce moteur de recommandation apparie les clients marocains avec des produits bancaires et d'assurance locaux.",
            proj_4_challenge: "L'appariement au comportement du consommateur marocain nécessite un contexte démographique profond issu du HCP.",
            proj_4_solution: "J'ai développé des réseaux d'intégration profonde utilisant les tendances de consommation du HCP.",
            proj_4_conclusion: "Le système a considérablement amélioré l'engagement pour les services financiers de détail locaux.",projetant les utilisateurs et les produits dans le même espace latent. Cela a permis des recherches de similitude en temps réel.",
            proj_4_role: "Développeur IA Principal",
            proj_4_impact: "Personnalisation Accrue",
            // New keys
            testimonial_text: "\"Le travail de Mohammed et de son équipe n'était pas seulement technique — il était <strong>générationnel</strong> dans le paysage financier du Maroc.\"",
            testimonial_author: "\u2014 De la part des Mentors et Arbitres officiels",
            contact_eyebrow: "OUVERT AUX OPPORTUNIT\u00c9S",
            contact_h2: "Construisons <em>Quelque Chose de R\u00e9el</em>",
            contact_resume_en: "T\u00e9l\u00e9charger le CV (EN)",
            contact_resume_fr: "T\u00e9l\u00e9charger le CV (FR)",
            contact_case_study: "Voir le PDF de l'\u00e9tude",
            contact_location: "Mekn\u00e8s, Maroc \u00b7 Disponible \u00e0 Distance",
            footer_role: "Analyste Financier &amp; de Donn\u00e9es \u00b7 D\u00e9veloppeur IA",
            footer_location: "Mekn\u00e8s, Maroc",
            nav_about_short: "About",
            nav_experience_short: "Exp\u00e9rience",
            nav_projects_short: "Projets",
            nav_skills_short: "Comp\u00e9tences",
            nav_contact_short: "Contact",
            detail_h_methodology: "M\u00e9thodologie",
            proj_f_role: "Ing\u00e9nieur IA/ML \u00b7 Risque FinTech & Personnalisation",
            proj_f_impact: "91% de pr\u00e9cision \u00b7 +8% de profondeur de session",
            view_github_profile: "Voir le profil GitHub",
            market_fit_eyebrow: "OBJECTIF CARRIÈRE",
            market_fit_h2: "Alignement Marché",
            market_card_1_h: "Analytique Big 4 & Audit",
            market_card_1_l1: "Automatisation d'audit IA (Omnia / Halo / Clara)",
            market_card_1_l2: "Analyse de données financières & BI",
            market_card_1_l3: "Conseil en technologie fiscale",
            market_card_1_l4: "Reporting ESG & Assurance",
            market_card_1_l5: "Conseil en transformation financière",
            market_card_2_h: "Banque d'investissement & Fintech",
            market_card_2_l1: "Analyse des risques & Détection de fraude",
            market_card_2_l2: "Data Science des produits financiers",
            market_card_2_l3: "Support modélisation financière M&A",
            market_card_2_l4: "Ingénierie de données alternatives",
            market_card_2_l5: "Automatisation FP&A & Prévisions",
            market_card_3_h: "Finance quantitative & Recherche",
            market_card_3_l1: "Analyse de données quantitatives",
            market_card_3_l2: "Ingénierie des signaux de sentiment",
            market_card_3_l3: "Systèmes de recommandation financière",
            market_card_3_l4: "Prototypage de modèles factoriels ML",
            market_card_3_l5: "Évaluation de données alternatives"
        },
        ar: {
            nav_about: "من أنا",
            nav_experience: "الخبرة",
            nav_projects: "المشاريع",
            nav_skills: "المهارات",
            nav_contact: "تواصل",
            hero_name_first: "مـحـمد",
            hero_name_last: "الـزهـر",
            hero_eyebrow: "محلل مالي · مهندس ذكاء اصطناعي/بيانات · أتمتة المحاسبة",
            hero_tagline: "هندسة تقاطع النزاهة المحاسبية، وأتمتة بايثون، والذكاء المالي المدعوم بالذكاء الاصطناعي — من المغرب إلى الأسواق العالمية.",
            hero_status: "تحليل نشط",
            about_eyebrow: "الفلسفة",
            about_h2: "تلاقي <em>المنطق ورأس المال</em>",
            about_lead: "سدّ الفجوة بين البيانات الخام والقرارات المصيرية. نهجي يتجاوز التحليل البسيط - يتعلق الأمر بهيكلة الوضوح في عالم من الضجيج المالي.",
            about_p1: "متجذر في الدقة الأكاديمية لـ <strong>جامعة مولاي إسماعيل</strong> ومصقول بصفتي شريكاً مؤسساً ومديراً مالياً وتقنياً لـ <strong>شركة أليفا الناشئة</strong>، أمثل ملفاً نادراً لعام 2026: التكامل بين <strong>النزاهة المحاسبية</strong>، <strong>الأتمتة باستخدام بايثون</strong>، و <strong>هندسة الذكاء الاصطناعي</strong>.",
            about_p2: "من هندسة مسارات مطابقة الحسابات البنكية الآلية التي تلغي 95٪ من الأخطاء اليدوية، إلى بناء مصنفات احتيال بدقة 91٪ — كل مشروع أقوم ببنائه معايَر وفقاً لمعايير الشركات الكبرى. ميزتي: <strong>المعرفة بالمجال المالي التي تمنح الكود معنى حقيقياً</strong>.",
            about_s1: "الرؤية الاستراتيجية",
            about_s2: "العمق التقني",
            about_s3: "الدقة المالية",
            projects_eyebrow: "أعمال مختارة",
            projects_h2: "تميز <em>المحفظة</em>",
            proj_f_p: "مصنف احتيال XGBoost مخصص لبيانات المعاملات المغربية (CMI) بدقة 91٪ - مدمج مع نظام توصية مالي يعتمد على مؤشرات المندوبية السامية للتخطيط (HCP) وبنك المغرب (BAM).",
            exp_eyebrow: "التأثير المهني",
            exp_h2: "ميزات <em>تنافسية</em>",
            exp_1_title: "محفظة شركة أليفا",
            exp_1_p: "تحقيق زيادة بنسبة 15٪ في الكفاءة الضريبية وتسريع الجاهزية للتدقيق بنسبة 40٪ خلال منصبي كمدير مالي وتقني.",
            exp_2_title: "أتمتة المحاسبة",
            exp_2_p: "تطوير مسارات ETL مخصصة قللت من وقت التحقق اليدوي من مطابقة الحسابات البنكية بنسبة 90٪.",
            exp_3_title: "التكامل التقني",
            exp_3_p: "الربط بين معايير التقارير المالية الدولية (IFRS) وهندسة البيانات باستخدام لغة بايثون لضمان موثوقية مؤسسية.",
            exp_status: "مؤسس مشارك ومدير مالي وتقني",
            proj_1_eyebrow: "المحاسبة · الأتمتة",
            proj_1_title: "مسار مطابقة الحسابات البنكية",
            proj_1_p: "نظام مطابقة مؤتمت للحسابات البنكية المغربية (بنك المغرب، التجاري، الشعبي) يقلل التحقق اليدوي بنسبة 90٪ باستخدام بايثون المخصصة للتعامل مع الدرهم المغربي.",
            back_to_projects: "الرجوع للمشاريع ←",
            detail_h_challenge: "التحدي",
            detail_h_solution: "الحل",
            proj_1_long_p1: "تعد مطابقة الحسابات البنكية اليدوية بطيئة وعرضة للأخطاء...",
            proj_1_challenge: "كانت معالجة آلاف المعاملات يدوياً تخلق عائقاً...",
            proj_1_solution: "قمنا بتطوير خوارزمية مطابقة مخصصة تستخدم المنطق الضبابي...",
            proj_1_conclusion: "حول خط الإنتاج المؤتمت عملية الإغلاق الشهري...",
            proj_1_long_p1: "غالباً ما يكون تقريب الحسابات البنكية في المغرب معقداً بسبب تنوع التنسيقات وإزاحة العملة (MAD).",
            proj_1_challenge: "كانت معالجة معاملات بنوك التجاري، الشعبي، والبنك المغربي للتجارة الخارجية يدوياً تخلق عوائق ضخمة خلال الإغلاق الشهري.",
            proj_1_solution: "طورت خوارزمية مطابقة مخصصة قللت 90٪ من العمل اليدوي للكشوف البنكية المغربية.",
            proj_1_conclusion: "حول المسار الآلي عملية الإغلاق للمقاولات الصغرى والمتوسطة المحلية، مما أثبت قيمة أتمتة بايثون المحلية.",
            proj_1_role: "مهندس أتمتة",
            proj_1_impact: "تقليل العمل اليدوي بنسبة 90٪",
            proj_2_long_p1: "يراقب هذا البوت بورصة الدار البيضاء (MASI) والأخبار الاقتصادية المغربية في الوقت الفعلي.",
            proj_2_challenge: "متابعة المشاعر في Medias24 وL'Economiste يدوياً مستحيل للتداول النشط في MASI.",
            proj_2_solution: "بنيت نظام NLP مطور للفرنسية والعربية المالية المغربية للتنبؤ باتجاهات سوق الدار البيضاء.",
            proj_2_role: "باحث في الذكاء الاصطناعي",
            proj_2_impact: "تحليل أخبار مؤتمت",
            proj_3_long_p1: "تحلل هذه الدراسة تأثير الإصلاحات الأخيرة في قانون المالية المغربي (DGI) للشركات.",
            proj_3_challenge: "يعد التنقل في دوريات المديرية العامة للضرائب وإصلاحات الضريبة على الشركات أمراً حاسماً لأي مستثمر في المغرب.",
            proj_3_solution: "طورت إطار تشخيص يقيم السيناريوهات بناءً على ميثاق الاستثمار المغربي الجديد.",
            proj_3_role: "مستشار مالي",
            proj_3_impact: "وضوح الاستثمار الاستراتيجي",
            proj_4_long_p1: "يطابق محرك التوصية هذا العملاء المغاربة مع المنتجات البنكية والتأمينية المحلية.",
            proj_4_challenge: "تتطلب مطابقة المنتجات لسلوك المستهلك المغربي سياقاً ديموغرافياً عميقاً من المندوبية السامية للتخطيط (HCP).",
            proj_4_solution: "طورت شبكات تضمين عميق تدمج اتجاهات استهلاك HCP مع القدرة على تحمل المخاطر.",
            proj_4_role: "مطور ذكاء اصطناعي رئيسي",
            proj_4_impact: "تعزيز التخصيص الشخصي",
            // New keys
            testimonial_text: "\"العمل الذي أنجزه محمد وفريقه لم يكن تقنياً فحسب — بل كان <strong>جيلياً</strong> في المشهد المالي المغربي.\"",
            testimonial_author: "\u2014 من المشرفين والمحكمين الرسميين",
            contact_eyebrow: "\u0645\u0646\u0641\u062a\u062d \u0644\u0644\u0641\u0631\u0635",
            contact_h2: "\u0644\u0646\u0628\u0646\u064a <em>\u0634\u064a\u0626\u0627\u064b \u062d\u0642\u064a\u0642\u064a\u0627\u064b</em>",
            contact_resume_en: "\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0633\u064a\u0631\u0629 (EN)",
            contact_resume_fr: "\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0633\u064a\u0631\u0629 (FR)",
            contact_case_study: "\u0639\u0631\u0636 \u0645\u0644\u0641 \u062f\u0631\u0627\u0633\u0629 \u0627\u0644\u062d\u0627\u0644\u0629",
            contact_location: "\u0645\u0643\u0646\u0627\u0633\u060c \u0627\u0644\u0645\u063a\u0631\u0628 \u00b7 \u0645\u062a\u0627\u062d \u0639\u0646 \u0628\u064f\u0639\u062f",
            footer_role: "\u0645\u062d\u0644\u0644 \u0645\u0627\u0644\u064a &amp; \u0628\u064a\u0627\u0646\u0627\u062a \u00b7 \u0645\u0637\u0648\u0631 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064a",
            footer_location: "\u0645\u0643\u0646\u0627\u0633\u060c \u0627\u0644\u0645\u063a\u0631\u0628",
            nav_about_short: "\u0645\u0646 \u0623\u0646\u0627",
            nav_experience_short: "\u0627\u0644\u062e\u0628\u0631\u0629",
            nav_projects_short: "\u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639",
            nav_skills_short: "\u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062a",
            nav_contact_short: "\u062a\u0648\u0627\u0635\u0644",
            detail_h_methodology: "\u0627\u0644\u0645\u0646\u0647\u062c\u064a\u0629",
            proj_f_role: "\u0645\u0647\u0646\u062f\u0633 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064a/\u062a\u0639\u0644\u0645 \u0622\u0644\u064a \u00b7 \u0645\u062e\u0627\u0637\u0631 \u0627\u0644\u0641\u064a\u0646\u062a\u0643 \u0648\u0627\u0644\u062a\u062e\u0635\u064a\u0635",
            proj_f_impact: "\u062f\u0642\u0629 91% \u00b7 \u0632\u064a\u0627\u062f\u0629 +8% \u0641\u064a \u0639\u0645\u0642 \u0627\u0644\u062c\u0644\u0633\u0629",
            view_github_profile: "\u0639\u0631\u0636 \u0645\u0644\u0641 GitHub",
            proj_2_eyebrow: "\u0639\u0644\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u00b7 \u0627\u0644\u0645\u0627\u0644\u064a\u0629",
            proj_2_title: "\u0628\u0648\u062a \u0633\u0648\u0642 \u0627\u0644\u0645\u0634\u0627\u0639\u0631-\u0630\u0643\u0627\u0621",
            proj_2_p: "\u0628\u0648\u062a \u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0637\u0628\u064a\u0639\u064a\u0629 \u0644\u062a\u0635\u0641\u064a\u0629 \u0645\u0634\u0627\u0639\u0631 \u0627\u0644\u0633\u0648\u0642 \u0645\u0646 \u0645\u0635\u0627\u062f\u0631 \u0627\u0644\u0623\u062e\u0628\u0627\u0631 \u0644\u0644\u062a\u0646\u0628\u0624 \u0628\u0627\u0644\u0627\u062a\u062c\u0627\u0647\u0627\u062a.",
            proj_3_eyebrow: "\u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u00b7 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0627\u0644\u0636\u0631\u064a\u0628\u064a\u0629",
            proj_3_title: "\u062f\u0631\u0627\u0633\u0629 \u062a\u0623\u062b\u064a\u0631 \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a",
            proj_3_p: "\u062a\u062d\u0644\u064a\u0644 \u0634\u0627\u0645\u0644 \u0644\u0644\u0623\u0637\u0631 \u0627\u0644\u0636\u0631\u064a\u0628\u064a\u0629 \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629 \u0644\u062a\u062e\u0637\u064a\u0637 \u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0627\u0644\u0645\u0624\u0633\u0633\u064a.",
            proj_4_eyebrow: "\u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064a \u00b7 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0623\u0648\u0636\u0627\u0639",
            proj_4_title: "\u0646\u0638\u0627\u0645 \u062a\u0648\u0635\u064a\u0629 \u0639\u0645\u064a\u0642",
            proj_4_p: "\u0645\u062d\u0631\u0643 \u062a\u0648\u0635\u064a\u0629 \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0645\u062a\u062c\u0647\u0627\u062a \u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0634\u062e\u0635\u064a\u0629 \u0644\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629."
        }
    };

    function switchLanguage(lang) {
        const data = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (data[key]) {
                el.innerHTML = data[key];
            }
        });

        // Handle direction and language attribute
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update active button state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        localStorage.setItem('preferred_lang', lang);
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
