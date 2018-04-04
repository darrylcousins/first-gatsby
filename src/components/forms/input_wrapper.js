import React from 'react'

import { Text } from 'react-form'

import Settings from '../../utils/settings.js'
import Message from '../../components/forms/message.js'

function InputWrapper(props) {

  const { formApi, name, title, help_text, validate, children, ...rest } = props

  return (
    <div className={ Settings.style.inputWrapper }>
      <label
        htmlFor={ name }
        className={ Settings.style.label }
      >{ title }</label>
      { children }
      <div>{ formApi.errors && <Message name={ name } type="error" messages={ formApi.errors }/> }</div>
      <div>{ formApi.warnings && <Message name={ name } type="warning" messages={ formApi.warning }/> }</div>
      <div>{ formApi.success && <Message name={ name } type="success" messages={ formApi.success }/> }</div>
      <small
        id={ name + "-help-text" }
        className={ Settings.style.inputHelpText }
      >{ help_text }
      </small>
    </div>
  )
}

export default InputWrapper




