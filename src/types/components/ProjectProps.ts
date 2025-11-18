import LinkProps from '@/types/LinkProps'

type ProjectProps = {
  id: string
  featured: boolean
  title: string
  description: string | JSX.Element
  techStacks: string[]
  otherTechStacks?: string[]
  category: string
  links: LinkProps[]
}

export default ProjectProps
