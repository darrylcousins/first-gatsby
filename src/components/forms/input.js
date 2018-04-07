/**
 * @file Provides an `Input` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'

import { Text } from 'react-form'

import Settings from '../../utils/settings.js'
import Message from '../../components/forms/message.js'
import InputWrapper from '../../components/forms/input_wrapper.js'

export default (props) => {

  const { formApi, name, title, help_text, validate, ...rest } = props

  let style = Settings.style
  let inputStyle = style.inputDefault

  if (formApi.errors && name in formApi.errors) inputStyle = style.inputError
  if (formApi.warnings && name in formApi.warnings) inputStyle = style.inputWarning
  if (formApi.success && name in formApi.success) inputStyle = style.inputSuccess

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
