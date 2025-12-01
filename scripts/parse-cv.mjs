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

// Function to clean LaTeX formatting from text
const cleanLatex = (text) => {
  if (!text) return text;
  
  // Helper function to handle nested braces
  const extractBracedContent = (str, command) => {
    const regex = new RegExp(`\\\\${command}\\s*\\{`, 'g');
    let result = str;
    let match;
    
    while ((match = regex.exec(result)) !== null) {
      const startIdx = match.index;
      const contentStart = match.index + match[0].length;
      let braceDepth = 1;
      let contentEnd = contentStart;
      
      for (let i = contentStart; i < result.length && braceDepth > 0; i++) {
        if (result[i] === '{') braceDepth++;
        else if (result[i] === '}') braceDepth--;
        if (braceDepth === 0) contentEnd = i;
      }
      
      if (braceDepth === 0) {
        const content = result.substring(contentStart, contentEnd);
        result = result.substring(0, startIdx) + content + result.substring(contentEnd + 1);
        // Reset regex to search from the beginning again
        regex.lastIndex = 0;
      } else {
        break;
      }
    }
    
    return result;
  };
  
  let cleaned = text;
  cleaned = extractBracedContent(cleaned, 'textbf');
  cleaned = extractBracedContent(cleaned, 'textit');
  cleaned = extractBracedContent(cleaned, 'emph');
  cleaned = cleaned
    .replace(/\\%/g, '%')
    .replace(/\\&/g, '&')
    .replace(/\\\//g, '/')
    .replace(/\\dash/g, '–')
    .replace(/--/g, '–')
    .trim();
  
  return cleaned;
};

const cvFilePath = path.join(process.cwd(), 'data', 'cv', 'cv.tex');
const outputFilePath = path.join(process.cwd(), 'data', 'portfolio-data.json');

// Helper: extract content of a balanced-brace group starting at the first '{'
const extractBraced = (text, from = 0) => {
  const start = text.indexOf('{', from);
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        return { content: text.slice(start + 1, i), endIndex: i };
      }
    }
  }
  return null;
};

