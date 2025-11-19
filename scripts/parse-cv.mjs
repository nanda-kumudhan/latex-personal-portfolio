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
  const tree = unified().use(parse).parse(fileContent);

  const data = {
    education: [],
    experience: [],
    projects: [],
    skills: {},
  };

  visit(tree, { type: 'macro' }, (node) => {
    // ---- EXPERIENCE ----
    if (node.content === 'cventry') {
      try {
        const args = node.args.map(arg => stringifyLatex(arg.content));

        const [
          roleNode,
          companyNode,
          locationNode,
          durationNode,
          descriptionNode,
        ] = args;

        data.experience.push({
          role: roleNode,
          company: companyNode,
          duration: `${locationNode} | ${durationNode}`,
          description: descriptionNode
            .split('\\item')
            .map(s => s.trim())
            .filter(Boolean),
        });
      } catch (e) {
        console.warn("Could not parse 'cventry'.");
      }
    }

    // ---- PROJECTS ----
    if (node.content === 'cvproject') {
      try {
        const args = node.args.map(arg => stringifyLatex(arg.content));

        const [
          nameNode,
          dateNode,
          descriptionNode,
          stackNode
        ] = args;

        data.projects.push({
          name: nameNode,
          date: dateNode,
          description: descriptionNode
            .split('\\item')
            .map(s => s.trim())
            .filter(Boolean),
          stack: stackNode.split(',').map(s => s.trim()),
        });
      } catch (e) {
        console.warn("Could not parse 'cvproject'.");
      }
    }

    // ---- EDUCATION ----
    if (node.content === 'cvschool') {
      try {
        const args = node.args.map(arg => stringifyLatex(arg.content));

        const [
          institutionNode,
          locationNode,
          qualificationNode,
          durationNode,
          detailsNode,
        ] = args;

        data.education.push({
          institution: institutionNode,
          location: locationNode,
          qualification: qualificationNode,
          duration: durationNode,
          details: detailsNode
            .split('\\item')
            .map(s => s.trim())
            .filter(Boolean),
        });
      } catch (e) {
        console.warn("Could not parse 'cvschool'.");
      }
    }

    // ---- SKILLS ----
    if (node.content === 'cvskills') {
      try {
        const args = node.args.map(arg => stringifyLatex(arg.content));

        const [typeNode, skillsNode] = args;
        const key = typeNode.toLowerCase().replace(/\s+/g, '');

        data.skills[key] = skillsNode
          .split(',')
          .map(s => s.trim());
      } catch (e) {
        console.warn("Could not parse 'cvskills'.");
      }
    }
  });

  await fs.writeJson(outputFilePath, data, { spaces: 2 });
  console.log(`Successfully parsed CV and created ${outputFilePath}`);
}

parseCv();
