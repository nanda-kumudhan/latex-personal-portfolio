import ComponentProps from '@/types/components/ComponentProps'

export default function Heading1({ children }: ComponentProps) {
  return <h1 className='mb-4 text-4xl font-extrabold'>{children}</h1>
}
