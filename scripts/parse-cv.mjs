import { unified } from 'unified';
import { parse } from '@unified-latex/unified-latex-util-parse';
import { visit } from '@unified-latex/unified-latex-util-visit';
import fs from 'fs-extra';
import path from 'path';

// Replacement for toString() – safe & simple
const stringifyLatex = (nodes) => {
  if (!Array.isArray(nodes)) return '';
  return nodes.map(n => (n.content ?? n.text ?? '')).join('').trim();
};

const cvFilePath = path.join(process.cwd(), 'data', 'cv.tex');
const outputFilePath = path.join(process.cwd(), 'data', 'portfolio-data.json');

async function parseCv() {
  if (!fs.existsSync(cvFilePath)) {
    console.error(`Error: cv.tex not found at ${cvFilePath}`);
    console.error("Please add your cv.tex file to the 'data' directory.");
    return;
  }

  const fileContent = await fs.readFile(cvFilePath, 'utf8');

  const data = {
    education: [],
    experience: [],
    projects: [],
    skills: {
      languages: [],
      frameworksAndLibraries: [],
      toolsAndPlatforms: [],
    },
  };

  // ===== EDUCATION =====
  const educationMatch = fileContent.match(/%-----------EDUCATION-----------\n([\s\S]*?)%-----------EXPERIENCE-----------/);
  if (educationMatch) {
    const educationSection = educationMatch[1];
    const subheadingRegex = /\\resumeSubheading\s*\{([^}]+)\}\s*\{([^}]+)\}\s*\{([^}]+)\}\s*\{([^}]+)\}([\s\S]*?)(?=\\resumeSubheading|\s*\\resumeSubHeadingListEnd)/g;
    
    let match;
    while ((match = subheadingRegex.exec(educationSection)) !== null) {
      const [, institution, location, qualification, duration, itemsText] = match;
      
      // Extract resumeItems
      const details = [];
      const itemRegex = /\\resumeItem\{([^}]+)\}/g;
      let itemMatch;
      while ((itemMatch = itemRegex.exec(itemsText)) !== null) {
        details.push(itemMatch[1].trim());
      }
      
      data.education.push({
        institution: institution.trim(),
        location: location.trim(),
        qualification: qualification.trim(),
        duration: duration.trim(),
        details,
      });
    }
  }

  // ===== EXPERIENCE =====
  const experienceMatch = fileContent.match(/%-----------EXPERIENCE-----------\n([\s\S]*?)%-----------PROJECTS-----------/);
  if (experienceMatch) {
    const experienceSection = experienceMatch[1];
    const subheadingRegex = /\\resumeSubheading\s*\{([^}]+)\}\s*\{([^}]+)\}\s*\{([^}]+)\}\s*\{([^}]+)\}([\s\S]*?)(?=\\resumeSubheading|\s*\\resumeSubHeadingListEnd)/g;
    
    let match;
    while ((match = subheadingRegex.exec(experienceSection)) !== null) {
      const [, role, company, subtitle, duration, itemsText] = match;
      
      // Extract resumeItems
      const description = [];
      const itemRegex = /\\resumeItem\{([^}]+)\}/g;
      let itemMatch;
      while ((itemMatch = itemRegex.exec(itemsText)) !== null) {
        description.push(itemMatch[1].trim());
      }
      
      data.experience.push({
        role: role.trim(),
        company: company.trim(),
        duration: duration.trim(),
        description,
      });
    }
  }

  // ===== PROJECTS =====
  const projectsMatch = fileContent.match(/%-----------PROJECTS-----------\n([\s\S]*?)%-----------TECHNICAL SKILLS-----------/);
  if (projectsMatch) {
    const projectsSection = projectsMatch[1];
    const projectRegex = /\\resumeProjectHeading\s*\{([^}]+)\}\s*\{([^}]+)\}([\s\S]*?)(?=\\resumeProjectHeading|\s*\\resumeSubHeadingListEnd)/g;
    
    let match;
    while ((match = projectRegex.exec(projectsSection)) !== null) {
      const [, heading, date, itemsText] = match;
      
      // Parse heading: \textbf{Name} $|$ \emph{Tech1, Tech2, Tech3}
      const headingMatch = heading.match(/\\textbf\{([^}]+)\}\s*\$\|\$\s*\\emph\{([^}]+)\}/);
      const name = headingMatch ? headingMatch[1].trim() : heading.trim();
      const stackStr = headingMatch ? headingMatch[2] : '';
      
      const stack = stackStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      
      // Extract resumeItems
      const description = [];
      const itemRegex = /\\resumeItem\{([^}]+)\}/g;
      let itemMatch;
      while ((itemMatch = itemRegex.exec(itemsText)) !== null) {
        description.push(itemMatch[1].trim());
      }
      
      data.projects.push({
        name,
        date: date.trim(),
        description,
        stack,
      });
    }
  }

  // ===== SKILLS =====
  const skillsMatch = fileContent.match(/%-----------TECHNICAL SKILLS-----------\n([\s\S]*?)\n\\end\{document\}/);
  if (skillsMatch) {
    const skillsSection = skillsMatch[1];
    
    // Extract languages
    const languagesMatch = skillsSection.match(/\\textbf\{Languages\}\{?\s*:\s*([^}\\]+?)(?=\\\\|\\textbf|\n|$)/);
    if (languagesMatch) {
      data.skills.languages = languagesMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
    
    // Extract frameworks & libraries
    const frameworksMatch = skillsSection.match(/\\textbf\{Frameworks[^}]*\}\{?\s*:\s*([^}\\]+?)(?=\\\\|\\textbf|\n|$)/);
    if (frameworksMatch) {
      data.skills.frameworksAndLibraries = frameworksMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
    
    // Extract tools & platforms
    const toolsMatch = skillsSection.match(/\\textbf\{Tools[^}]*\}\{?\s*:\s*([^}\\]+?)(?=\\\\|\\textbf|\n|$)/);
    if (toolsMatch) {
      data.skills.toolsAndPlatforms = toolsMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
  }

  await fs.writeJson(outputFilePath, data, { spaces: 2 });
  console.log(`Successfully parsed CV and created ${outputFilePath}`);
}

parseCv();
