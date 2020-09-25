import React, { useState, useRef, useEffect, useMemo } from 'react'

const queueRenders = []

function Tweet({ id, options }) {
  const tweetRef = useRef()

  useEffect(() => {
    function renderTweet() {
      tweetRef.current.innerHTML = ''
      window.twttr.widgets.createTweetEmbed(id, tweetRef.current, options)
    }

    if (!window.twttr) {
      if (queueRenders.length === 0) {
        let script = document.createElement('script')
        script.setAttribute('src', '//platform.twitter.com/widgets.js') // window.twttr
        document.body.appendChild(script)
        script.onload = () => {
          queueRenders.forEach(cb => cb())
        }
      }

      queueRenders.push(renderTweet)
    } else {
      renderTweet()
    }
  }, [id, options])

  return <div ref={tweetRef} />
}

export default function TwitterFeed() {
  const [show, setShow] = useState(true)
  const [theme, setTheme] = useState('light')
  const [_, forceUpdate] = useState()

  const options = useMemo(() => {
    return {
      theme
    }
  }, [theme])

  return (
    <>
      <div className="horizontal-spacing">
        <button onClick={() => setShow(!show)} className="button">
          Show Tweets: {show ? 'On' : 'Off'}
        </button>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="button">
          Theme
        </button>
        <button onClick={() => forceUpdate({})} className="button">
          update
        </button>
      </div>
      {show && (
        <div>
          <Tweet id="1274126046648864768" options={options} />
          <Tweet id="1294327194009952256" options={options} />
        </div>
      )}
    </>
  )
}
