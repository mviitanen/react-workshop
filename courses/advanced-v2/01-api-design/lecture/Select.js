/* eslint-disable jsx-a11y/role-has-required-aria-props */
// See https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html

import * as React from 'react'

export function Select({label, options}) {
  let [isOpen, setIsOpen] = React.useState(false)
  let [selectedOption, setSelectedOption] = React.useState(options[1])
  let listRef = React.useRef()
  let buttonRef = React.useRef()

  // Re-focus the select button when the menu closes, but since it's initially
  // closed we need to skip the initial render
  let rendered = React.useRef(false)
  React.useEffect(() => {
    if (rendered.current && !isOpen) {
      window.requestAnimationFrame(() => {
        buttonRef.current?.focus()
      })
    }

    rendered.current = true
  }, [isOpen])

  return (
    <div className="select">
      <p>{label}</p>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen((state) => !state)
          window.requestAnimationFrame(() => {
            listRef.current?.focus()
          })
        }}
        className="select-button"
        aria-haspopup="listbox"
        id="select-button"
      >
        {selectedOption}
      </button>
      <div
        id="select-list"
        className="select-list"
        role="listbox"
        tabindex={-1}
        hidden={!isOpen}
        // This is the ID of the selected option
        aria-activedescendant={`option-${slugify(selectedOption)}`}
        ref={listRef}
        onBlur={() => {
          setIsOpen(false)
        }}
        onKeyDown={(event) => {
          switch (event.key) {
            case 'Escape':
              setIsOpen(false)
              break
            default:
              break
          }
        }}
      >
        {options.map((o) => {
          return (
          <div
            key={o}
            role="option"
            id={`option-${slugify(o)}})}`}
            className="select-option"
            onClick={(event) => {
              event.preventDefault()
              setSelectedOption(o)
              setIsOpen(false)
            }}
            aria-selected={selectedOption === o || undefined}
          >
            {o}
          </div>
          )
        })}
        
      </div>
    </div>
  )
}

function slugify(string) {
  return string.trim().toLowerCase().replace(/\s+/g, '-')
}
