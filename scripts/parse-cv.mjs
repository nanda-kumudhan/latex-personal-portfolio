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
  const projectsStartIdx = fileContent.indexOf('%-----------PROJECTS-----------');
  const projectsEndIdx = fileContent.indexOf('%-----------TECHNICAL SKILLS-----------');
  
  console.log(`  Index positions - Start: ${projectsStartIdx}, End: ${projectsEndIdx}`);
  
  if (projectsStartIdx !== -1 && projectsEndIdx !== -1) {
    console.log('✅ [PARSER] Projects section found');
    const projectsSection = fileContent.substring(projectsStartIdx, projectsEndIdx);
    console.log(`  📝 Section size: ${projectsSection.length} characters`);
    
    // Split by resumeProjectHeading to find individual projects
    const projects = projectsSection.split('\\resumeProjectHeading');
    console.log(`  🔍 Found ${projects.length - 1} potential projects (split by \\resumeProjectHeading)`);
    
    for (let i = 1; i < projects.length; i++) {
      const projectText = projects[i];
      console.log(`\n  Project #${i}:`);
      
      // Extract heading and date using a more flexible pattern
      const firstBraceEnd = projectText.indexOf('}');
      const secondBraceStart = projectText.indexOf('{', firstBraceEnd);
      const secondBraceEnd = projectText.indexOf('}', secondBraceStart);
      
      if (firstBraceEnd === -1 || secondBraceStart === -1 || secondBraceEnd === -1) {
        console.log(`    ⚠️  Malformed - missing braces, skipping`);
        continue;
      }
      
      const heading = projectText.substring(1, firstBraceEnd);
      const date = projectText.substring(secondBraceStart + 1, secondBraceEnd);
      const itemsText = projectText.substring(secondBraceEnd + 1);
      
      console.log(`    Raw heading: ${heading.substring(0, 70)}...`);
      console.log(`    Date: ${date}`);
      
      // Parse heading to extract name and tech
      let name = 'Untitled Project';
      let stackStr = '';
      
      const textbfMatch = heading.match(/\\textbf\s*\{\s*([^}]+)\s*\}/);
      if (textbfMatch) {
        name = textbfMatch[1].trim();
        console.log(`    ✓ Name: ${name}`);
      }
      
      const emphMatch = heading.match(/\\emph\s*\{\s*([^}]+)\s*\}/);
      if (emphMatch) {
        stackStr = emphMatch[1].trim();
        console.log(`    ✓ Tech stack: ${stackStr}`);
      }
      
      const stack = stackStr
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      
      // Extract resumeItems
      const description = [];
      const itemRegex = /\\resumeItem\s*\{\s*([^}]+?)\s*\}/g;
      let itemMatch;
      while ((itemMatch = itemRegex.exec(itemsText)) !== null) {
        description.push(itemMatch[1].trim());
      }
      
      console.log(`    ✓ Found ${description.length} bullet points`);
      
      if (name && name !== 'Untitled Project') {
        data.projects.push({
          name,
          date: date.trim(),
          description,
          stack,
        });
        console.log(`    ✅ ADDED to data`);
      } else {
        console.log(`    ❌ Skipped - invalid name`);
      }
    }
    
    console.log(`\n  Final projects count: ${data.projects.length}`);
  } else {
    console.log('❌ [PARSER] Projects section NOT found');
    console.log(`  Start marker found: ${projectsStartIdx !== -1}`);
    console.log(`  End marker found: ${projectsEndIdx !== -1}`);
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
