import ComponentProps from '@/types/components/ComponentProps'

export default function Heading3({ children }: ComponentProps) {
  return <h3 className='mb-2 text-2xl font-extrabold'>{children}</h3>
}
