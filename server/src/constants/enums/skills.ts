export enum SkillCategory {
  // Development 
  MOBILE = 'mobile',
  BACKEND = 'backend',
  DESKTOP = 'desktop',
  FRONTEND = 'frontend',
  FULLSTACK = 'fullstack',

  // Infrastructure & DevOps
  CLOUD = 'cloud',
  DEVOPS = 'devops',
  DATABASE = 'database',
  NETWORKING = 'networking',
  CYBERSECURITY = 'cybersecurity',

  // Data & AI
  BIG_DATA = 'big_data',
  DATA_SCIENCE = 'data_science',
  DATA_ANALYTICS = 'data_analytics',
  MACHINE_LEARNING = 'machine_learning',
  ARTIFICIAL_INTELLIGENCE = 'artificial_intelligence',
  
  // Design & Creative
  BRANDING = 'branding',
  ANIMATION = 'animation',
  UI_UX_DESIGN = 'ui_ux_design',
  ILLUSTRATION = 'illustration',
  VIDEO_EDITING = 'video_editing',
  GRAPHIC_DESIGN = 'graphic_design',

  // Blockchain
  WEB3 = 'web3',
  CRYPTO = 'crypto',
  BLOCKCHAIN = 'blockchain',
  SMART_CONTRACTS = 'smart_contracts',

  // Quality & Testing
  QA_ENGINEERING = 'qa_engineering',
  SECURITY_TESTING = 'security_testing',
  AUTOMATION_TESTING = 'automation_testing',
  PERFORMANCE_TESTING = 'performance_testing',

  // Project Management
  AGILE_COACH = 'agile_coach',
  SCRUM_MASTER = 'scrum_master',
  PROJECT_MANAGEMENT = 'project_management',
  PRODUCT_MANAGEMENT = 'product_management',

  // Business & Marketing
  SEO = 'seo',
  COPYWRITING = 'copywriting',
  SOCIAL_MEDIA = 'social_media',
  CONTENT_WRITING = 'content_writing',
  EMAIL_MARKETING = 'email_marketing',
  PAID_ADVERTISING = 'paid_advertising',
  DIGITAL_MARKETING = 'digital_marketing',

  // Other Professional Services
  TRAINING = 'training',
  CONSULTING = 'consulting',
  TRANSLATION = 'translation',
  TECHNICAL_SUPPORT = 'technical_support',
  VIRTUAL_ASSISTANT = 'virtual_assistant',
  
  OTHER = 'other'
};

