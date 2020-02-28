function useMediaQuery(query, onChange) {
    const [matches, setMatches] = useState(
      window.matchMedia(query).matches
    )
  
    useEffect(() => {
      const media = window.matchMedia(query)
      const listener = event => setMatches(event.matches)
      media.addListener(listener)
  
      return () => media.removeListener(listener)
    }, [query])
  
    return matches
  }