/**
 * @file Provides an `Message` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Form, Text, Field } from 'react-form'

import Settings from '../../utils/settings.js'

export default (props) => {

  const { name, type, messages } = props

  if (!(name in messages)) return null

  const color = type == "error" && "red"
  const text = messages[name]

  return (
    <div className={ Settings.style.message }>
      <span className={ color }>{ text }</span>
    </div>
  )
}
