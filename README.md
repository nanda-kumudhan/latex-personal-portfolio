# Nanda Kumudhan - Personal Portfolio

A modern, responsive portfolio website that automatically generates content by parsing a LaTeX CV file.

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Material-UI (MUI) v5 with Emotion
- **Icons**: react-icons
- **CV Parsing**: Node.js script using `unified` and `unified-latex`
- **Deployment**: Vercel

## Updating Your Portfolio

Your portfolio content is generated directly from `data/cv.tex` at build time. To update your portfolio, simply edit the CV file.

### CV Structure

The parser expects the following LaTeX structure:

```tex
%-----------EDUCATION-----------
\section{Education}
\resumeSubHeadingListStart
  \resumeSubheading{Institution}{Location}{Qualification}{Duration}
    \resumeItemListStart
      \resumeItem{Detail 1}
      \resumeItem{Detail 2}
    \resumeItemListEnd
\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\section{Experience}
\resumeSubHeadingListStart
  \resumeSubheading{Role}{Company}{Subtitle}{Duration}
    \resumeItemListStart
      \resumeItem{Description 1}
      \resumeItem{Description 2}
    \resumeItemListEnd
\resumeSubHeadingListEnd

%-----------PROJECTS-----------
\section{Projects}
\resumeSubHeadingListStart
  \resumeProjectHeading{\textbf{Project Name} $|$ \emph{Tech, Stack}}{Date}
    \resumeItemListStart
      \resumeItem{Bullet point 1}
      \resumeItem{Bullet point 2}
    \resumeItemListEnd
\resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\section{Technical Skills}
\begin{itemize}[leftmargin=0.15in, label={}]
  \small{\item{
    \textbf{Languages}{: Java, Python, ...} \\
    \textbf{Frameworks \& Libraries}{: React, Node.js, ...} \\
    \textbf{Tools \& Platforms}{: Git, AWS, ...}
  }}
\end{itemize}
```

The parser automatically extracts:

- **Education**: Institution, location, qualification, duration, and details
- **Experience**: Role, company, duration, and descriptions
- **Projects**: Name (from `\textbf{}`), tech stack (from `\emph{}`), date, and bullet points
- **Skills**: Languages, frameworks/libraries, and tools/platforms

Just update the content in `data/cv.tex` and deploy—the rest is automatic.
