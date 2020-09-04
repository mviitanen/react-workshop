import React, { useState } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ label, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="disclosure">
      <button className="disclosure-button" onClick={() => setOpen(!open)}>
        {open ? <FaAngleDown /> : <FaAngleRight />}
        {label}
      </button>
      {open && <div className="disclosure-panel">{children}</div>}
    </div>
  )
}
