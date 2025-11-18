'use client'
import { projects } from '@/data/projects'
import ProjectProps from '@/types/components/ProjectProps'
import clsx from 'clsx'

export default function Projects() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <ul>
        {projects.map((project: ProjectProps) => (
          <li
            key={project.id}
            className={clsx(
              'rounded-xl border border-slate-500/20 dark:border-slate-600/30',
              'bg-slate-100/20 dark:bg-slate-600/20',
              'hover:bg-slate-100/30 dark:hover:bg-slate-600/30',
              'p-4 mb-4'
            )}
          >
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <div className="text-lg">{project.description}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStacks.map((tech) => (
                <span key={tech} className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
