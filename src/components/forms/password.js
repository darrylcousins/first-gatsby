import React from 'react'

import { Field } from 'react-form'

import Settings from '../../utils/settings.js'
import Message from '../../components/forms/message.js'

const PasswordField = props => (
  // Use the form field and your custom input together to create your very own input!
  <Field validate={props.validate} field={props.field}>
    { fieldApi => {

      // Remember to pull off everything you dont want ending up on the <input>
      // thats why we pull off onChange, onBlur, and field
      // Note, the ...rest is important because it allows you to pass any
      // additional fields to the internal <input>.
      const { validate, onChange, onBlur, field, ...rest } = props

      const { value, error, warning, success, setValue, setTouched } = fieldApi

      return (
        <div>
          <input
            {...rest}
            value={value || ''}
            type="password"
            autoComplete="current-password"
            onChange={e => {
                setValue(e.target.value)
                if (onChange) {
                  onChange(e.target.value, e)
                }
              }}
              onBlur={e => {
                setTouched()
                if (onBlur) {
                  onBlur(e)
                }
              }}
          />
        </div>
      )
    }}
  </Field>
)

function PasswordInput(props) {

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
      <PasswordField
        field={ name }
        id={ name }
        validate={ validate }
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

export default PasswordInput
