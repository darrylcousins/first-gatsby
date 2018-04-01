import React from 'react'

import { Text } from 'react-form'

import Settings from '../../utils/settings.js'
import Message from '../../components/forms/message.js'

function Input(props) {

  const { formApi, name, title, help_text, validate, ...rest } = props

  var inputStyle = Settings.style.inputDefault

  if (formApi.errors && name in formApi.errors) inputStyle = Settings.style.inputError
  if (formApi.warnings && name in formApi.warnings) inputStyle = Settings.style.inputError
  if (formApi.success && name in formApi.success) inputStyle = Settings.style.inputSuccess

  return (
    <div className={ Settings.style.inputWrapper }>
      <label
        htmlFor={ name }
        className={ Settings.style.label }
      >{ title }</label>
      <Text
        field={ name }
        name={ name }
        id={ name }
        label={ name }
        validate={ validate }
        autoComplete={ name }
        aria-describedby={ name + "-help-text" }
        className={ inputStyle }
      />
      <small
        id={ name + "-help-text" }
        className={ Settings.style.inputHelpText }
      >{ help_text }
      </small>
      <div>{ formApi.errors && <Message name={ name } type="error" messages={ formApi.errors }/> }</div>
      <div>{ formApi.warnings && <Message name={ name } type="warning" messages={ formApi.warning }/> }</div>
      <div>{ formApi.success && <Message name={ name } type="success" messages={ formApi.success }/> }</div>
    </div>
  )
}

export default Input



