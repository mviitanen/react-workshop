import React, { useRef, useEffect } from 'react'
import { render } from 'react-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
})

function useExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `)

  return { loading, error, data }
}

const stack = [{ type: 'ref', value: { current: null } }]

function ExchangeRates() {
  // { current: null }
  const searchRef = useRef(null)

  useEffect(() => {
    if (!searchRef.current) {
      return
    }

    setTimeout(() => {
      searchRef.current.focus()
    })
  }, [])

  const { loading, error, data } = useExchangeRates()

  if (loading) {
    return (
      <div>
        <input
          ref={searchRef}
          style={{
            fontSize: '3em',
          }}
          type="search"
          placeholder="Search for currency"
        />
        <em>Loading...</em>
      </div>
    )
  }

  if (error) {
    return <div>Something failed! 😡</div>
  }

  return (
    <div>
      {data.map(rate => {
        return (
          <div>
            {rate.currency}: {rate.rate}
          </div>
        )
      })}
    </div>
  )
}

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <ExchangeRates />
    </div>
  </ApolloProvider>
)

render(<App />, document.getElementById('root'))
