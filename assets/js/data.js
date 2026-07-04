/* ==========================================================
   EXPERTISE DATA
   Powers the "Expertise" tab panel (assets right-hand description)
   ========================================================== */
const expertiseData = [
    {
        id: 'cybersecurity',
        name: 'Cybersecurity',
        icon: 'uil uil-shield-check',
        tagline: 'Security-first mindset',
        description: `
            I approach software with a security-first mindset, thinking about how a system could be attacked before it ships.
            My focus includes secure coding practices, authentication and access-control design (JWT, role-based access, password hashing),
            common web vulnerabilities from the OWASP Top 10, and the fundamentals of Identity and Access Management (IAM).

            I study cloud security patterns on Google Cloud, and I'm building habits around threat modelling, input validation,
            and least-privilege design rather than adding security as an afterthought.

            I also care about security awareness: writing code and documentation that make it easy for the next developer,
            or my future self, to keep a system secure.
        `,
        demoLink: '#projects'
    },
    {
        id: 'api-data',
        name: 'API & Data Systems',
        icon: 'uil uil-server',
        tagline: 'Secure server-side flows',
        description: `
            I build server-side systems with Node.js and Express, designing REST APIs, authentication flows, and database
            schemas that hold up under real use. My stack includes PostgreSQL and Supabase for structured data, JWT for
            stateless authentication, and bcrypt for password handling.

            I care about clean, modular architecture, with a clear separation between routes, controllers,
            services, and middleware, so systems stay maintainable as they grow.

            Recent API work includes role-based access control, application-review workflows, and certificate
            verification systems for mentorship and training workflows.
        `,
        demoLink: '#projects'
    },
    {
        id: 'secureapps',
        name: 'Secure Web & Mobile Apps',
        icon: 'uil uil-mobile-android-alt',
        tagline: 'Flutter, React & Next.js',
        description: `
            On the client side, I build with React, Next.js, and Flutter, focused on responsive interfaces and secure
            user flows rather than visual trends. That means proper input validation, safe handling of tokens and
            sessions, and interfaces that fail safely.

            I've built multi-step registration flows, role-aware dashboards, and lab and quiz interfaces that talk to
            a REST API through authenticated requests.

            UI/UX matters to me only in service of usability and trust, a clean interface that makes the secure path
            the easy path.
        `,
        demoLink: '#projects'
    },
    {
        id: 'aicloud',
        name: 'AI + Cloud Security Learning',
        icon: 'uil uil-cloud-shield',
        tagline: 'Cloud, IAM & automation',
        description: `
            I'm actively building cloud fundamentals on Google Cloud: IAM, monitoring, and secure service configuration,
            alongside a growing interest in AI-assisted security tooling and automation.

            This is a deliberately continuous-learning track, made up of labs, guided courses, and small automation
            projects rather than finished production systems, aimed at building real competence in cloud security
            and applied AI over time.
        `,
        demoLink: '#projects'
    }
];


/* ==========================================================
   PROJECTS DATA
   Real, verifiable work only. No fake demo/GitHub links -
   the project card renderer hides those buttons when a link
   isn't provided instead of pointing to "#".
   ========================================================== */
