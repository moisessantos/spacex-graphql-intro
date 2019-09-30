import React from 'react'

export default function BooleanItem({children, toggle}) {
  return (
    <span className={toggle ? 'text-success' : 'text-danger' }>{children}</span>
  )
}
