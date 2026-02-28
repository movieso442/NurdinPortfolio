const servicesData = [
    {
        id: 'cybersecurity',
        name: 'Cybersecurity',
        icon: 'uil uil-shield-check',
        projectCount: '15 projects',
        description: `
            As a cybersecurity specialist, I focus on protecting digital assets, networks, and systems from unauthorized access, attacks, and vulnerabilities. 
            I am experienced in performing security audits, penetration testing, and implementing robust security protocols to ensure data integrity and confidentiality.

            My expertise includes network security, application security, and incident response. I use industry-standard tools for vulnerability scanning, 
            threat detection, and ethical hacking. I also focus on security awareness and best practices for developers and organizations.

            I have worked on securing web applications, configuring firewalls, and implementing encryption standards. My goal is to stay ahead of 
            emerging threats and provide proactive security solutions that mitigate risks and protect users in an ever-evolving digital landscape.

            Additionally, I focus on compliance standards, security architecture, and continuous monitoring to maintain a high security posture 
            for all digital platforms I work on.
        `,
        demoLink: '#'
    },
    {
        id: 'backend',
        name: 'BackEnd',
        icon: 'uil uil-server',
        projectCount: '08 projects',
        description: `
            I am an experienced backend developer with strong expertise in server-side technologies including PHP, Java, C++, Node.js, and frameworks such as 
            Laravel and Express. I build secure, efficient, and scalable backend systems that form the foundation of high-performing web and mobile applications.

            My skills include database design and management (MySQL, PostgreSQL, MongoDB), RESTful and GraphQL API development, 
            user authentication systems, session management, and cloud integrations. Whether it's designing relational schemas or 
            handling data-heavy operations, my backend logic ensures robustness and reliability.

            I’ve created systems for inventory tracking, order management, CRM, and billing platforms, always focusing on modular code 
            and performance optimization. I use best practices in security, including input validation, encryption, and safe error handling, 
            to protect sensitive data and user privacy.

            I also implement CI/CD pipelines, containerization (Docker), and version control (Git), supporting modern DevOps practices for smoother deployments and code quality assurance.
        `,
        demoLink: '#'
    },
    {
        id: 'frontend',
        name: 'FrontEnd',
        icon: 'uil uil-desktop',
        projectCount: '14 projects',
        description: `
            I am well-versed in HTML, CSS, JavaScript, and jQuery, and I actively use cutting-edge frontend frameworks such as React, Vue, and Tailwind CSS 
            to develop modern, interactive user interfaces. My work prioritizes responsive design, accessibility, and cross-browser compatibility to ensure 
            that every user enjoys a seamless experience across all devices.

            My frontend development approach goes beyond layout and aesthetics. I integrate API services, optimize loading speed, and ensure 
            best SEO practices are followed for visibility. I take pride in turning complex UI/UX wireframes into smooth, pixel-perfect applications.
            My portfolio includes dashboards, landing pages, and e-commerce platforms that not only look stunning but are built for performance and usability.

            Additionally, I focus on reusable component design, mobile-first principles, and continuous improvement through testing and analytics.
            I collaborate closely with designers and product owners to iterate quickly and deliver quality interfaces that solve real-world problems.
        `,
        demoLink: '#'
    },
    {
        id: 'fullstack',
        name: 'Fullstack',
        icon: 'uil uil-apps',
        projectCount: '20 projects',
        description: `
            As a full stack developer, I specialize in building complete, end-to-end digital solutions — from frontend UI/UX to robust backend infrastructure. 
            I combine the best of both worlds, creating cohesive applications using technologies like React, Angular, PHP, Node.js, and Firebase.

            My full stack capabilities allow me to design APIs, manage databases, and write client-side logic while maintaining consistent performance and scalability.
            I develop Single Page Applications (SPAs), admin panels, SaaS dashboards, and business automation tools that are responsive, secure, and user-focused.

            Beyond coding, I handle cloud deployments (AWS, Vercel, Heroku), environment setup, and optimization for mobile and web platforms. 
            I also integrate third-party services such as payment gateways, social auth, and analytics.

            With a strong understanding of MVC/MVVM architectures and agile project management, I can lead or contribute to full product cycles — from ideation to launch.
            I believe in clean code, clear documentation, and collaborative development, making me a reliable contributor to any technical team.
        `,
        demoLink: '#'
    }
];



