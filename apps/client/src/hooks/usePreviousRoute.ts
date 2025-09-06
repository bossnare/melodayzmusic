/*'use client';

import {usePathname, useRouter} from 'next/navigation'
import {useEffect, useState, useRef} from 'react'

export function usePreviousRoute() {
  const pathname = usePathname()
  const prevPath = useRef<string | null>(null)
  const [previous, setPrevious] = useState(null)

  useEffect(() => {
    setPrevious(prevPath.current)
    prevPath.current = pathname
  }, [pathname])

  alert(previous)
  return previous
}*/
