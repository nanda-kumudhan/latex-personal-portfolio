import ComponentProps from '@/types/components/ComponentProps'

export default function Badge({ children }: ComponentProps) {
  return (
    <span className='rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-800 dark:bg-slate-700 dark:text-slate-200'>
      {children}
    </span>
  )
}
