import Link from 'next/link'
import ComponentProps from '@/types/components/ComponentProps'

type Props = ComponentProps & {
  href: string
}

export default function InlineLink({ href, children }: Props) {
  return (
    <Link href={href} className='font-bold text-blue-600 hover:underline dark:text-blue-400'>
      {children}
    </Link>
  )
}
