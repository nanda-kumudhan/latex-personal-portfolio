import GithubFillIcon from 'remixicon-react/GithubFillIcon'
import ExternalLinkFillIcon from 'remixicon-react/ExternalLinkFillIcon'
import getGitHubUrl from '@/utils/getGitHubUrl'
import LinkProps from '@/types/LinkProps'
import ProjectProps from '@/types/components/ProjectProps'
import constants from '@/constants'
import InlineLink from '@/components/common/reusable/InlineLink'

const github: LinkProps = {
  label: 'Source code',
  icon: <GithubFillIcon size={24} />,
  url: ''
}

const live: LinkProps = {
  label: 'Live',
  icon: <ExternalLinkFillIcon size={24} />,
  url: ''
}

const getLinks = (githubRepo: string, url?: string) => {
  const links = [{ ...github, url: getGitHubUrl(githubRepo) }]
  if (url) {
    links.push({ ...live, url })
  }
  return links
}

const filters = [
  'React',
  'Vue.js',
  'Laravel',
  'TypeScript',
  'JavaScript',
  'jQuery',
  'Tailwind CSS',
  'Bootstrap',
  'HTML/CSS',
  'PHP',
  'Java',
  'Python',
  'ASP.NET',
  'Android SDK',
  'Firebase',
  'Axios Mock'
]

const projects: ProjectProps[] = [
  {
    id: 'louisite',
    featured: true,
    title: 'LOUISITE',
    description:
      'My all-new personal website—this is the second and latest iteration—built with React and TypeScript.',
    techStacks: ['React', 'TypeScript', 'Tailwind CSS'],
    otherTechStacks: ['HTML/CSS', 'JavaScript'],
    category: 'Front-end development',
    links: getLinks('louisite', 'https://louisite.netfliy.app')
  },
  {
    id: 'vue-member-management',
    featured: true,
    title: 'Member Management App',
    description: (
      <span>
        A member management system app built with Vue.js. Built as a probation project during my
        internship at <InlineLink href='https://blibli.com'>Blibli</InlineLink>.
      </span>
    ),
    techStacks: ['Vue.js', 'Axios Mock'],
    otherTechStacks: ['HTML/CSS', 'JavaScript'],
    category: 'Front-end development',
    links: getLinks('vue-member-management')
  },
]

export { filters, projects }
