import React from 'react'

import { Text } from 'react-form'

import Settings from '../../utils/settings.js'
import Message from '../../components/forms/message.js'
import InputWrapper from '../../components/forms/input_wrapper.js'

function Input(props) {

  const { formApi, name, title, help_text, validate, ...rest } = props

  var inputStyle = Settings.style.inputDefault

  if (formApi.errors && name in formApi.errors) inputStyle = Settings.style.inputError
  if (formApi.warnings && name in formApi.warnings) inputStyle = Settings.style.inputWarning
  if (formApi.success && name in formApi.success) inputStyle = Settings.style.inputSuccess

  return (
    <InputWrapper
      formApi={ formApi }
      name={ name }
      title={ title }
      help_text={ help_text }
      validate={ validate }
    >
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
    </InputWrapper>
  )
}

export default Input