async function parseCv() {
  if (!fs.existsSync(cvFilePath)) {
    return;
  }

  const fileContent = await fs.readFile(cvFilePath, 'utf8');

  const data = {
    education: [],
    experience: [],
    projects: [],
    skills: {
      languages: [],
      frameworks: [],
      developerTools: [],
      libraries: [],
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
      
      // Extract resumeItems using balanced braces, excluding grade-related items
      const details = [];
      let searchFrom = 0;
      while (true) {
        const resumeItemIdx = itemsText.indexOf('\\resumeItem', searchFrom);
        if (resumeItemIdx === -1) break;
        
        const braced = extractBraced(itemsText, resumeItemIdx + '\\resumeItem'.length);
        if (braced) {
          const cleanedItem = cleanLatex(braced.content.trim());
          // Skip items that contain grade info (e.g., "Year 1: 2:1", "100%", "89%")
          if (!cleanedItem.match(/^Year\s+\d+:/i) && !cleanedItem.match(/^[0-9]+\%$/)) {
            details.push(cleanedItem);
          }
          searchFrom = braced.endIndex + 1;
        } else {
          break;
        }
      }
      
      data.education.push({
        institution: cleanLatex(institution.trim()),
        location: cleanLatex(location.trim()),
        qualification: cleanLatex(qualification.trim()),
        duration: cleanLatex(duration.trim()),
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
      
      // Extract resumeItems using balanced braces
      const description = [];
      let searchFrom = 0;
      while (true) {
        const resumeItemIdx = itemsText.indexOf('\\resumeItem', searchFrom);
        if (resumeItemIdx === -1) break;
        
        const braced = extractBraced(itemsText, resumeItemIdx + '\\resumeItem'.length);
        if (braced) {
          description.push(cleanLatex(braced.content.trim()));
          searchFrom = braced.endIndex + 1;
        } else {
          break;
        }
      }
      
      data.experience.push({
        role: cleanLatex(role.trim()),
        company: cleanLatex(company.trim()),
        duration: cleanLatex(duration.trim()),
        description,
      });
    }
  }

  // ===== PROJECTS =====
  const projectsStartIdx = fileContent.indexOf('%-----------PROJECTS-----------');
  const projectsEndIdx = fileContent.indexOf('%-----------Programming SKILLS-----------');
  
  if (projectsStartIdx !== -1 && projectsEndIdx !== -1) {
    const projectsSection = fileContent.substring(projectsStartIdx, projectsEndIdx);
    
    // Split by resumeProjectHeading to find individual projects
    const projects = projectsSection.split('\\resumeProjectHeading');

    for (let i = 1; i < projects.length; i++) {
      const projectText = projects[i];
      
      // Extract first argument (heading) and second (date) with brace balancing
      const firstArg = extractBraced(projectText);
      if (!firstArg) {
        continue;
      }

      const secondArg = extractBraced(projectText, firstArg.endIndex + 1);
      if (!secondArg) {
        continue;
      }

      const heading = firstArg.content;
      const date = secondArg.content;
      const itemsText = projectText.substring(secondArg.endIndex + 1);
      
      // Parse heading to extract name and tech
      let name = 'Untitled Project';
      let stackStr = '';
      
      const textbfMatch = heading.match(/\\textbf\s*\{\s*([^}]+)\s*\}/);
      if (textbfMatch) {
        name = cleanLatex(textbfMatch[1].trim());
      }
      
      const emphMatch = heading.match(/\\emph\s*\{\s*([^}]+)\s*\}/);
      if (emphMatch) {
        stackStr = emphMatch[1].trim();
      }
      
      const stack = stackStr
        .split(',')
        .map(s => cleanLatex(s.trim()))
        .filter(Boolean);
      
      // Extract resumeItems using balanced braces
      const description = [];
      let searchFrom = 0;
      while (true) {
        const resumeItemIdx = itemsText.indexOf('\\resumeItem', searchFrom);
        if (resumeItemIdx === -1) break;
        
        const braced = extractBraced(itemsText, resumeItemIdx + '\\resumeItem'.length);
        if (braced) {
          description.push(cleanLatex(braced.content.trim()));
          searchFrom = braced.endIndex + 1;
        } else {
          break;
        }
      }
      
      if (name && name !== 'Untitled Project') {
        data.projects.push({
          name,
          date: cleanLatex(date.trim()),
          description,
          stack,
        });
      }
    }
  }

  // ===== SKILLS =====
  const skillsMatch = fileContent.match(/%-----------Programming SKILLS-----------\n([\s\S]*?)(?:\n%-----------|\n\\end\{document\})/);
  if (skillsMatch) {
    const skillsSection = skillsMatch[1];
    
    // Extract from format: \textbf{Category}{: items} \\
    const categoryRegex = /\\textbf\{([^}]+)\}\{:\s*([^}]+)\}/g;
    let match;
    while ((match = categoryRegex.exec(skillsSection)) !== null) {
      const [, category, itemsStr] = match;
      const skillsList = itemsStr
        .split(',')
        .map(s => cleanLatex(s.trim().replace(/\\/g, '').replace(/\$.*?\$/g, '')))
        .filter(s => s && s.length > 0 && s !== '');
      
      if (category.includes('Languages')) {
        data.skills.languages = skillsList;
      } else if (category.includes('Frameworks')) {
        data.skills.frameworks = skillsList;
      } else if (category.includes('Developer Tools')) {
        data.skills.developerTools = skillsList;
      } else if (category.includes('Libraries')) {
        data.skills.libraries = skillsList;
      }
    }
  }

  await fs.writeJson(outputFilePath, data, { spaces: 2 });
}

parseCv().catch(err => {
  process.exit(1);
});