const projectsData = [
    {
        id: 1,
        type: "frontend",
        title: "Food Delivery App | Modern Restaurant",
        description: "This web page presents a sleek and intuitive frontend for a modern food delivery application and and a focus on visual appeal for a seamless online food ordering experience. The design includes a detailed product page with descriptions, ingredients, and pricing, leading to a streamlined checkout process",
        image: "assets/images/frontend.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 2,
        type: "backend",
        title: "Collaborative Virtual Meeting App",
        description: "This web page is a clean and intuitive frontend and backend  for a modern virtual meeting dashboard. It features a responsive layout designed for easy participant management, video conferencing, and collaborative interactions, available in both dark and light modes.",
        image: "assets/images/stack1.jpg",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 3,
        type: "fullstack",
        title: "Enterprise File Management & E-commerce Platform",
        description: "This App presents a comprehensive full-stack solution as a robust enterprise file management system alongside an integrated e-commerce platform. The frontend features intuitive App  for document organization and online shopping, while the backend supports secure data storage, user authentication, inventory management, and transaction processing.",
        image: "assets/images/stack2.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 4,
        type: "frontend",
        title: "Fashion E-commerce Mobile",
        description: "This web page showcases a vibrant and user-friendly frontend for a modern fashion e-commerce mobile application. It features a rich collection of screens including a personalized homepage, product listings with filters, detailed product views, and a streamlined checkout process, all designed for an engaging shopping experience.",
        image: "assets/images/shop1.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 5,
        type: "backend",
        title: "Luma Modern E-commerce | REACT Web APP",
        description: "This web page showcases Luma, a modern e-commerce frontend and backend built with React, styled using Tailwind CSS. It features a responsive design for both desktop and mobile, offering clean layouts for product displays, category Browse, and a seamless online shopping experience.",
        image: "assets/images/ecommerce.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 6,
        type: "fullstack",
        title: "Shopapay E-commerce App",
        description: "Fullstack e-commerce platform with payment gateway integration.his web page showcases 'Shopapay,' a premium e-commerce app  for both Android and iOS. It provides a comprehensive frontend solution for building a visually appealing and highly functional online shopping application.",
        image: "assets/images/ecommerce2.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 7,
        type: "frontend",
        title: "Responsive Dashboard | Data Visualization & Management",
        description: "This web page with a versatile and responsive frontend user interface for an admin dashboard. It features multiple layouts for desktop, tablet, and mobile, presenting various data visualizations, charts, and management components for efficient monitoring and administration. Built with modern web technologies.",
        image: "assets/images/admin.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 8,
        type: "backend",
        title: "Design Summit Conference Website",
        description: "Data management system with robust API endpoints.This web page showcases a vibrant and engaging frontend user interface  for an event or conference website, specifically for a 'Design Summit.' It features a modern layout with event details, speaker highlights, a countdown timer, all designed to capture attendee interest and provide essential information",
        image: "assets/images/school2.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 9,
        type: "fullstack",
        title: "Mobile App UI/UX Design",
        description: "This is application showcases a diverse collection of mobile app design, highlighting various frontend user interfaces (UI) and user experiences (UX). It features screens from different app categories, demonstrating modern aesthetics, intuitive navigation, and responsive.",
        image: "assets/images/app.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 10,
        type: "frontend",
        title: "Freelancer Portfolio Website | Personal Branding",
        description: "A portfolio website showcasing creative design and smooth animations. This web page showcases a clean and professional frontend user interface (UI) for a personal portfolio website, ideal for a freelancer. It features a modern design with sections for an introduction, about me, services, work examples, and contact information, all crafted to present a strong personal brand and highlight skills",
        image: "assets/images/front3.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 11,
        type: "backend",
        title: "Modern Personal Landing Page UI/UX | Professional Portfolio(Backend)",
        description: "Real-time communication application backend using WebSockets. This web page showcases a vibrant and engaging frontend user interface (UI) for a modern personal or professional landing page. It features a clean layout with sections for introduction, services offered, and portfolio highlights, all designed to effectively present an individual's skills and experience",
        image: "assets/images/front4.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 12,
        type: "fullstack",
        title: "SaaS Dashboard UI/UX | Admin Panel(Fullstack)",
        description: "An online learning platform with user authentication and content delivery.This web page showcases a clean and functional frontend user interface (UI) for a dashboard or admin panel. It features sections for general information, customer management with data insights, and a clear navigation system, all designed for efficient data overview and administrative tasks",
        image: "assets/images/school2.png",
        demoLink: "#",
        githubLink: "#"
    }
];


const galleryItems = [
    {
        id: 1,
        image: "assets/images/defense1.jpg",
        title: "Project Alpha: Web Design",
        description: "A sleek and modern website design for a tech startup, focusing on user experience and clean aesthetics."
    },
    {
        id: 2,
        image: "assets/images/defense2.jpg",
        title: "Graphic Design Series: Branding",
        description: "Conceptual branding project including logo design, color palette, and typography for a fictional cafe."
    },
    {
        id: 3,
        image: "assets/images/defense3.jpg",
        title: "Mobile App UI: Fitness Tracker",
        description: "Intuitive user interface for a fitness tracking mobile application, designed for seamless navigation and data visualization."
    },
    {
        id: 4,
        image: "assets/images/defense4.jpg",
        title: "Digital Illustration: Cityscape",
        description: "Detailed digital illustration depicting a futuristic cityscape at dusk, showcasing atmospheric lighting and intricate details."
    },
    {
        id: 5,
        image: "assets/images/defense5.jpg",
        title: "3D Modeling: Product Prototype",
        description: "A 3D render of a consumer electronics prototype, emphasizing realistic textures and form factor."
    },
    {
        id: 6,
        image: "assets/images/defense6.jpg",
        title: "Photography: Urban Exploration",
        description: "A series of photographs capturing the hidden beauty and forgotten spaces within urban environments."
    }
    // Add more gallery items as needed
];
