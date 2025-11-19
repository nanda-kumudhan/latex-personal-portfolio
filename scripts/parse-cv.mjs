
import { unified } from 'unified';
import { parse } from '@unified-latex/unified-latex-util-parse';
import { visit } from '@unified-latex/unified-latex-util-visit';
import { toString } from '@unified-latex/unified-latex-util-source';
import fs from 'fs-extra';
import path from 'path';

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

  // Note: This is a simplified parser. It makes strong assumptions about the
  // structure of your cv.tex file based on common LaTeX resume templates.
  // You may need to adjust the selectors (e.g., 'cventry', 'cvproject')
  // to match the commands used in your specific .tex file.

  visit(tree, { type: 'macro' }, (node) => {
    if (node.content === 'cventry') {
      try {
        const [
          roleNode,
          companyNode,
          locationNode,
          durationNode,
          descriptionNode,
        ] = node.args.map(arg => toString(arg.content).trim());

        data.experience.push({
          role: roleNode,
          company: companyNode,
          duration: `${locationNode} | ${durationNode}`,
          description: descriptionNode.split('\\item').map(s => s.trim()).filter(Boolean),
        });
      } catch (e) {
        console.warn("Could not parse 'cventry'. Structure might be different:", toString(node));
      }
    }

    if (node.content === 'cvproject') {
       try {
        const [
          nameNode,
          dateNode,
          descriptionNode,
          stackNode
        ] = node.args.map(arg => toString(arg.content).trim());

        data.projects.push({
          name: nameNode,
          date: dateNode,
          description: descriptionNode.split('\\item').map(s => s.trim()).filter(Boolean),
          stack: stackNode.split(',').map(s => s.trim()),
        });
      } catch (e) {
        console.warn("Could not parse 'cvproject'. Structure might be different:", toString(node));
      }
    }
    
    if (node.content === 'cvschool') {
      try {
        const [
          institutionNode,
          locationNode,
          qualificationNode,
          durationNode,
          detailsNode,
        ] = node.args.map(arg => toString(arg.content).trim());

        data.education.push({
            institution: institutionNode,
            location: locationNode,
            qualification: qualificationNode,
            duration: durationNode,
            details: detailsNode.split('\\item').map(s => s.trim()).filter(Boolean),
        });
      } catch (e) {
        console.warn("Could not parse 'cvschool'. Structure might be different:", toString(node));
      }
    }

    if (node.content === 'cvskills') {
        try {
            const [typeNode, skillsNode] = node.args.map(arg => toString(arg.content).trim());
            const key = typeNode.toLowerCase().replace(/\s+/g, '');
            data.skills[key] = skillsNode.split(',').map(s => s.trim());
        } catch(e) {
            console.warn("Could not parse 'cvskills'. Structure might be different:", toString(node));
        }
    }
  });

  await fs.writeJson(outputFilePath, data, { spaces: 2 });
  console.log(`Successfully parsed CV and created ${outputFilePath}`);
}

parseCv();
