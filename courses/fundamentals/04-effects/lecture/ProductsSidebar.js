import React, { useState, useEffect } from 'react'
import ProductFilters from 'YesterTech/ProductFilters'

// let z = 10
// function add(x, y) {
//   z = z + x
//   return x + y
// }

// useEffect(
//   () => {
//     // side effect code
//   },
//   [
//     /* var to keep in sync with */
//   ]
// )

// [] => called on mount
// [populated] => called on mount, whenever `populated` changes
// empty => called on mount, whenever any state changes

function useMedia(windowSizeQuery) {
  const [matches, setMatches] = useState(
    window.matchMedia(windowSizeQuery).matches
  )

  useEffect(() => {
    const media = window.matchMedia(windowSizeQuery)
    const listener = () => {
      setMatches(media.matches)
    }
    media.addListener(listener)

    // cleanup function
    return () => {
      media.removeListener(listener)
    }
  }, [windowSizeQuery])

  return matches
}

function ProductsSidebar() {
  let windowSizeQuery = '(min-width: 800px)'
  let isWide = useMedia(windowSizeQuery)

  return (
    <>
      {isWide && (
        <aside>
          <ProductFilters />
        </aside>
      )}
    </>
  )
}

// class ProductsSidebar2 extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       matches: window.matchMedia('(min-width: 800px)').matches
//     }
//   }

//   setup() {
//     this.media = window.matchMedia('(min-width: 800px)')
//     this.listener = () => {
//       this.setState({ matches: this.media.matches }, () => {
//         // aslkdjflksa
//       })
//     }
//     this.media.addListener(this.listener)
//   }

//   cleanup() {
//     this.media.removeListener(this.listener)
//   }

//   componentDidMount() {
//     this.setup()
//   }

//   componentWillUnmount() {
//     this.cleanup()
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps !== this.props) {
//       this.cleanup()
//       this.setup()
//     }
//   }

//   render() {
//     return <>{this.state.matches && <aside>...</aside>}</>
//   }
// }

export default ProductsSidebar
