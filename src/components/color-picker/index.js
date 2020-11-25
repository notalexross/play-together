import React from 'react'
import { Input } from './styles'

export default function ColorPicker({ ...restProps }) {
  return <Input type="color" {...restProps}/>
}