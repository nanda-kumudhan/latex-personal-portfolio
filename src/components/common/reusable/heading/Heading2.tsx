import ComponentProps from '@/types/components/ComponentProps'

export default function Heading2({ children }: ComponentProps) {
  return <h2 className='mb-3 text-3xl font-extrabold'>{children}</h2>
}