export const SkillSubCategories: Record<SkillCategory, string[]> = {
  [SkillCategory.FRONTEND]: [
    'React', 'Angular', 'Vue.js', 'Next.js', 'Nuxt.js', 'Svelte',
    'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS',
    'Material UI', 'Bootstrap', 'Webpack', 'Vite', 'Redux', 'Zustand',
    'GraphQL', 'Apollo', 'REST APIs', 'WebRTC', 'WebAssembly'
  ],
  [SkillCategory.BACKEND]: [
    'Node.js', 'Python', 'Java', 'C#', '.NET', 'PHP', 'Ruby on Rails',
    'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel',
    'NestJS', 'FastAPI', 'REST API', 'GraphQL', 'Microservices',
    'Socket.io', 'WebSockets', 'Serverless', 'AWS Lambda'
  ],
  
  [SkillCategory.FULLSTACK]: [
    'MEAN Stack', 'MERN Stack', 'JAMStack', 'LAMP Stack',
    'Full Stack Development', 'System Design', 'Architecture',
    'API Design', 'Database Design', 'Scalability'
  ],
  
  [SkillCategory.MOBILE]: [
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Android',
    'iOS', 'Xamarin', 'Cordova', 'Ionic', 'Mobile UX/UI',
    'App Store Optimization', 'Mobile Security'
  ],
  
  [SkillCategory.DESKTOP]: [
    'Electron', 'C++', 'Java', 'C#', 'WPF', 'Qt',
    'Cross-Platform Development', 'Windows', 'macOS', 'Linux'
  ],
  
  [SkillCategory.DEVOPS]: [
    'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions',
    'Ansible', 'Terraform', 'Prometheus', 'Grafana', 'ELK Stack',
    'Infrastructure as Code', 'CI/CD Pipelines', 'Monitoring',
    'Logging', 'Microservices Orchestration'
  ],
  
  [SkillCategory.CLOUD]: [
    'AWS', 'Azure', 'GCP', 'DigitalOcean', 'Heroku', 'Cloud Architecture',
    'Cloud Security', 'Serverless', 'Cloud Migration', 'Kubernetes',
    'AWS EC2', 'S3', 'Lambda', 'RDS', 'CloudFront', 'Azure DevOps'
  ],
  
  [SkillCategory.DATABASE]: [
    'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQL Server',
    'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'Firebase',
    'Database Design', 'Query Optimization', 'Data Modeling',
    'Database Migration', 'NoSQL', 'SQL', 'Database Security'
  ],
  
  [SkillCategory.CYBERSECURITY]: [
    'Network Security', 'Application Security', 'Cloud Security',
    'Penetration Testing', 'Vulnerability Assessment', 'SIEM',
    'Firewall Management', 'Identity Management', 'SOC Operations',
    'Incident Response', 'GDPR Compliance', 'ISO 27001',
    'Ethical Hacking', 'Security Audits', 'RSA', 'SSL/TLS'
  ],
  
  [SkillCategory.NETWORKING]: [
    'Cisco Networking', 'SDN', 'Network Architecture',
    'Network Security', 'VPN', 'Load Balancing', 'DNS',
    'TCP/IP', 'Routing Protocols', 'Network Monitoring',
    'Software Defined Networking', 'Wireless Networking'
  ],
  
  [SkillCategory.DATA_SCIENCE]: [
    'Python', 'R', 'SQL', 'Data Visualization', 'Statistical Analysis',
    'Pandas', 'NumPy', 'Jupyter', 'Tableau', 'Power BI',
    'Machine Learning', 'Deep Learning', 'NLP', 'Data Mining'
  ],
  
  [SkillCategory.MACHINE_LEARNING]: [
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'XGBoost',
    'Computer Vision', 'NLP', 'Reinforcement Learning',
    'Model Deployment', 'MLOps', 'Feature Engineering',
    'Time Series Analysis', 'Anomaly Detection'
  ],
  
  [SkillCategory.ARTIFICIAL_INTELLIGENCE]: [
    'GPT Models', 'LLM Fine-tuning', 'Prompt Engineering',
    'AI Agents', 'RAG', 'AutoML', 'AI Ethics',
    'Generative AI', 'Multi-modal AI', 'Neural Networks'
  ],
  
  [SkillCategory.BIG_DATA]: [
    'Hadoop', 'Spark', 'Kafka', 'Flink', 'Airflow',
    'Data Warehousing', 'ETL Pipelines', 'Data Lake',
    'Data Governance', 'Data Quality', 'Real-time Analytics'
  ],
  
  [SkillCategory.DATA_ANALYTICS]: [
    'SQL', 'Excel', 'Tableau', 'Power BI', 'Google Analytics',
    'Business Intelligence', 'Data Visualization', 'Reporting',
    'A/B Testing', 'Marketing Analytics', 'Financial Analytics'
  ],
  
  [SkillCategory.UI_UX_DESIGN]: [
    'Figma', 'Adobe XD', 'Sketch', 'InVision', 'User Research',
    'Wireframing', 'Prototyping', 'Usability Testing',
    'Design Systems', 'Accessibility', 'User Journey Mapping',
    'Information Architecture', 'Interaction Design'
  ],
  
  [SkillCategory.GRAPHIC_DESIGN]: [
    'Adobe Photoshop', 'Illustrator', 'InDesign', 'Canva',
    'Typography', 'Color Theory', 'Layout Design', 'Print Design',
    'Logo Design', 'Brand Identity', 'Visual Communication'
  ],
  
  [SkillCategory.VIDEO_EDITING]: [
    'Adobe Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve',
    'After Effects', 'Motion Graphics', 'Color Grading',
    'Sound Design', 'Video Production', 'Storyboarding',
    '3D Animation', 'Visual Effects', 'Video Compression'
  ],
  
  [SkillCategory.ANIMATION]: [
    '2D Animation', '3D Animation', 'Blender', 'Maya',
    'Cinema 4D', 'Motion Graphics', 'Character Animation',
    'Visual Effects', 'Stop Motion', 'Game Animation'
  ],
  
  [SkillCategory.ILLUSTRATION]: [
    'Digital Illustration', 'Vector Art', 'Procreate',
    'Storyboarding', 'Children\'s Book Illustration',
    'Character Design', 'Concept Art', 'Infographics'
  ],
  
  [SkillCategory.BRANDING]: [
    'Brand Strategy', 'Logo Design', 'Brand Guidelines',
    'Brand Voice', 'Visual Identity', 'Packaging Design',
    'Corporate Identity', 'Rebranding', 'Brand Storytelling'
  ],
  
  [SkillCategory.BLOCKCHAIN]: [
    'Ethereum', 'Solidity', 'Smart Contracts', 'Web3.js',
    'ethers.js', 'Hardhat', 'Truffle', 'DeFi',
    'NFT Development', 'DApp Development', 'Blockchain Architecture'
  ],
  
  [SkillCategory.SMART_CONTRACTS]: [
    'Solidity', 'Vyper', 'Rust', 'Smart Contract Security',
    'ERC20', 'ERC721', 'ERC1155', 'Auditing',
    'Gas Optimization', 'Testing', 'Deployment'
  ],
  
  [SkillCategory.WEB3]: [
    'Web3.js', 'ethers.js', 'IPFS', 'TheGraph',
    'Wallet Integration', 'MetaMask', 'RainbowKit',
    'Web3 Security', 'DEX', 'DAO', 'DeFi Protocols'
  ],
  
  [SkillCategory.CRYPTO]: [
    'Cryptography', 'Tokenomics', 'Trading', 'Exchange Integration',
    'Market Making', 'Crypto Security', 'Wallets', 'Mining'
  ],
  
  [SkillCategory.QA_ENGINEERING]: [
    'Test Automation', 'Manual Testing', 'Selenium', 'Cypress',
    'JUnit', 'TestNG', 'Postman', 'Agile Testing',
    'Quality Assurance', 'Test Strategy', 'Defect Management'
  ],
  
  [SkillCategory.AUTOMATION_TESTING]: [
    'Selenium WebDriver', 'Cypress', 'Playwright', 'TestCafe',
    'Jenkins', 'GitLab CI', 'Test Automation Framework',
    'BDD', 'Cucumber', 'API Testing', 'Performance Testing'
  ],
  
  [SkillCategory.PERFORMANCE_TESTING]: [
    'JMeter', 'LoadRunner', 'Gatling', 'Performance Monitoring',
    'Load Testing', 'Stress Testing', 'Profiling', 'Optimization'
  ],
  
  [SkillCategory.SECURITY_TESTING]: [
    'OWASP', 'Penetration Testing', 'Vulnerability Scanning',
    'Burp Suite', 'ZAP', 'Security Automation',
    'SAST', 'DAST', 'Container Security'
  ],
  
  [SkillCategory.PROJECT_MANAGEMENT]: [
    'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence',
    'Project Planning', 'Risk Management', 'Stakeholder Management',
    'Budget Management', 'Resource Planning', 'Trello', 'Asana',
    'Waterfall Methodology', 'Hybrid Project Management'
  ],
  
  [SkillCategory.PRODUCT_MANAGEMENT]: [
    'Product Strategy', 'Roadmap Planning', 'Market Research',
    'User Stories', 'Product Analytics', 'A/B Testing',
    'Product Launch', 'Customer Development', 'MVP Strategy'
  ],
  
  [SkillCategory.SCRUM_MASTER]: [
    'Sprint Planning', 'Daily Standups', 'Retrospectives',
    'Backlog Refinement', 'Team Facilitation', 'Conflict Resolution',
    'Agile Metrics', 'Scrum Ceremonies', 'SAFe'
  ],
  
  [SkillCategory.AGILE_COACH]: [
    'Agile Transformation', 'Team Coaching', 'Organizational Change',
    'Agile Mindset', 'Lean Principles', 'Continuous Improvement',
    'Scaled Agile', 'Agile Metrics', 'Leadership Coaching'
  ],
  
  [SkillCategory.DIGITAL_MARKETING]: [
    'Google Ads', 'Facebook Ads', 'Instagram Marketing',
    'LinkedIn Marketing', 'TikTok Marketing', 'Content Strategy',
    'Email Marketing', 'Analytics', 'Conversion Optimization',
    'Marketing Automation', 'HubSpot', 'Salesforce'
  ],
  
  [SkillCategory.SEO]: [
    'On-Page SEO', 'Off-Page SEO', 'Technical SEO',
    'Keyword Research', 'Link Building', 'Local SEO',
    'SEO Analytics', 'Google Search Console', 'SEMrush',
    'Ahrefs', 'Moz', 'Content Optimization'
  ],
  
  [SkillCategory.CONTENT_WRITING]: [
    'Blog Writing', 'Article Writing', 'Technical Writing',
    'Copywriting', 'Ghostwriting', 'Editing', 'Proofreading',
    'Content Research', 'Creative Writing', 'Storytelling',
    'White Papers', 'Case Studies', 'eBooks'
  ],
  
  [SkillCategory.COPYWRITING]: [
    'Sales Copy', 'Website Copy', 'Email Copy', 'Landing Pages',
    'Ad Copy', 'Product Descriptions', 'Brand Voice',
    'Direct Response', 'Storytelling', 'Copy Editing'
  ],
  
  [SkillCategory.SOCIAL_MEDIA]: [
    'Content Creation', 'Community Management', 'Social Strategy',
    'Social Media Management', 'Influencer Marketing',
    'Social Listening', 'Content Calendar', 'Analytics'
  ],
  
  [SkillCategory.EMAIL_MARKETING]: [
    'Email Campaigns', 'Newsletters', 'Automation Flows',
    'Lead Nurturing', 'Mailchimp', 'ConvertKit', 'SendGrid',
    'Email Design', 'Email Personalization', 'Analytics'
  ],
  
  [SkillCategory.PAID_ADVERTISING]: [
    'PPC', 'Display Advertising', 'Retargeting', 'Programmatic',
    'Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Ad Network',
    'Bid Management', 'Ad Copywriting', 'Conversion Tracking'
  ],
  
  [SkillCategory.CONSULTING]: [
    'Business Strategy', 'IT Strategy', 'Digital Transformation',
    'Process Improvement', 'Change Management', 'Strategic Planning',
    'Operational Excellence', 'Business Analysis'
  ],
  
  [SkillCategory.TRAINING]: [
    'Corporate Training', 'Technical Training', 'Soft Skills',
    'Leadership Development', 'Onboarding', 'Curriculum Design',
    'Workshop Facilitation', 'E-Learning Development'
  ],
  
  [SkillCategory.TECHNICAL_SUPPORT]: [
    'Help Desk', 'IT Support', 'System Administration',
    'Customer Support', 'Ticketing Systems', 'Remote Support',
    'ITIL', 'Technical Troubleshooting', 'Incident Management'
  ],
  
  [SkillCategory.VIRTUAL_ASSISTANT]: [
    'Administrative Support', 'Calendar Management', 'Email Management',
    'Travel Planning', 'Data Entry', 'CRM Management',
    'Project Coordination', 'Document Management'
  ],
  
  [SkillCategory.TRANSLATION]: [
    'Document Translation', 'Website Localization', 'Audio Translation',
    'Software Localization', 'Business Translation', 'Medical Translation',
    'Legal Translation', 'Technical Translation', 'Interpretation'
  ],
  
  [SkillCategory.OTHER]: [
    'Other Specialized Skills', 'General Professional Services'
  ]
};

export interface Skill {
  category: SkillCategory;
  subSkills: string[];
}

// Get skills as flattened array
export const getAllSkills = (): string[] => {
  return Object.values(SkillSubCategories).flat();
}

// Get skills by category
export const getSkillsByCategory = (category: SkillCategory): string[] => {
  return SkillSubCategories[category] || [];
};

// Search Skills
export const searchSkills = (query: string): string[] => {
  const allSkills = getAllSkills();
  return allSkills.filter(skill => 
    skill.toLowerCase().includes(query.toLowerCase())
  );
};