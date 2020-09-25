/* eslint-disable jsx-a11y/label-has-for */

import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import classnames from 'classnames'
import Notice from './Notice'

const initialState = {
  status: 'idle',
  successMessage: '',
  errorMessage: ''
}

export function SimpleForm({ children = () => null, onSubmit, showNotice = true }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOADING': {
        return { ...initialState, status: 'loading' }
      }
      case 'SUCCESS': {
        return {
          ...initialState,
          status: 'success',
          successMessage: action.successMessage || 'Form Submitted.'
        }
      }
      case 'ERROR': {
        return {
          ...initialState,
          status: 'error',
          errorMessage:
            action.errorMessage ||
            'We are having issues submitting this form. Please try again or contact us at hello@reacttraining.com.'
        }
      }
      default:
        return state
    }
  }, initialState)

  const { status, successMessage, errorMessage } = state

  function submit(e) {
    e.preventDefault()
    const form = e.target
    dispatch({ type: 'LOADING' })

    // This pattern allows to either return a promise or not return one
    // from onSubmit()
    const response = onSubmit(serializeForm(e.target, { hash: true }))
    Promise.resolve(response)
      .then((response = {}) => {
        const { message: successMessage } = response
        dispatch({ type: 'SUCCESS', successMessage })
        form.reset()
      })
      .catch(errorMessage => {
        dispatch({ type: 'ERROR', errorMessage })
      })
  }

  return (
    <form onSubmit={submit} className="spacing-small">
      {status === 'success' && showNotice && successMessage && (
        <Notice type="success">
          <p>{successMessage}</p>
        </Notice>
      )}
      {status === 'error' && showNotice && errorMessage && (
        <Notice>
          <p>{errorMessage}</p>
        </Notice>
      )}
      {typeof children === 'function'
        ? children({ status, successMessage, errorMessage })
        : children}
    </form>
  )
}

export function Field({
  children,
  name,
  placeholder,
  label,
  showLabel = true,
  type = 'text',
  className,
  required,
  ...rest
}) {
  const htmlFor = `form-field:${name}`

  return (
    <div className={classnames('form-field-wrap', { required })}>
      {showLabel && (
        <label htmlFor={htmlFor} className="form-field-label">
          {label}
        </label>
      )}
      <div className="form-field-input">
        {children ? (
          typeof children === 'function' ? (
            children({
              id: htmlFor,
              name,
              'aria-label': !showLabel ? label : undefined,
              className: classnames('form-field', className)
            })
          ) : (
            children
          )
        ) : (
          <input
            {...rest}
            id={htmlFor}
            name={name}
            className={classnames('form-field', className)}
            aria-label={!showLabel ? label : undefined}
            placeholder={placeholder}
            required={required}
            type={type}
          />
        )}
      </div>
    </div>
  )
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string
}
