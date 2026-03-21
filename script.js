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
            hero_tagline: "Engineering the intersection of Accounting Integrity, Python Automation, and AI-Driven Financial Intelligence.",
            hero_status: "Active Analysis",
            about_eyebrow: "THE PHILOSOPHY",
            about_h2: "The Convergence of <em>Logic & Capital</em>",
            about_lead: "Bridging the gap between raw data and monumental decisions. My approach transcends simple analysis—it is about architecting clarity in a world of financial noise.",
            about_p1: "Rooted in the academic precision of <strong>Université Moulay Ismail</strong> and forged in the high-stakes environment of <strong>ALIFFA Startup</strong>, my work represents a rare synthesis of <strong>Accounting Integrity</strong> and <strong>AI-Driven Innovation</strong>.",
            about_p2: "As a Co-founder and CFO/CTO, I don't just build models; I engineer strategic advantages. From national finals to elite-level tax optimization, my mission is to deliver the technical certainty the global market demands.",
            about_s1: "Strategic Vision",
            about_s2: "Technical Depth",
            about_s3: "Fiscal Precision",
            projects_eyebrow: "SELECTED WORKS",
            projects_h2: "Portfolio <em>Excellence</em>",
            proj_f_eyebrow: "FEATURED · FINTECH & AI",
            proj_f_title: "Fintech & AI Analytics Engine",
            proj_f_p: "XGBoost fraud classifier achieving 91% precision with 30% false-positive reduction on live transaction data — combined with a Transformer-based financial product recommender that lifted session depth 8%. Stack: Python · PyTorch · XGBoost · PostgreSQL · Docker · AWS.",
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
            proj_1_p: "Automated reconciliation system reducing manual verification by 90% using custom Python logic.",
            proj_2_eyebrow: "DATA SCIENCE · FINANCE",
            proj_2_title: "Sentiment-AI Market Bot",
            proj_2_p: "Natural Language Processing bot filtering market sentiment from news feeds to forecast trends.",
            proj_3_eyebrow: "FINANCE · TAX STRATEGY",
            proj_3_title: "Corporate Tax Impact Study",
            proj_3_p: "Comprehensive analysis of Moroccan fiscal frameworks for institutional investment planning.",
            proj_4_eyebrow: "AI · MULTI-MODAL",
            proj_4_title: "Deep Recommender System",
            proj_4_p: "Multi-vector recommendation engine for personalized financial product matching.",
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
            proj_f_long_p1: "This mission-critical platform was engineered to handle high-velocity financial data...",
            proj_f_challenge: "Financial institutions often struggle with fragmented data...",
            proj_f_solution: "We deployed a series of neural networks...",
            proj_f_conclusion: "The platform now serves as the backbone for strategic asset allocation...",
            method_1_h: "Discovery & Data Audit",
            method_1_p: "Identified critical data bottlenecks...",
            method_2_h: "Model Engineering",
            method_2_p: "Developed and stress-tested various LSTM architectures...",
            method_3_h: "Pipeline Integration",
            method_3_p: "Built high-concurrency ETL processes...",
            proj_1_long_p1: "Manual bank reconciliation is slow and error-prone...",
            proj_1_challenge: "Processing thousands of transactions manually was creating a bottleneck...",
            proj_1_solution: "We developed a custom matching algorithm using fuzzy logic to automate 90% of the verification process.",
            proj_1_conclusion: "The automated pipeline has transformed the monthly closing process...",
            method_1_h_1: "Data Extraction",
            method_1_p_1: "Automated retrieval of statements from banking APIs...",
            method_2_h_1: "Fuzzy Matching Logic",
            method_2_p_1: "Implemented Levenshtein distance algorithms...",
            method_3_h_1: "Exception Reporting",
            method_3_p_1: "Developed a dashboard to isolate unmatched entries...",
            proj_2_long_p1: "This AI bot monitors financial news in real-time...",
            proj_2_challenge: "Massive volumes of news are published every second...",
            proj_2_solution: "We built an NLP pipeline using transformer models...",
            proj_2_conclusion: "The bot successfully automates the first layer of market sentiment analysis...",
            method_1_h_2: "News Ingestion",
            method_1_p_2: "Designed a real-time scraper for Reuters and Twitter...",
            method_2_h_2: "NLP Classification",
            method_2_p_2: "Fine-tuned a FinBERT model for financial nuances...",
            method_3_h_2: "Signal Generation",
            method_3_p_2: "Calculated weighted sentiment scores for signals...",
            proj_3_long_p1: "This study analyzes the fiscal landscape for corporations in Morocco...",
            proj_3_challenge: "Navigating Moroccan tax laws is complex for foreign investors...",
            proj_3_solution: "I developed a diagnostic framework that evaluates tax scenarios...",
            proj_3_conclusion: "The study served as a key reference for institutional tax planning...",
            method_1_h_3: "Contextual Analysis",
            method_1_p_3: "Mapped reforms in the Moroccan Finance Law...",
            method_2_h_3: "Risk Quantification",
            method_2_p_3: "Modeled potential fiscal liabilities in Excel...",
            method_3_h_3: "Strategic Roadmap",
            method_3_p_3: "Delivered prioritized compliance actions...",
            proj_4_long_p1: "This recommendation engine matches customers with financial products...",
            proj_4_challenge: "Traditional schemes are often too rigid for nuanced needs...",
            proj_4_solution: "I developed an architecture based on deep embedding networks...",
            proj_4_conclusion: "The system has fundamentally improved customer engagement...",
            method_1_h_4: "Embedding Design",
            method_1_p_4: "Built an auto-encoder to compress user features...",
            method_2_h_4: "Vector Search Integration",
            method_2_p_4: "Implemented FAISS for similarity lookups...",
            method_3_h_4: "A/B Validation",
            method_3_p_4: "Tested against collaborative filtering baselines, achieving a 20% higher conversion rate.",
            // New keys
            testimonial_text: "\"The work Mohammed and his team produced wasn't just technical\u2014it was <strong>generational</strong> in Morocco's financial landscape.\"",
            testimonial_author: "\u2014 From official Mentors &amp; Referees",
            contact_eyebrow: "OPEN TO OPPORTUNITIES",
            contact_h2: "Let's Build <em>Something Real</em>",
            contact_location: "Mekn\u00e8s, Morocco \u00b7 Available Remotely",
            footer_role: "Financial &amp; Data Analyst \u00b7 AI Developer",
            footer_location: "Mekn\u00e8s, Morocco",
            nav_about_short: "About",
            nav_projects_short: "Projects",
            nav_skills_short: "Skills",
            nav_contact_short: "Contact",
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
            nav_about: "À propos",
            nav_experience: "Expérience",
            nav_projects: "Projets",
            nav_skills: "Compétences",
            nav_contact: "Contact",
            hero_name_first: "MOHAMMED",
            hero_name_last: "EZZAHAR",
            hero_eyebrow: "Analyste Financier · Ingénieur IA/Data · Automatisation Comptable",
            hero_tagline: "Ingénierie à l'intersection de l'intégrité comptable, de l'automatisation Python et de l'intelligence financière pilotée par l'IA.",
            hero_status: "Analyse Active",
            about_eyebrow: "LA PHILOSOPHIE",
            about_h2: "La Convergence de la <em>Logique et du Capital</em>",
            about_lead: "Combler le fossé entre les données brutes et les décisions monumentales. Mon approche transcende l'analyse simple—elle consiste à architecturer la clarté dans un monde de bruit financier.",
            about_p1: "Ancré dans la précision académique de l'<strong>Université Moulay Ismaïl</strong> et forgé dans l'environnement à enjeux élevés de la <strong>Startup ALIFFA</strong>, mon travail représente une synthèse rare d'<strong>Intégrité Comptable</strong> et d'<strong>Innovation Guidée par l'IA</strong>.",
            about_p2: "En tant que co-fondateur et CFO/CTO, je ne me contente pas de construire des modèles ; j'ingénie des avantages stratégiques. Des finales nationales à l'optimisation fiscale d'élite, ma mission est de fournir la certitude technique qu'exige le marché mondial.",
            about_s1: "Vision Stratégique",
            about_s2: "Profondeur Technique",
            about_s3: "Précision Fiscale",
            projects_eyebrow: "TRAVAUX SÉLECTIONNÉS",
            projects_h2: "Excellence du <em>Portfolio</em>",
            proj_f_eyebrow: "VEDETTE · FINTECH & IA",
            proj_f_title: "Moteur d'Analyse Fintech & IA",
            proj_f_p: "Classificateur de fraude XGBoost atteignant 91% de précision avec une réduction de 30% des faux positifs — combiné à un système de recommandation financière basé sur les Transformeurs.",
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
            proj_1_p: "Système de rapprochement automatisé réduisant la vérification manuelle de 90% via des scripts Python personnalisés.",
            proj_2_eyebrow: "DATA SCIENCE · FINANCE",
            proj_2_title: "Bot de Marché Sentiment-IA",
            proj_2_p: "Bot de traitement du langage naturel filtrant le sentiment du marché pour prévoir les tendances.",
            proj_3_eyebrow: "FINANCE · STRATÉGIE FISCALE",
            proj_3_title: "Étude d'Impact Fiscal des Entreprises",
            proj_3_p: "Analyse complète des cadres fiscaux marocains pour la planification des investissements institutionnels.",
            proj_4_eyebrow: "IA · MULTIMODAL",
            proj_4_title: "Système de Recommandation Profonde",
            proj_4_p: "Moteur de recommandation multi-vecteurs pour un appariement personnalisé de produits financiers.",
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
            detail_role: "Rôle",
            detail_tech: "Technologies",
            detail_impact: "Impact",
            detail_year: "Année",
            proj_f_long_p1: "Cette plateforme critique a été conçue pour gérer des données financières à haute vélocité, en appliquant des modèles d'apprentissage automatique avancés pour identifier les schémas de risque et optimiser l'allocation d'actifs en temps réel.",
            proj_f_challenge: "Les institutions financières luttent souvent contre des données fragmentées et des signaux de risque retardés. L'objectif était de construire un moteur unifié capable d'ingérer des données multicanaux et de fournir une intelligence exploitable en quelques millisecondes.",
            proj_f_solution: "Nous avons déployé une série de réseaux de neurones spécialisés dans la prévision de séries chronologiques et la détection d'anomalies. En intégrant ces modèles directement dans le pipeline de données, le système a réduit considérablement les faux positifs et amélioré la précision des décisions de 35%.",
            proj_f_role: "Développeur Principal & Analyste",
            proj_f_impact: "Gain d'efficacité de 40%",
            proj_1_long_p1: "Le rapprochement bancaire manuel est lent et sujet aux erreurs. Ce projet consistait à construire un pipeline ETL automatisé utilisant Python pour faire correspondre les transactions entre les relevés bancaires et les registres comptables internes.",
            proj_1_challenge: "Le traitement manuel de milliers de transactions sur plusieurs comptes bancaires créait un goulot d'étranglement lors des clôtures mensuelles. Des descriptions incohérentes et des décalages de dates compliquaient davantage le processus de correspondance.",
            proj_1_solution: "Nous avons développé un algorithme de correspondance personnalisé utilisant la logique floue pour la similitude des descriptions et des fenêtres de dates dynamiques pour l'appariement des transactions. Cela a automatisé 90% du processus de vérification.",
            proj_1_role: "Ingénieur en Automatisation",
            proj_1_impact: "Réduction Manuelle de 90%",
            proj_2_long_p1: "Ce bot IA surveille les actualités financières et le sentiment des médias sociaux en temps réel, utilisant le Traitement du Langage Naturel (NLP) pour évaluer les mouvements potentiels du marché.",
            proj_2_challenge: "Des volumes massifs d'actualités financières sont publiés chaque seconde. Les traders ne peuvent pas traiter cela manuellement pour identifier les changements de sentiment.",
            proj_2_solution: "Nous avons construit un pipeline NLP utilisant des modèles transformeurs pour catégoriser les nouvelles en sentiments haussiers, baissiers ou neutres. Le système agrège ensuite ces signaux par actif.",
            proj_2_role: "Chercheur en IA",
            proj_2_impact: "Analyse Automatisée des Nouvelles",
            proj_3_long_p1: "Cette étude complète analyse le paysage fiscal des entreprises au Maroc, offrant des perspectives sur l'optimisation fiscale et les stratégies de conformité pour les investisseurs institutionnels.",
            proj_3_challenge: "Naviguer dans les lois fiscales marocaines est complexe pour les investisseurs institutionnels. De petits changements législatifs peuvent avoir un impact significatif sur le ROI.",
            proj_3_solution: "J'ai développé un cadre de diagnostic qui évalue les scénarios fiscaux pour divers véhicules d'investissement. Cela a apporté de la clarté sur les incitations fiscales et les structures optimales.",
            proj_3_role: "Consultant Financier",
            proj_3_impact: "Clarté de l'Investissement Stratégique",
            proj_4_long_p1: "Ce moteur de recommandation multi-vecteurs a été conçu pour faire correspondre les clients avec des produits financiers haut de gamme en fonction de leurs données comportementales et de leur historique financier.",
            proj_4_challenge: "Les schémas de recommandation traditionnels sont souvent trop rigides. Le problème était de capturer les relations cachées entre la tolérance au risque, les habitudes de dépense et les objectifs à long terme.",
            proj_4_solution: "J'ai développé une architecture basée sur des réseaux d'intégration profonde, projetant les utilisateurs et les produits dans le même espace latent. Cela a permis des recherches de similitude en temps réel.",
            proj_4_role: "Développeur IA Principal",
            proj_4_impact: "Personnalisation Accrue",
            // New keys
            testimonial_text: "\"Le travail de Mohammed et de son équipe n'était pas seulement technique — il était <strong>générationnel</strong> dans le paysage financier du Maroc.\"",
            testimonial_author: "\u2014 De la part des Mentors et Arbitres officiels",
            contact_eyebrow: "OUVERT AUX OPPORTUNIT\u00c9S",
            contact_h2: "Construisons <em>Quelque Chose de R\u00e9el</em>",
            contact_location: "Mekn\u00e8s, Maroc \u00b7 Disponible \u00e0 Distance",
            footer_role: "Analyste Financier &amp; de Donn\u00e9es \u00b7 D\u00e9veloppeur IA",
            footer_location: "Mekn\u00e8s, Maroc",
            nav_about_short: "\u00c0 propos",
            nav_projects_short: "Projets",
            nav_skills_short: "Comp\u00e9tences",
            nav_contact_short: "Contact",
            proj_2_eyebrow: "DATA SCIENCE \u00b7 FINANCE",
            proj_2_title: "Bot de March\u00e9 Sentiment-IA",
            proj_2_p: "Bot de traitement du langage naturel filtrant le sentiment du march\u00e9 pour pr\u00e9voir les tendances.",
            proj_3_eyebrow: "FINANCE \u00b7 STRAT\u00c9GIE FISCALE",
            proj_3_title: "\u00c9tude d'Impact Fiscal des Entreprises",
            proj_3_p: "Analyse compl\u00e8te des cadres fiscaux marocains pour la planification des investissements institutionnels.",
            proj_4_eyebrow: "IA \u00b7 MULTIMODAL",
            proj_4_title: "Syst\u00e8me de Recommandation Profonde",
            proj_4_p: "Moteur de recommandation multi-vecteurs pour un appariement personnalis\u00e9 de produits financiers."
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
            hero_tagline: "هندسة نقطة تلاقي النزاهة المحاسبية والذكاء المالي المدعوم بالذكاء الاصطناعي.",
            hero_status: "تحليل نشط",
            about_eyebrow: "الفلسفة",
            about_h2: "تلاقي <em>المنطق ورأس المال</em>",
            about_lead: "سدّ الفجوة بين البيانات الخام والقرارات المصيرية. نهجي يتجاوز التحليل البسيط - يتعلق الأمر بهيكلة الوضوح في عالم من الضجيج المالي.",
            about_p1: "متجذر في الدقة الأكاديمية لـ <strong>جامعة مولاي إسماعيل</strong> ومصقول في بيئة المخاطر العالية لـ <strong>شركة أليفا الناشئة</strong>، يمثل عملي تركيبًا نادرًا بين <strong>نزاهة المحاسبة</strong> و <strong>الابتكار المدفوع بالذكاء الاصطناعي</strong>.",
            about_p2: "بصفتي مؤسسًا مشاركًا ومديرًا ماليًا وتقنيًا، أنا لا أبني نماذج فحسب؛ بل أصنع مزايا استراتيجية. من النهائيات الوطنية إلى تحسين الضرائب على مستوى النخبة، مهمتي هي تقديم اليقين التقني الذي يتطلبه السوق العالمي.",
            about_s1: "الرؤية الاستراتيجية",
            about_s2: "العمق التقني",
            about_s3: "الدقة المالية",
            projects_eyebrow: "أعمال مختارة",
            projects_h2: "تميز <em>المحفظة</em>",
            proj_f_eyebrow: "مميز · التكنولوجيا المالية والذكاء الاصطناعي",
            proj_f_title: "محرك تحليلات التكنولوجيا المالية والذكاء الاصطناعي",
            proj_f_p: "XGBoost مصنف احتيال يحقق دقة 91٪ مع تقليل بنسبة 30٪ في الإيجابيات الكاذبة - مدمج مع نظام توصية مالي يعتمد على المحولات.",
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
            proj_1_p: "نظام مطابقة مؤتمت يقلل من التحقق اليدوي بنسبة 90٪ باستخدام لغة بايثون المخصصة.",
            back_to_projects: "الرجوع للمشاريع ←",
            detail_h_challenge: "التحدي",
            detail_h_solution: "الحل",
            proj_1_long_p1: "تعد مطابقة الحسابات البنكية اليدوية بطيئة وعرضة للأخطاء...",
            proj_1_challenge: "كانت معالجة آلاف المعاملات يدوياً تخلق عائقاً...",
            proj_1_solution: "قمنا بتطوير خوارزمية مطابقة مخصصة تستخدم المنطق الضبابي...",
            proj_1_conclusion: "حول خط الإنتاج المؤتمت عملية الإغلاق الشهري...",
            proj_1_long_p1: "تعد مطابقة الحسابات البنكية اليدوية بطيئة وعرضة للأخطاء. تضمن هذا المشروع بناء تدفق ETL مؤتمت باستخدام بايثون لمطابقة المعاملات بين الكشوف البنكية والسجلات المحاسبية الداخلية.",
            proj_1_challenge: "كانت معالجة آلاف المعاملات عبر حسابات بنكية متعددة يدوياً تخلق عائقاً أثناء الإغلاق الشهري. زاد عدم تناسق الأوصاف وفروق التواريخ من تعقيد عملية المطابقة.",
            proj_1_solution: "قمنا بتطوير خوارزمية مطابقة مخصصة تستخدم المنطق الضبابي لتشابه الأوصاف ونوافذ زمنية ديناميكية لازدواج المعاملات. أدى ذلك إلى أتمتة 90٪ من عملية التحقق.",
            proj_1_role: "مهندس أتمتة",
            proj_1_impact: "تقليل العمل اليدوي بنسبة 90٪",
            proj_2_long_p1: "يقوم هذا البوت المدعوم بالذكاء الاصطناعي بمراقبة الأخبار المالية ومشاعر وسائل التواصل الاجتماعي في الوقت الفعلي، باستخدام معالجة اللغة الطبيعية (NLP) لتقييم تحركات السوق المحتملة.",
            proj_2_challenge: "يتم نشر كميات هائلة من الأخبار المالية كل ثانية. لا يستطيع المتداولون معالجة هذا يدوياً لتحديد التحولات في المشاعر التي قد تؤثر على أسعار الأصول.",
            proj_2_solution: "قمنا ببناء تدفق NLP باستخدام نماذج المحولات لتصنيف الأخبار إلى مشاعر إيجابية أو سلبية أو محايدة. يقوم النظام بعد ذلك بتجميع هذه الإشارات لكل أصل.",
            proj_2_role: "باحث في الذكاء الاصطناعي",
            proj_2_impact: "تحليل أخبار مؤتمت",
            proj_3_long_p1: "تحلل هذه الدراسة الشاملة المنظومة الضريبية للشركات في المغرب، وتقدم رؤى حول تحسين الضرائب واستراتيجيات الامتثال للمستثمرين المؤسسيين.",
            proj_3_challenge: "يعد التنقل في القوانين الضريبية المغربية أمراً معقداً للمستثمرين المؤسسيين. التغييرات الصغيرة في التشريعات يمكن أن يكون لها تأثير كبير على العائد على الاستثمار.",
            proj_3_solution: "قمت بتطوير إطار عمل تشخيصي يقيم السيناريوهات الضريبية لمختلف أوعية الاستثمار. وفر هذا وضوحاً بشأن الحوافز الضريبية والالتزامات المؤجلة والهيكلة المثلى.",
            proj_3_role: "مستشار مالي",
            proj_3_impact: "وضوح الاستثمار الاستراتيجي",
            proj_4_long_p1: "تم بناء محرك التوصية متعدد المتجهات هذا لمطابقة العملاء مع المنتجات المالية الراقية بناءً على بياناتهم السلوكية وتاريخهم المالي.",
            proj_4_challenge: "غالباً ما تكون مخططات التوصية التقليدية جامدة للغاية لاحتياجات العملاء الماليين. كانت المشكلة تكمن في التقاط العلاقات الخفية بين تحمل المخاطر وعادات الإنفاق والأهداف طويلة المدى.",
            proj_4_solution: "قمت بتطوير بنية تعتمد على شبكات التضمين العميق، لعرض المستخدمين والمنتجات في نفس المساحة الكامنة. أدى هذا إلى تمكين عمليات البحث عن التشابه في الوقت الفعلي.",
            proj_4_role: "مطور ذكاء اصطناعي رئيسي",
            proj_4_impact: "تعزيز التخصيص الشخصي",
            // New keys
            testimonial_text: "\"العمل الذي أنجزه محمد وفريقه لم يكن تقنياً فحسب — بل كان <strong>جيلياً</strong> في المشهد المالي المغربي.\"",
            testimonial_author: "\u2014 من المشرفين والمحكمين الرسميين",
            contact_eyebrow: "\u0645\u0646\u0641\u062a\u062d \u0644\u0644\u0641\u0631\u0635",
            contact_h2: "\u0644\u0646\u0628\u0646\u064a <em>\u0634\u064a\u0626\u0627\u064b \u062d\u0642\u064a\u0642\u064a\u0627\u064b</em>",
            contact_location: "\u0645\u0643\u0646\u0627\u0633\u060c \u0627\u0644\u0645\u063a\u0631\u0628 \u00b7 \u0645\u062a\u0627\u062d \u0639\u0646 \u0628\u064f\u0639\u062f",
            footer_role: "\u0645\u062d\u0644\u0644 \u0645\u0627\u0644\u064a &amp; \u0628\u064a\u0627\u0646\u0627\u062a \u00b7 \u0645\u0637\u0648\u0631 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064a",
            footer_location: "\u0645\u0643\u0646\u0627\u0633\u060c \u0627\u0644\u0645\u063a\u0631\u0628",
            nav_about_short: "\u0645\u0646 \u0623\u0646\u0627",
            nav_projects_short: "\u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639",
            nav_skills_short: "\u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062a",
            nav_contact_short: "\u062a\u0648\u0627\u0635\u0644",
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
