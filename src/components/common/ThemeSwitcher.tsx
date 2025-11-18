'use client'
import { lazy, useState } from 'react'
import SunLineIcon from 'remixicon-react/SunLineIcon'
import MoonLineIcon from 'remixicon-react/MoonLineIcon'
import checkDarkTheme from '@/utils/checkDarkTheme'
import IconButton from '@/components/common/reusable/button/IconButton'

export default function ThemeSwitcher() {
  const [isDark, setDark] = useState(checkDarkTheme)

  const toggleDarkTheme = () => {
    document.documentElement.classList.toggle('dark')
    localStorage.theme = isDark ? 'light' : 'dark'
    setDark(!isDark)
  }

  return (
    <IconButton
      className='duration-300'
      icon={isDark ? <MoonLineIcon size={20} /> : <SunLineIcon size={20} />}
      screenReaderText='Toggle theme'
      onClick={toggleDarkTheme}
    />
  )
}
