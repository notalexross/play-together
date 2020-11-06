import React from "react"
import { Link } from "react-router-dom"

export default function({ children }) {
  return (
    <Link to="/">
        {children}
    </Link>
  )
}