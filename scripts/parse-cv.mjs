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
  const tree = parse(fileContent);

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

  // Parse skills section from the LaTeX file
  const skillsMatch = fileContent.match(/%-----------TECHNICAL SKILLS-----------\n([\s\S]*?)\n\\end\{document\}/);
  if (skillsMatch) {
    const skillsSection = skillsMatch[1];
    
    // Extract languages
    const languagesMatch = skillsSection.match(/\\textbf\{Languages\}\{?\s*:\s*([^}\\]+)/);
    if (languagesMatch) {
      data.skills.languages = languagesMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
    
    // Extract frameworks & libraries
    const frameworksMatch = skillsSection.match(/\\textbf\{Frameworks[^}]*\}\{?\s*:\s*([^}\\]+)/);
    if (frameworksMatch) {
      data.skills.frameworksAndLibraries = frameworksMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
    
    // Extract tools & platforms
    const toolsMatch = skillsSection.match(/\\textbf\{Tools[^}]*\}\{?\s*:\s*([^}\\]+)/);
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
