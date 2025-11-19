export interface Project {
  name: string;
  description: string[];
  stack: string[];
  link?: string;
  date: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Education {
  institution: string;
  location: string;
  qualification: string;
  duration: string;
  details: string[];
}

export const education: Education[] = [
  {
    institution: 'Loughborough University',
    location: 'Loughborough, UK',
    qualification: 'BSc Computer Science and Artificial Intelligence',
    duration: 'Sept 2024 – June 2028',
    details: [
      'Year 1: 2:1 (Top 20% of cohort)',
      'Key modules: Data Structures & Algorithms, Embedded Systems Programming (75%), Software Engineering (75%), Operating Systems, Networks',
      'Full-stack PHP/JS Healthcare Portal — 89%',
    ],
  },
  {
    institution: 'West Bridgford School',
    location: 'Nottingham, UK',
    qualification: 'A Levels (120 UCAS Points)',
    duration: '2022 – 2024',
    details: [
      'Subjects: Mathematics (B), Physics (B), Computer Science (B)',
      'Flask E-commerce Bike Sales Web App — 100%',
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'Smart Study Assistant',
    date: 'Sept 2024 – Present',
    description: [
      'Founded AI-powered study platform delivering notes and quizzes via OpenAI API, supporting active users.',
      'Automated lecture content retrieval, transcription, and summarization using Panopto, reducing manual effort by 80%.',
      'Built scalable, responsive React/TypeScript frontend for optimal user experience.',
    ],
    stack: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Panopto', 'OpenAI API'],
  },
  {
    name: 'JP Morgan Software Engineering Simulation',
    date: 'June 2024',
    description: [
      'Developed backend transaction system simulating real-world banking operations including fraud detection.',
      'Implemented unit/integration testing and robust logging, increasing reliability and reducing runtime errors by 30%.',
    ],
    stack: ['Java', 'Spring Boot'],
  },
];

export const experience: Experience[] = [
  {
    role: 'Software Developer (Freelance)',
    company: 'Dental Parts Sales Business (Remote)',
    duration: 'Jan 2023 – May 2023',
    description: [
      'Designed and implemented a full-stack inventory and sales dashboard using Python, JavaScript, TypeScript, Flask, and Chart.js, enabling real-time reporting and analytics.',
      'Automated invoice generation, stock alerts, and sales summaries, saving 30+ hours of manual work per month.',
      'Integrated a lightweight database using PostgreSQL with efficient query optimization for faster lookup and reporting.',
      'Developed interactive charts and visualizations to track sales trends, inventory levels, and customer orders, improving decision-making accuracy.',
      'Managed deployment, version control (Git), and incremental updates to ensure smooth operations without downtime.',
    ],
  },
  {
    role: 'Front-of-House Receptionist',
    company: 'Korma Sutra Indian Restaurant, Nottingham, UK',
    duration: 'Jun 2022 – Sep 2024',
    description: [
      'Managed bookings, reservations, and customer interactions efficiently.',
      'Assisted in POS operations and basic reporting tasks.',
    ],
  },
];

export const skills = {
  languages: ['Java', 'Python', 'C/C++', 'JavaScript', 'TypeScript', 'PHP', 'SQL (Postgres/MySQL)', 'HTML/CSS'],
  frameworksAndLibraries: ['React', 'Node.js', 'Flask', 'FastAPI', 'Bootstrap', 'Tailwind', 'Spring Boot', 'Panopto', 'pandas', 'NumPy', 'Matplotlib'],
  toolsAndPlatforms: ['Git', 'Google Cloud Platform', 'Firebase', 'Supabase'],
};
