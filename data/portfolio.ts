export interface Project {
  name: string;
  description: string;
  stack: string[];
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export const projects: Project[] = [
  {
    name: 'Project One',
    description: 'This is a description for project one. It was a very cool project.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/nanda-kumudhan/project-one',
  },
  {
    name: 'Project Two',
    description: 'This is a description for project two. I learned a lot from this project.',
    stack: ['React', 'JavaScript', 'Firebase'],
    link: 'https://github.com/nanda-kumudhan/project-two',
  },
];

export const experience: Experience[] = [
  {
    role: 'Software Engineer Intern',
    company: 'A Great Company',
    duration: 'June 2025 - August 2025',
    description: 'Worked on developing new features for the company\'s flagship product. Gained experience with large-scale applications and working in an agile environment.',
  },
];

export const skills: string[] = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Java',
  'HTML & CSS',
  'Git',
  'SQL',
];
