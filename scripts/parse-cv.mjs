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
  console.log('🔍 [PARSER] Starting CV parsing process...');
  console.log(`📄 [PARSER] Looking for CV at: ${cvFilePath}`);
  
  if (!fs.existsSync(cvFilePath)) {
    console.error(`❌ [PARSER] Error: cv.tex not found at ${cvFilePath}`);
    console.error("Please add your cv.tex file to the 'data' directory.");
    return;
  }

  console.log('✅ [PARSER] CV file found, reading contents...');
  const fileContent = await fs.readFile(cvFilePath, 'utf8');
  console.log(`📝 [PARSER] CV file size: ${fileContent.length} characters`);

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
  console.log('📋 [PARSER] Initialized data structure');

  // ===== EDUCATION =====
  console.log('🎓 [PARSER] Extracting education section...');
  const educationMatch = fileContent.match(/%-----------EDUCATION-----------\n([\s\S]*?)%-----------EXPERIENCE-----------/);
  if (educationMatch) {
    console.log('✅ [PARSER] Education section found');
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
      console.log(`  📌 [PARSER] Added education: ${institution.trim()}`);
    }
  }

  // ===== EXPERIENCE =====
  console.log('💼 [PARSER] Extracting experience section...');
  const experienceMatch = fileContent.match(/%-----------EXPERIENCE-----------\n([\s\S]*?)%-----------PROJECTS-----------/);
  if (experienceMatch) {
    console.log('✅ [PARSER] Experience section found');
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
      console.log(`  📌 [PARSER] Added experience: ${role.trim()} at ${company.trim()}`);
    }
  }

  // ===== PROJECTS =====
  console.log('📂 [PARSER] Extracting projects section...');
  const projectsMatch = fileContent.match(/%-----------PROJECTS-----------[\s\S]*?\n([\s\S]*?)%-----------TECHNICAL SKILLS/);
  if (projectsMatch) {
    console.log('✅ [PARSER] Projects section found');
    const projectsSection = projectsMatch[1];
    
    // Match: \resumeProjectHeading with flexible whitespace handling
    const projectRegex = /\\resumeProjectHeading\s*\{\s*([^}]+?)\s*\}\s*\{\s*([^}]+?)\s*\}([\s\S]*?)(?=\\resumeProjectHeading|\\resumeSubHeadingListEnd)/g;
    
    let match;
    while ((match = projectRegex.exec(projectsSection)) !== null) {
      const [, heading, date, itemsText] = match;
      
      // Parse heading: \textbf{Name} $|$ \emph{Tech1, Tech2, Tech3}
      const headingMatch = heading.match(/\\textbf\s*\{\s*([^}]+)\s*\}\s*\$\|\$\s*\\emph\s*\{\s*([^}]+)\s*\}/);
      const name = headingMatch ? headingMatch[1].trim() : heading.trim();
      const stackStr = headingMatch ? headingMatch[2].trim() : '';
      
      const stack = stackStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      
      // Extract resumeItems
      const description = [];
      const itemRegex = /\\resumeItem\s*\{\s*([^}]+)\s*\}/g;
      let itemMatch;
      while ((itemMatch = itemRegex.exec(itemsText)) !== null) {
        description.push(itemMatch[1].trim());
      }
      
      data.projects.push({
        name: name || 'Untitled Project',
        date: date.trim(),
        description,
        stack,
      });
      console.log(`  📌 [PARSER] Added project: ${name || 'Untitled Project'} (${stack.length} tech stack items)`);
    }
  }

  // ===== SKILLS =====
  console.log('🛠️  [PARSER] Extracting skills section...');
  const skillsMatch = fileContent.match(/%-----------TECHNICAL SKILLS-----------\n([\s\S]*?)\n\\end\{document\}/);
  if (skillsMatch) {
    console.log('✅ [PARSER] Skills section found');
    const skillsSection = skillsMatch[1];
    
    // Extract languages - format: \textbf{Languages}{: items} or \textbf{Languages}: items
    const languagesMatch = skillsSection.match(/\\textbf\{Languages\}\{?:\s*([^}\\]+?)(?=\\\\|\}|\\textbf|$)/);
    if (languagesMatch) {
      data.skills.languages = languagesMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
    
    // Extract frameworks & libraries
    const frameworksMatch = skillsSection.match(/\\textbf\{Frameworks[^}]*\}\{?:\s*([^}\\]+?)(?=\\\\|\}|\\textbf|$)/);
    if (frameworksMatch) {
      data.skills.frameworksAndLibraries = frameworksMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
    
    // Extract tools & platforms
    const toolsMatch = skillsSection.match(/\\textbf\{Tools[^}]*\}\{?:\s*([^}\\]+?)(?=\\\\|\}|\\textbf|$)/);
    if (toolsMatch) {
      data.skills.toolsAndPlatforms = toolsMatch[1]
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }
  }

  await fs.writeJson(outputFilePath, data, { spaces: 2 });
  console.log('\n📊 [PARSER] ✨ Parsing complete! Summary:');
  console.log(`  ✓ Education entries: ${data.education.length}`);
  console.log(`  ✓ Experience entries: ${data.experience.length}`);
  console.log(`  ✓ Projects: ${data.projects.length}`);
  console.log(`  ✓ Languages: ${data.skills.languages.length}`);
  console.log(`  ✓ Frameworks: ${data.skills.frameworksAndLibraries.length}`);
  console.log(`  ✓ Tools: ${data.skills.toolsAndPlatforms.length}`);
  console.log(`✅ [PARSER] Successfully created ${outputFilePath}\n`);
}

parseCv();
