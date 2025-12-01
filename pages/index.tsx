import Head from "next/head";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  Badge,
  Grid,
} from "@radix-ui/themes";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import GlassPanel from "../components/GlassPanel";

// Import the generated JSON from parse-cv.mjs
import portfolioData from "../data/portfolio-data.json";
import { PortfolioData } from "../data/portfolio";
import styles from "../styles/home.module.css";

const Home = () => {
  const data = portfolioData as Partial<PortfolioData>;
  const { education = [], experience = [], projects = [], skills = { languages: [], frameworks: [], developerTools: [], libraries: [] } } = data;

  // Log component mount and data
  if (typeof window !== 'undefined') {
    console.log('[PAGE] Portfolio page loaded');
    console.log(`[PAGE] Data loaded:`);
    console.log(`  - Education: ${education.length} entries`);
    console.log(`  - Experience: ${experience.length} entries`);
    console.log(`  - Projects: ${projects.length} entries`);
    console.log(`  - Skills: ${skills.languages.length + skills.frameworks.length + skills.developerTools.length + skills.libraries.length} total`);
  }

  return (
    <>
      <Navbar />

      <Box className={styles.mainContainer}>
        <Head>
          <title>Nanda Kumudhan - Portfolio</title>
          <meta name="description" content="Nanda Kumudhan's Portfolio" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>

        <Box className={styles.contentWrapper}>
          {/* Hero Section */}
          <GlassPanel accent="hero" id="home">
            <Heading as="h1" size="9" className={styles.heroTitle}>
              Nanda Kumudhan
            </Heading>
            <Text as="p" className={styles.heroSubtitle}>
              Computer Science & AI student at Loughborough University. Building full-stack applications with real-world impact—from AI-powered platforms to financial trading systems. Actively seeking internships and placements in software engineering and intelligent systems.
            </Text>

            <Flex gap="6" justify="center" className={styles.socialLinks}>
              <Button
                asChild
                size="3"
                variant="ghost"
                className={styles.socialButton}
              >
                <a
                  href="https://github.com/nanda-kumudhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub size={28} />
                </a>
              </Button>
              <Button
                asChild
                size="3"
                variant="ghost"
                className={styles.socialButton}
              >
                <a
                  href="https://www.linkedin.com/in/nanda-kumudhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={28} />
                </a>
              </Button>
            </Flex>
          </GlassPanel>

          {/* Education */}
          <Box id="education" className={styles.section}>
            <Heading as="h2" size="8" className={styles.sectionTitle}>
              Education
            </Heading>

            <Box className={styles.sectionContent}>
              {education.map((edu, index) => (
                <GlassPanel key={index} accent="section" className={styles.experienceItem}>
                  <Heading as="h3" size="5" className={styles.itemTitle}>
                    {edu.institution}
                  </Heading>
                  <Text as="p" size="4" className={styles.itemSubtitle}>
                    {edu.qualification}
                  </Text>
                  <Text as="p" size="2" className={styles.itemMeta}>
                    {edu.location} | {edu.duration}
                  </Text>

                  <ul className={styles.detailsList}>
                    {edu.details.map((detail, i) => (
                      <li key={i}>
                        <Text as="p" size="3" className={styles.listItem}>
                          {detail}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              ))}
            </Box>
          </Box>

          {/* Experience */}
          <Box id="experience" className={styles.section}>
            <Heading as="h2" size="8" className={styles.sectionTitle}>
              Experience
            </Heading>

            <Box className={styles.sectionContent}>
              {experience.map((exp, index) => (
                <GlassPanel key={index} accent="section" className={styles.experienceItem}>
                  <Heading as="h3" size="5" className={styles.itemTitle}>
                    {exp.role}
                  </Heading>
                  <Text as="p" size="4" className={styles.itemSubtitle}>
                    {exp.company}
                  </Text>
                  <Text as="p" size="2" className={styles.itemMeta}>
                    {exp.duration}
                  </Text>

                  <ul className={styles.detailsList}>
                    {exp.description.map((item, i) => (
                      <li key={i}>
                        <Text as="p" size="3" className={styles.listItem}>
                          {item}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              ))}
            </Box>
          </Box>

          {/* Projects */}
          <Box id="projects" className={styles.section}>
            <Heading as="h2" size="8" className={styles.sectionTitle}>
              Projects
            </Heading>

            <Grid
              columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
              gap="4"
              width="100%"
              className={styles.projectsGrid}
            >
              {projects.map((project, index) => (
                <GlassPanel key={index} accent="section" className={styles.projectCard}>
                  <Flex direction="column" gap="4" height="100%">
                    <Box>
                      <Heading as="h4" size="4" className={styles.projectTitle}>
                        {project.name}
                      </Heading>
                      <Text as="p" size="2" className={styles.projectDate}>
                        {project.date}
                      </Text>
                    </Box>

                    <ul className={styles.projectDescList} style={{ flex: 1 }}>
                      {project.description.map((item, i) => (
                        <li key={i}>
                          <Text as="p" size="2" className={styles.projectListItem}>
                            {item}
                          </Text>
                        </li>
                      ))}
                    </ul>

                    <Flex gap="2" wrap="wrap">
                      {project.stack.map((tech, i) => (
                        <Badge key={i} className={styles.techBadge}>
                          {tech}
                        </Badge>
                      ))}
                    </Flex>

                    {project.module && (
                      <Text as="p" size="1" className={styles.projectModule}>
                        {project.module}
                      </Text>
                    )}

                    {project.link && (
                      <Button
                        asChild
                        variant="ghost"
                        className={styles.projectGithubButton}
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} on GitHub`}
                        >
                          <FaGithub size={16} />
                          View on GitHub
                        </a>
                      </Button>
                    )}
                  </Flex>
                </GlassPanel>
              ))}
            </Grid>
          </Box>

          {/* Skills */}
          <Box id="skills" className={styles.section}>
            <Heading as="h2" size="8" className={styles.sectionTitle}>
              Skills
            </Heading>

            <Grid
              columns={{ initial: "1", md: "2", lg: "4" }}
              gap="6"
              width="100%"
            >
              <Box>
                <Heading as="h3" size="5" className={styles.skillsCategory}>
                  Languages
                </Heading>
                <Flex gap="3" wrap="wrap">
                  {skills.languages.map((skill, index) => (
                    <Badge key={index} className={styles.skillBadge}>
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </Box>

              <Box>
                <Heading as="h3" size="5" className={styles.skillsCategory}>
                  Frameworks
                </Heading>
                <Flex gap="3" wrap="wrap">
                  {skills.frameworks.map((skill, index) => (
                    <Badge key={index} className={styles.skillBadge}>
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </Box>

              <Box>
                <Heading as="h3" size="5" className={styles.skillsCategory}>
                  Developer Tools
                </Heading>
                <Flex gap="3" wrap="wrap">
                  {skills.developerTools.map((skill, index) => (
                    <Badge key={index} className={styles.skillBadge}>
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </Box>

              <Box>
                <Heading as="h3" size="5" className={styles.skillsCategory}>
                  Libraries
                </Heading>
                <Flex gap="3" wrap="wrap">
                  {skills.libraries.map((skill, index) => (
                    <Badge key={index} className={styles.skillBadge}>
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            </Grid>
          </Box>

          {/* Contact */}
          <Box id="contact" className={styles.section}>
            <Heading as="h2" size="8" className={styles.sectionTitle}>
              Contact Me
            </Heading>
            <GlassPanel accent="section" className={styles.contactContainer}>
              <Flex direction={{ initial: "column", md: "row" }} gap="8" height="100%">
                <Box className={styles.contactInfo}>
                  <Heading as="h3" size="6" className={styles.contactHeading}>
                    Let's Build Something
                  </Heading>
                  <Text as="p" className={styles.contactText}>
                    Whether you have a question, a project idea, or just want to
                    connect—drop a message. I'm open to internships, collaborations
                    and innovative product ideas.
                  </Text>
                  <Flex gap="2" wrap="wrap" className={styles.contactBadges}>
                    <Badge className={styles.contactBadge}>Full-stack</Badge>
                    <Badge className={styles.contactBadge}>AI</Badge>
                    <Badge className={styles.contactBadge}>Rapid Prototyping</Badge>
                  </Flex>
                </Box>
                <Box className={styles.contactFormContainer}>
                  <ContactForm />
                </Box>
              </Flex>
            </GlassPanel>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
