import React from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import queryString from 'query-string'

import Heading from 'YesterTech/Heading'
import ProductFilterItem from 'YesterTech/ProductFilterItem'

const ProductFilterList: React.FC<ProductFilterListProps> = ({ urlKey, list, label }) => {
  let location = useLocation()
  let history = useHistory()
  let search = queryString.parse(location.search) || null
  let found = search[urlKey]

  let selected: string[] = []
  if (found) {
    selected = Array.isArray(found) ? found : found.split(',')
  }

  function isSelected(item: string) {
    return selected && selected.includes(item)
  }

  function toggleItem(item: string) {
    // Remove or Add
    const newSelected = isSelected(item)
      ? selected.filter((c) => c !== item)
      : selected.concat([item])
    const newSearch = {
      ...search,
      page: undefined,
      [urlKey]: newSelected.length ? newSelected.join(',') : undefined,
    }
    history.push(`${location.pathname}?${queryString.stringify(newSearch)}`)
  }

  function getClearLink() {
    const newSearch = { ...search, page: undefined, [urlKey]: undefined }
    return `${location.pathname}?${queryString.stringify(newSearch)}`
  }

  return (
    <section className="spacing-small">
      <Heading size={3}>{label}</Heading>
      {Array.isArray(list) &&
        list.map((item) => {
          return (
            <ProductFilterItem
              key={item}
              item={item}
              onChange={toggleItem}
              selected={isSelected(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </ProductFilterItem>
          )
        })}
      {selected.length > 0 && (
        <div className="text-small">
          <Link to={getClearLink()}>Show all {label}</Link>
        </div>
      )}
    </section>
  )
}

export default ProductFilterList

type ProductFilterListProps = {
  urlKey: string
  list?: string[] | undefined
  label: string
}
