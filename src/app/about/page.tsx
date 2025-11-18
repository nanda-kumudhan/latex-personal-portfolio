'use client'
import { lazy } from 'react'
import ComponentProps from '@/types/components/ComponentProps'
import Badge from '@/components/common/reusable/Badge'
import Heading1 from '@/components/common/reusable/heading/Heading1'
import Heading2 from '@/components/common/reusable/heading/Heading2'
import Heading3 from '@/components/common/reusable/heading/Heading3'
import InlineLink from '@/components/common/reusable/InlineLink'

const ReactMarkdown = lazy(() => import('react-markdown'))

const aboutContent = `
# About Me

This is a placeholder for the about page. You can add your own content here.

## Skills

* React
* TypeScript
* Next.js
* Tailwind CSS

### Other Skills

- Git
- Docker
`

export default function About({ children }: ComponentProps) {
   return (
    <main className="flex min-h-screen flex-col items-center p-24">
        <ReactMarkdown
        components={{
            h1: Heading1,
            h2: Heading2,
            h3: Heading3,
            a: ({node, ...props}) => <InlineLink href={props.href || ''}>{props.children}</InlineLink>,
            ul: ({ children }) =>
            (<ul className='mb-8 flex flex-wrap gap-2'>{children}</ul>) as JSX.Element,
            li: ({ children }) => (<Badge>{children}</Badge>) as JSX.Element
        }}
        >
        {aboutContent}
        </ReactMarkdown>
    </main>
  )
}