import React from 'react'
import PropTypes from 'prop-types'

const ProductFilterItem: React.FC<ProductFilterItemProps> = ({
  children,
  item,
  onChange,
  selected = false,
}) => {
  // The reason for the odd logic with onChange and checked is because some
  // lectures use this component but without passing props for onChange and selected
  return (
    <div className="no-wrap">
      <label>
        <input
          type="checkbox"
          onChange={onChange ? (e) => onChange(e.target.name) : undefined}
          checked={onChange ? selected : undefined}
          name={item}
        />{' '}
        <span>{children}</span>
      </label>
    </div>
  )
}

ProductFilterItem.propTypes = {
  onChange: PropTypes.func,
  item: PropTypes.string.isRequired,
  selected: PropTypes.bool,
}

export default ProductFilterItem

type ProductFilterItemProps = {
  onChange?: (item: string) => any
  item: string
  selected?: boolean
}
