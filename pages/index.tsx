import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { projects, experience, skills } from '../data/portfolio';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Head>
          <title>Nanda Kumudhan - Portfolio</title>
          <meta name="description" content="Nanda Kumudhan's Portfolio" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">
          <div id="home" className={styles.glassmorphismCard}>
            <h1 className={styles.title}>
              Nanda Kumudhan
            </h1>

            <p className={styles.description}>
              2nd year Computer Science student at Loughborough University.
            </p>

            <div className={styles.socialLinks}>
              <a href="https://github.com/nanda-kumudhan" target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} />
              </a>
              <a href="https://linkedin.com/in/nanda-kumudhan" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>

          <div id="projects" className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className={styles.grid}>
              {projects.map((project, index) => (
                <a href={project.link} key={index} className={styles.card}>
                  <h3>{project.name} &rarr;</h3>
                  <p>{project.description}</p>
                  <div className={styles.stack}>
                    {project.stack.map((tech, i) => (
                      <span key={i} className={styles.tech}>{tech}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div id="experience" className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <h3>{exp.role} at {exp.company}</h3>
                <p className={styles.duration}>{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>

          <div id="skills" className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <span key={index} className={styles.skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div id="contact" className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Me</h2>
            <div className={styles.contactContainer}>
              <ContactForm />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