const projectsData = [
    {
        id: 1,
        type: "cybersecurity",
        title: "Secure Authentication & Access-Control System",
        description: "A vetted-signup and login system for a mentorship workflow: applications are reviewed and approved before an account can be activated, passwords are hashed with bcrypt, sessions run on short-lived JWTs, and role-based middleware gates every sensitive route.",
        tech: ["Node.js", "Express 5", "JWT", "bcrypt", "Supabase (PostgreSQL)"],
        icon: "uil uil-shield-check",
        demoLink: "",
        githubLink: ""
    },
    {
        id: 2,
        type: "api-data",
        title: "Mentorship Workflow REST API",
        description: "A modular REST API covering application review, role-aware access, mentorship-session booking, lab submission review, and certificate verification, built with a clear routes/controllers/services separation for maintainability.",
        tech: ["Express 5", "PostgreSQL", "Supabase", "REST"],
        icon: "uil uil-server-network",
        demoLink: "",
        githubLink: ""
    },
    {
        id: 3,
        type: "fullstack",
        title: "Mentorship Application Portal",
        description: "A student- and admin-facing single-page app with role-aware dashboards, a multi-step application form, lab-submission flow, quiz module, and authenticated API requests.",
        tech: ["React 19", "Vite 7", "React Router v7", "Axios", "Framer Motion"],
        icon: "uil uil-window-grid",
        demoLink: "",
        githubLink: ""
    },
    {
        id: 4,
        type: "mobile-web",
        title: "Personal Portfolio Website",
        description: "This site: a fast, animated one-page portfolio built with vanilla HTML, CSS, and JavaScript, featuring scroll-reveal animations, a typed-text hero, filterable project and certification sections, and semantic, SEO-ready markup.",
        tech: ["HTML5", "CSS3", "JavaScript", "ScrollReveal", "Typed.js"],
        icon: "uil uil-desktop",
        demoLink: "",
        githubLink: ""
    },
    {
        id: 5,
        type: "cybersecurity",
        title: "Cybersecurity Awareness Resource Hub",
        description: "A practical content hub concept for CyberNurdin that organizes security basics, safe-account habits, threat-awareness notes, and beginner-friendly guidance into a clean web experience.",
        tech: ["Security Awareness", "Web Content", "UX Writing", "CyberNurdin"],
        icon: "uil uil-shield-exclamation",
        demoLink: "https://cybernurdin.com",
        githubLink: ""
    },
    {
        id: 6,
        type: "ai-cloud",
        title: "Cloud Security & IAM Lab Practice",
        description: "Hands-on learning labs focused on least-privilege access, IAM roles, cloud monitoring, and AI-assisted security research workflows for stronger cloud-security fundamentals.",
        tech: ["Cloud Security", "IAM", "Monitoring", "AI Research"],
        icon: "uil uil-cloud-shield",
        demoLink: "",
        githubLink: ""
    }
];


/* ==========================================================
   CERTIFICATIONS DATA
   Verified public credentials linked to Credly where available.
   ========================================================== */
const certificatesData = [
    {
        id: 1,
        title: "Technical Introduction to Cybersecurity 3.0",
        issuer: "Fortinet",
        year: "Issued Jun 17, 2026",
        category: "cybersecurity",
        status: "completed",
        image: "https://images.credly.com/images/eb17d3c5-12f5-4be9-87b5-a6ccff62a22b/blob",
        credentialUrl: "https://www.credly.com/badges/bdb7a462-835a-4229-927c-6a0927d9ad93"
    },
    {
        id: 2,
        title: "Fortinet Certified Fundamentals Cybersecurity",
        issuer: "Fortinet",
        year: "Issued Jun 15, 2026",
        category: "cybersecurity",
        status: "completed",
        image: "https://images.credly.com/images/22a0ece5-ff05-4594-8320-25e55e9ae203/image.png",
        credentialUrl: "https://www.credly.com/badges/c732e43e-580a-4c4b-ae50-c060bbdd1a5d"
    },
    {
        id: 3,
        title: "Getting Started in Cybersecurity 3.0",
        issuer: "Fortinet",
        year: "Issued Jun 15, 2026",
        category: "cybersecurity",
        status: "completed",
        image: "https://images.credly.com/images/a27867b1-d64f-4890-b577-89f162015407/blob",
        credentialUrl: "https://www.credly.com/badges/c0eb0132-31ec-4af1-967c-10e525c7132f"
    },
    {
        id: 4,
        title: "Introduction to the Threat Landscape 3.0",
        issuer: "Fortinet",
        year: "Issued Jun 15, 2026",
        category: "cybersecurity",
        status: "completed",
        image: "https://images.credly.com/images/a06a4e98-21bf-49ab-ad70-c61641f26fc8/blob",
        credentialUrl: "https://www.credly.com/badges/357bc90b-5b47-4798-8631-b4febfa6f6c1"
    },
    {
        id: 5,
        title: "Introduction to Cybersecurity",
        issuer: "Cisco",
        year: "Verified on Credly",
        category: "cybersecurity",
        status: "completed",
        image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/linkedin_thumb_I2CS__1_.png",
        credentialUrl: "https://www.credly.com/badges/b1361765-cfd8-4938-aa34-8ff999ce63cc"
    }
];
