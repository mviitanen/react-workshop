import React, { useState, useLayoutEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

export const BrowseBoardsSidebar: React.FC = () => {
  const query = `(min-width: 900px)`

  const [isWide, setIsWide] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => {
      setIsWide(media.matches)
    }
    media.addEventListener('change', listener)

    setIsWide(media.matches)

    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return isWide ? (
    <aside className="browse-boards-sidebar spacing">
      <RecentBoards />
      <ActiveUsers />
    </aside>
  ) : null
}
