/**
 * @file Provides an `InputWrapper` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import { Text } from 'react-form'

import Settings from '../../utils/settings.js'
import Message from '../../components/forms/message.js'

export default (props) => {

  const { formApi, name, title, help_text, validate, children, ...rest } = props

  let style = Settings.style

  return (
    <div className={ style.inputWrapper }>
      <label
        htmlFor={ name }
        className={ style.label }
      >{ title }</label>
      { children }
      <div>{ formApi.errors && <Message name={ name } type="error" messages={ formApi.errors }/> }</div>
      <div>{ formApi.warnings && <Message name={ name } type="warning" messages={ formApi.warning }/> }</div>
      <div>{ formApi.success && <Message name={ name } type="success" messages={ formApi.success }/> }</div>
      <small
        id={ name + "-help-text" }
        className={ style.inputHelpText }
      >{ help_text }
      </small>
    </div>
  )
}
