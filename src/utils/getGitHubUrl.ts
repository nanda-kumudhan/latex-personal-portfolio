import constants from '@/constants'

export default function getGitHubUrl(repo: string) {
  return `${constants.githubUrl}/${repo}`
}
