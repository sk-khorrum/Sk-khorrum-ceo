export interface FAQItem {
  question: string;
  answer: string;
  category: "marketing" | "development" | "mobile" | "pricing" | "support" | "general";
}

export const faqData: FAQItem[] = [
  // Digital Marketing FAQs
  {
    category: "marketing",
    question: "What digital marketing services do you provide?",
    answer: "I offer a complete suite of performance growth services, including Search Engine Optimization (SEO), Meta Ads (Facebook & Instagram), Google Ads (Search, Display, and YouTube PPC), Sales Funnel Design, Conversion Rate Optimization (CRO), and advanced marketing analytics setup."
  },
  {
    category: "marketing",
    question: "Do you offer SEO services?",
    answer: "Yes, I provide comprehensive SEO services including Technical SEO audits, on-page optimization (meta tags, headings, content structure), off-page authority building, speed optimizations, local SEO setups, and ongoing organic search performance tracking."
  },
  {
    category: "marketing",
    question: "Can you manage Facebook, Instagram, and Google Ads?",
    answer: "Absolutely. I design and manage end-to-end campaigns across Meta (Facebook/Instagram) and Google Ads networks. This includes audience research, pixel and conversions API tracking setup, copywriting, A/B testing, and budget optimization for maximum ROAS."
  },
  {
    category: "marketing",
    question: "How long does SEO take to show results?",
    answer: "Typically, organic SEO improvements begin to show in 3 to 6 months. Initial results depend on keyword competition, current domain authority, and technical optimization status. However, once established, organic traffic provides long-term, compounding ROI."
  },
  {
    category: "marketing",
    question: "Do you provide monthly marketing reports?",
    answer: "Yes. Every client receives a detailed monthly performance report containing key metrics such as CTR, CPC, ROAS, conversion counts, organic traffic growth, and keyword ranking changes, alongside actionable recommendations for the next cycle."
  },
  {
    category: "marketing",
    question: "Can you increase website traffic?",
    answer: "Yes, I use a dual-approach strategy: paid advertising (Meta/Google Ads) for immediate, high-intent traffic spikes, combined with long-term Search Engine Optimization (SEO) to build sustainable, free search engine visibility."
  },
  {
    category: "marketing",
    question: "Do you improve Google rankings?",
    answer: "Yes, by resolving technical website issues, performing thorough keyword mapping, writing search-intent aligned content, and acquiring authoritative backlinks, I help businesses move up to Page 1 on Google search results."
  },
  {
    category: "marketing",
    question: "Do you work with local and international businesses?",
    answer: "Yes, I have helped local businesses establish regional dominance via Local SEO and Google Map optimizations, as well as scaled international brands globally through targeted multi-lingual digital advertising campaign strategies."
  },
  {
    category: "marketing",
    question: "How do you measure campaign success?",
    answer: "Success is measured using concrete business metrics (KPIs) like Cost Per Acquisition (CPA), Return on Ad Spend (ROAS), Lead-to-Customer conversion rates, organic search clicks, and overall net business growth, rather than just vanity metrics."
  },
  {
    category: "marketing",
    question: "Do you create content for social media?",
    answer: "Yes, as part of campaign management, I design ad creatives, social media banners, video snippets, and write highly engaging copies tailored to capture your target audience's attention and prompt action."
  },
  {
    category: "marketing",
    question: "Can you audit my existing marketing strategy?",
    answer: "Yes, I provide a comprehensive marketing audit. I will review your current ad accounts, pixel/tracking setups, SEO performance, landing pages, and funnel logic to identify leaks and opportunities for optimization."
  },
  {
    category: "marketing",
    question: "What industries do you specialize in?",
    answer: "I specialize in scaling E-commerce brands, Software-as-a-Service (SaaS) providers, local service businesses (real estate, medical, professional services), and educational institutions looking to acquire quality leads online."
  },

  // Web Development FAQs
  {
    category: "development",
    question: "What types of websites do you build?",
    answer: "I build a wide range of websites, from creative portfolio landing pages and corporate business websites to complex E-commerce platforms, SaaS web portals, custom dashboards, and blog platforms."
  },
  {
    category: "development",
    question: "Do you create custom websites?",
    answer: "Yes, all my core projects are coded from scratch to ensure outstanding visual originality, optimal page load speeds, clean structures, and scalability, avoiding restrictive pre-made templates."
  },
  {
    category: "development",
    question: "Will my website be mobile responsive?",
    answer: "Absolutely. Mobile responsiveness is non-negotiable. Every website is designed from a mobile-first perspective, ensuring it functions flawlessly and looks premium on all screen sizes, from mobile phones to ultra-wide displays."
  },
  {
    category: "development",
    question: "Is SEO included in web development?",
    answer: "Yes, basic technical SEO is integrated into my development process. This includes setting up meta tags, optimized heading hierarchies, semantic HTML5 layouts, schema markup, and ensuring rapid page speed scores."
  },
  {
    category: "development",
    question: "Which technologies do you use?",
    answer: "I mainly develop using modern frontend frameworks like React and Next.js, combined with Tailwind CSS for layout, Framer Motion and Three.js for interactive animations, and Node.js or serverless architectures for backend logic."
  },
  {
    category: "development",
    question: "Do you integrate payment gateways?",
    answer: "Yes, I regularly integrate standard payment gateways such as Stripe, PayPal, SSLCommerz, and bKash, ensuring fully secure, SSL-encrypted transaction flows for checkout processes."
  },
  {
    category: "development",
    question: "Can you redesign an existing website?",
    answer: "Yes, I can audit your current website and completely rebuild it with a modern visual design, improved navigation structure, significantly faster load times, and better conversion features."
  },
  {
    category: "development",
    question: "Will I be able to edit my website?",
    answer: "Yes. Depending on your project requirements, I can integrate a headless Content Management System (like Sanity, Strapi, or WordPress API) so you can easily update text, images, and blogs without editing code."
  },
  {
    category: "development",
    question: "Do you provide hosting and domain support?",
    answer: "Yes, I will assist you in acquiring your domain and setting up hosting environments. I recommend and configure fast, modern hosts like Vercel, Netlify, AWS, or Hostinger depending on your web app's needs."
  },
  {
    category: "development",
    question: "How long does a website project take?",
    answer: "A standard landing page or simple business site usually takes 1 to 2 weeks. Complex custom web applications, SaaS platforms, or large e-commerce platforms can take 3 to 6 weeks depending on the features."
  },
  {
    category: "development",
    question: "Do you optimize website speed?",
    answer: "Yes, website speed is a critical ranking factor. I optimize page performance by utilizing image compression, code-splitting, lazy-loading assets, caching headers, and hosting files on globally distributed Content Delivery Networks (CDNs)."
  },
  {
    category: "development",
    question: "Will my website be secure?",
    answer: "Yes, I implement secure coding practices including SSL setups, sanitizing user inputs to prevent SQL Injection/XSS, setting up secure headers, CORS policies, and securing API endpoints."
  },

  // Mobile App Development FAQs
  {
    category: "mobile",
    question: "Do you develop Android and iOS apps?",
    answer: "Yes, I build mobile applications that run smoothly on both Android and Apple iOS devices, adhering to platform-specific human interface guidelines."
  },
  {
    category: "mobile",
    question: "Do you build cross-platform apps?",
    answer: "Yes, I specialize in cross-platform development using React Native. This allows us to write a single codebase that deploys natively to both platforms, saving you significant time and development cost."
  },
  {
    category: "mobile",
    question: "Which technologies do you use for app development?",
    answer: "I primarily utilize React Native and Expo for front-end native interfaces, Node.js/Express or FastAPI for the API backend, and PostgreSQL or MongoDB for database architectures."
  },
  {
    category: "mobile",
    question: "Can you publish my app on Google Play and the App Store?",
    answer: "Yes, I manage the entire deployment process, including preparing App Store Connect and Google Play Console credentials, creating assets, writing privacy policies, and submitting the apps for review."
  },
  {
    category: "mobile",
    question: "Do you provide API integration?",
    answer: "Yes, I integrate mobile apps with custom RESTful or GraphQL APIs, as well as third-party APIs (Google Maps, Firebase Authentication, Stripe Payments, social login providers, and push notification systems)."
  },
  {
    category: "mobile",
    question: "Will the app work offline?",
    answer: "Yes, if required, I can design the app to cache critical data locally using SQLite or WatermelonDB, enabling offline access, which then syncs back to the server once internet connection is restored."
  },
  {
    category: "mobile",
    question: "Can you update an existing app?",
    answer: "Yes, I can audit your existing application's codebase, update obsolete packages, resolve bugs, and build new custom features."
  },
  {
    category: "mobile",
    question: "Do you provide maintenance after launch?",
    answer: "Yes, I offer post-launch maintenance packages to monitor server uptime, fix bugs arising from new iOS/Android OS updates, and execute routine security upgrades."
  },
  {
    category: "mobile",
    question: "Is the app scalable?",
    answer: "Yes, the backends are built as modular architectures (microservices or structured MVC) that can scale vertically or horizontally on cloud hosts like AWS or Google Cloud when your user base grows."
  },
  {
    category: "mobile",
    question: "Can you build admin dashboards?",
    answer: "Yes, every custom application includes a secure web-based admin dashboard where administrators can manage users, view analytics, process payments, and modify system settings in real time."
  },

  // Pricing FAQs
  {
    category: "pricing",
    question: "How much does a website cost?",
    answer: "The cost depends on scope. A premium single-page landing page ranges from $300 to $800, a complete business site ranges from $800 to $2,000, and advanced custom web applications/e-commerce platforms start from $2,500+."
  },
  {
    category: "pricing",
    question: "How much does an app cost?",
    answer: "Custom mobile app development pricing starts from $3,000 for a basic utility app, and ranges up to $8,000+ for database-driven apps with real-time updates, chat systems, and payment portals."
  },
  {
    category: "pricing",
    question: "Do you offer custom quotations?",
    answer: "Yes, after a free initial consultation, I will prepare a detailed technical proposal outlining the features, timeline, milestones, and a fixed custom quote tailored to your exact business needs."
  },
  {
    category: "pricing",
    question: "What payment methods do you accept?",
    answer: "I accept international bank wire transfers, Wise, PayPal, Payoneer, and local mobile banking payments (bKash/Rocket/Nagad) for clients based in Bangladesh."
  },
  {
    category: "pricing",
    question: "Do you require an upfront payment?",
    answer: "Yes, I work on a milestone basis. A standard project requires a 30% to 50% upfront retainer deposit to initiate the planning phase, with subsequent payments linked to reviewable milestones."
  },
  {
    category: "pricing",
    question: "Are there any hidden costs?",
    answer: "None. All cost structures (hosting fees, domain purchases, API licensing fees) are detailed clearly in the project contract before we begin work."
  },

  // Support FAQs
  {
    category: "support",
    question: "Do you offer free support after project delivery?",
    answer: "Yes, I provide 30 days of free post-launch support to resolve any unexpected bugs, visual alignment issues, or server setup queries."
  },
  {
    category: "support",
    question: "How can I request revisions?",
    answer: "During the design and development phases, you will be given access to a staging link (or Figma dashboard) where you can leave direct, pinpoint feedback."
  },
  {
    category: "support",
    question: "How quickly do you respond?",
    answer: "I respond to client inquiries within 2 to 4 hours during business hours (Monday to Friday, 9:00 AM to 6:00 PM GMT+6)."
  },
  {
    category: "support",
    question: "Do you provide long-term maintenance?",
    answer: "Yes, I offer monthly retainer agreements covering regular backups, database optimizations, security scanning, and content updating assistance."
  },
  {
    category: "support",
    question: "Can I hire you for ongoing work?",
    answer: "Yes, I work with several clients on a long-term contract basis for ongoing feature development, SEO ranking maintenance, and monthly advertising growth cycles."
  },

  // General FAQs
  {
    category: "general",
    question: "Why should I choose your services?",
    answer: "I combine 5+ years of digital marketing performance experience with frontend coding expertise. This means I build web systems that not only look spectacular but are optimized to rank on Google and convert visitors into paying clients."
  },
  {
    category: "general",
    question: "How do we start a project?",
    answer: "The easiest way is to click the 'Request Project Requirement' button in the bottom right corner of my site and submit a brief. I will review it and get back to you within 24 hours to schedule a consultation."
  },
  {
    category: "general",
    question: "Can we communicate via WhatsApp, Zoom, or Google Meet?",
    answer: "Yes, I schedule video calls via Zoom or Google Meet to align on project requirements. Ongoing day-to-day messaging updates can be managed through WhatsApp or Slack."
  },
  {
    category: "general",
    question: "Do you sign NDAs?",
    answer: "Yes. I respect client intellectual property. I am fully open to signing a Non-Disclosure Agreement (NDA) before you share sensitive business concepts or data sheets."
  },
  {
    category: "general",
    question: "Can you work with international clients?",
    answer: "Yes, I have worked with business owners from North America, Europe, Australia, and Asia, managing timelines efficiently using standard communication software."
  },
  {
    category: "general",
    question: "How do you ensure project quality?",
    answer: "I implement rigorous code reviews, automated unit tests for critical functions, and conduct manual cross-device tests on real iOS and Android viewports before final handoff."
  },
  {
    category: "general",
    question: "What is your development process?",
    answer: "My development workflow follows 8 structured steps: Requirements discussion, Planning/Wireframing, UI/UX Design, Development, Quality Testing, Client Review revisions, Production Deployment, and ongoing Maintenance."
  },
  {
    category: "general",
    question: "How do I get a free consultation?",
    answer: "Simply submit your name, email, and a brief description of your needs in the Project Requirements modal popup, and I will follow up to book our call."
  }
];
