import Head from "next/head";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import GlassPanel from "../components/GlassPanel";

// Import the generated JSON from parse-cv.mjs
import portfolioData from "../data/portfolio-data.json";
import { PortfolioData } from "../data/portfolio";

// ===== STYLED COMPONENTS =====
// Deprecated individual glass boxes replaced with GlassPanel component.

const ProjectPanel = styled(Paper)(({ theme }: any) => ({
  background: 'rgba(25,25,30,0.55)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 18,
  padding: '1.25rem 1.1rem 1.1rem',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
  transition: 'transform .35s ease, box-shadow .35s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 42px rgba(0,0,0,0.6)'
  }
}));

const SectionTitle = styled(Typography)(({ theme }: any) => ({
  fontSize: "2.8rem",
  marginBottom: "2rem",
  textAlign: "center",
  fontWeight: 600,
  letterSpacing: "1px",
  color: "#e0e0e0",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const ExperienceItem = styled(Paper)(({ theme }: any) => ({
  background: 'rgba(25,25,30,0.55)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 18,
  padding: '1.75rem 1.5rem',
  marginBottom: '1.5rem',
  transition: 'transform .3s ease, box-shadow .3s ease',
  boxShadow: '0 6px 24px rgba(0,0,0,0.45)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
  }
}));

const SocialLinks = styled(Stack)(({ theme }: any) => ({
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  marginTop: "1.5rem",
}));

const TechChip = styled(Chip)(({ theme }: any) => ({
  background: "rgba(0, 112, 243, 0.15)",
  color: "#00aaff",
  fontSize: "0.85rem",
  fontWeight: 500,
}));

const SkillChip = styled(Chip)(({ theme }: any) => ({
  background: "rgba(255, 255, 255, 0.08)",
  color: "#e0e0e0",
  fontSize: "1rem",
  fontWeight: 500,
  border: "1px solid transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(0, 170, 255, 0.15)",
    borderColor: "rgba(0, 170, 255, 0.5)",
    transform: "scale(1.05)",
  },
}));

const ContactContainer = styled(Paper)(({ theme }: any) => ({
  background: 'rgba(25,25,30,0.55)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 22,
  padding: '2.75rem 2.5rem',
  maxWidth: '960px',
  width: '100%',
  margin: '0 auto',
  boxShadow: '0 10px 40px rgba(0,0,0,0.55)',
  display: 'flex',
  flexDirection: 'row',
  gap: '2.5rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '2.25rem 2rem'
  }
}));

