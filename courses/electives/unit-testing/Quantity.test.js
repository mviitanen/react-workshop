/* eslint-disable import/first */

import React from 'react'
import Quantity from './Quantity'

/**
 * With React Testing Library
 */

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Quantity', () => {
  afterEach(cleanup)

  it('should start with 0', () => {
    // Given we have a quantity component
    const { getByTestId } = render(<Quantity />)

    // When nothing happens...
    const minutes = getByTestId('quantity') // [data-testid="quantity"]

    // Then the value should be 0
    expect(minutes.value).toEqual('0')
  })

  it('should not allow subtraction when quantity is already 0', () => {
    const { getByTestId } = render(<Quantity />)
    const quantity = getByTestId('quantity')
    const subtract = getByTestId('subtract-button')

    // Given the quantity...
    expect(quantity.value).toEqual('0')

    // When the user clicks subtract...
    fireEvent.click(subtract)

    // The the value should still be 0
    expect(quantity.value).toEqual('0')
  })

  it('should add', () => {
    const { getByTestId } = render(<Quantity />)
    const quantity = getByTestId('quantity')
    const add = getByTestId('add-button')
    fireEvent.click(add)
    expect(quantity.value).toEqual('1')
  })

  it('should subtract', () => {
    const { getByTestId } = render(<Quantity />)
    const quantity = getByTestId('quantity')
    const add = getByTestId('add-button')
    const subtract = getByTestId('subtract-button')
    // Since this component is uncontrolled and always starts at 0,
    // we'll add first to test subtract
    fireEvent.click(add)
    expect(quantity.value).toEqual('1')

    fireEvent.click(subtract)
    expect(quantity.value).toEqual('0')
  })

  it('should add (up arrow)', () => {
    const { getByTestId } = render(<Quantity />)
    const quantity = getByTestId('quantity')

    // When..
    fireEvent.keyDown(quantity, { key: 'ArrowUp' })

    expect(quantity.value).toEqual('1')
  })

  it('should subtract (down arrow)', () => {
    const { getByTestId } = render(<Quantity />)
    const quantity = getByTestId('quantity')
    fireEvent.keyDown(quantity, { key: 'ArrowUp' })
    fireEvent.keyDown(quantity, { key: 'ArrowDown' })
    expect(quantity.value).toEqual('0')
  })
})

/**
 * The same tests with React Test-Utils
 */

import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe('Quantity', () => {
  it('should start with 0', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })

    const input = container.querySelector('[data-testid="quantity"]')
    expect(input.value).toBe('0')
  })

  it('should not allow subtraction when quantity is 0', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const subtractButton = container.querySelector('[data-testid=subtract-button]')
    const input = container.querySelector('[data-testid="quantity"]')
    expect(input.value).toBe('0')
    act(() => {
      subtractButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('0')
  })

  it('should add', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const addButton = container.querySelector('[data-testid=add-button]')
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('1')
  })

  it('should subtract', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const subtractButton = container.querySelector('[data-testid=subtract-button]')
    const addButton = container.querySelector('[data-testid=add-button]')
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    act(() => {
      subtractButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('0')
  })

  it('should add (up arrow)', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    })
    expect(input.value).toBe('1')
  })

  it('should add (down arrow)', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    })
    act(() => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    })
    expect(input.value).toBe('0')
  })
})
