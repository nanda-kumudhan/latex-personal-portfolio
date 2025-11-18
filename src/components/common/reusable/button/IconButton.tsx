import { ButtonHTMLAttributes, lazy } from 'react'
import clsx from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element
  screenReaderText: string
}

export default function IconButton({ icon, screenReaderText, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        'group/icon-button inline-flex items-center justify-center rounded-full p-2',
        'transition duration-300 ease-in-out',
        'hover:bg-primary-dark/5 dark:hover:bg-primary-light/5'
      )}
    >
      <span className='sr-only'>{screenReaderText}</span>
      {icon}
    </button>
  )
}