// ----------------------------
// Component
// ----------------------------
const Home = () => {
  const data = portfolioData as Partial<PortfolioData>;
  const { education = [], experience = [], projects = [], skills = { languages: [], frameworksAndLibraries: [], toolsAndPlatforms: [] } } = data;

  // Log component mount and data
  if (typeof window !== 'undefined') {
    console.log('🎨 [PAGE] Portfolio page loaded');
    console.log(`📊 [PAGE] Data loaded:`);
    console.log(`  - Education: ${education.length} entries`);
    console.log(`  - Experience: ${experience.length} entries`);
    console.log(`  - Projects: ${projects.length} entries`);
    console.log(`  - Skills: ${skills.languages.length + skills.frameworksAndLibraries.length + skills.toolsAndPlatforms.length} total`);
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "5rem 1rem 2rem",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        }}
      >
        <Head>
          <title>Nanda Kumudhan - Portfolio</title>
          <meta name="description" content="Nanda Kumudhan's Portfolio" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: "90%",
              md: "85%",
              lg: "1200px",
              xl: "1400px",
            },
            paddingX: {
              xs: "1rem",
              sm: "1.5rem",
              md: "2rem",
            },
          }}
        >
          {/* Hero Section */}
          <GlassPanel accent="hero" id="home">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: "bold",
                color: "#e0e0e0",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Nanda Kumudhan
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                margin: "1rem 0",
                color: "#d0d0d0",
                lineHeight: 1.5,
              }}
            >
              A passionate and driven Computer Science and AI student at
              Loughborough University, specializing in full-stack development
              and intelligent systems.
            </Typography>

            <SocialLinks direction="row">
              <IconButton
                component="a"
                href="https://github.com/nanda-kumudhan"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "white", "&:hover": { color: "#00aaff" } }}
              >
                <FaGithub size={30} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/nanda-kumudhan"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "white", "&:hover": { color: "#00aaff" } }}
              >
                <FaLinkedin size={30} />
              </IconButton>
            </SocialLinks>
          </GlassPanel>

          {/* Education */}
          <Box id="education" sx={{ 
            width: "100%",
            margin: "3rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <SectionTitle variant="h2">Education</SectionTitle>

            <Box sx={{ width: "100%" }}>
              {education.map((edu, index) => (
                <ExperienceItem key={index}>
                  <Typography variant="h5" sx={{ color: "#00aaff", margin: 0 }}>
                    {edu.institution}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#ccc",
                      margin: "0.25rem 0",
                    }}
                  >
                    {edu.qualification}
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      color: "#aaa",
                      margin: "0.25rem 0 1rem 0",
                    }}
                  >
                    {edu.location} | {edu.duration}
                  </Typography>

                  <List sx={{ color: "#d0d0d0" }}>
                    {edu.details.map((detail, i) => (
                      <ListItem key={i} sx={{ paddingLeft: 0 }}>
                        <ListItemText primary={detail} />
                      </ListItem>
                    ))}
                  </List>
                </ExperienceItem>
              ))}
            </Box>
          </Box>

          {/* Experience */}
          <Box id="experience" sx={{ 
            width: "100%",
            margin: "3rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <SectionTitle variant="h2">Experience</SectionTitle>

            <Box sx={{ width: "100%" }}>
              {experience.map((exp, index) => (
                <ExperienceItem key={index}>
                  <Typography variant="h5" sx={{ color: "#00aaff", margin: 0 }}>
                    {exp.role}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#ccc",
                      margin: "0.25rem 0",
                    }}
                  >
                    {exp.company}
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      color: "#aaa",
                      margin: "0.25rem 0 1rem 0",
                    }}
                  >
                    {exp.duration}
                  </Typography>

                  <List sx={{ color: "#d0d0d0" }}>
                    {exp.description.map((item, i) => (
                      <ListItem key={i} sx={{ paddingLeft: 0 }}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </ExperienceItem>
              ))}
            </Box>
          </Box>

          {/* Projects */}
          <Box id="projects" sx={{ 
            width: "100%",
            margin: "3rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <SectionTitle variant="h2">Projects</SectionTitle>

            <Grid container spacing={2} sx={{ width: "100%" }}>
              {projects.map((project, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                  <ProjectPanel>
                    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      <Typography variant="h6" sx={{ color: "#00aaff", marginBottom: "0.5rem" }}>
                        {project.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          color: "#aaa",
                          marginBottom: "1rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        {project.date}
                      </Typography>

                      <List sx={{ color: "#d0d0d0", marginBottom: "1rem", flex: 1, paddingLeft: 0 }}>
                        {project.description.map((item, i) => (
                          <ListItem key={i} sx={{ paddingLeft: 0, fontSize: "0.9rem" }}>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>

                      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
                        {project.stack.map((tech, i) => (
                          <TechChip key={i} label={tech} />
                        ))}
                      </Stack>

                      {project.module && (
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            fontStyle: "italic",
                            color: "#aaa",
                            marginTop: "1rem",
                            textAlign: "right",
                          }}
                        >
                          {project.module}
                        </Typography>
                      )}
                    </Box>
                  </ProjectPanel>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Skills */}
          <Box id="skills" sx={{ 
            width: "100%",
            margin: "3rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <SectionTitle variant="h2">Skills</SectionTitle>

            <Grid container spacing={3} sx={{ width: "100%" }}>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Typography variant="h6" sx={{ color: "#00aaff", borderBottom: "2px solid rgba(0, 170, 255, 0.3)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                  Languages
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: "0.8rem" }}>
                  {skills.languages.map((skill, index) => (
                    <SkillChip key={index} label={skill} />
                  ))}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Typography variant="h6" sx={{ color: "#00aaff", borderBottom: "2px solid rgba(0, 170, 255, 0.3)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                  Frameworks & Libraries
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: "0.8rem" }}>
                  {skills.frameworksAndLibraries.map((skill, index) => (
                    <SkillChip key={index} label={skill} />
                  ))}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Typography variant="h6" sx={{ color: "#00aaff", borderBottom: "2px solid rgba(0, 170, 255, 0.3)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                  Tools & Platforms
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: "0.8rem" }}>
                  {skills.toolsAndPlatforms.map((skill, index) => (
                    <SkillChip key={index} label={skill} />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* Contact */}
          <Box id="contact" sx={{ 
            width: "100%",
            margin: "3rem 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <SectionTitle variant="h2">Contact Me</SectionTitle>
            <ContactContainer>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, letterSpacing: 0.5, color: '#e0e0e0', mb: 1 }}>
                  Let's Build Something
                </Typography>
                <Typography sx={{ color: '#b0b0b0', lineHeight: 1.5, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                  Whether you have a question, a project idea, or just want to connect—drop a message. I’m open to internships, collaborations and innovative product ideas.
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 'auto', flexWrap: 'wrap' }}>
                  <Chip label="Full-stack" variant="outlined" sx={{ borderColor: 'rgba(0,170,255,0.5)', color: '#00aaff' }} />
                  <Chip label="AI" variant="outlined" sx={{ borderColor: 'rgba(0,170,255,0.5)', color: '#00aaff' }} />
                  <Chip label="Rapid Prototyping" variant="outlined" sx={{ borderColor: 'rgba(0,170,255,0.5)', color: '#00aaff' }} />
                </Stack>
              </Box>
              <Box sx={{ flex: 1 }}>
                <ContactForm />
              </Box>
            </ContactContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
