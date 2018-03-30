import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Form, Text, Field } from 'react-form'

import client from '../utils/client.js'
import Title from '../components/title.js'
import Lead from '../components/lead.js'

const ErrorMessage = ({ text }) => (
  <small
    className="f6 lh-copy black-60 db mb2"
  >{ text }</small>
)

const PasswordField = props => (
  // Use the form field and your custom input together to create your very own input!
  <Field validate={props.validate}>
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

const username_validate = username => !username || username.trim() === '' ? 'Username is a required field' : null
const password_validate = password => !password || password.trim() === '' ? 'Password is a required field' : null

export default () =>
  <ApolloProvider client={client}>
    <div>
      <Title text="Login"/>
      <Lead text="Use your username and password to log in."/>
      <Form>
        {formApi => (
          <form
            onSubmit={formApi.submitForm}
            id="login_form"
            className="pa4 black-80 tl">
            <div className="measure-narrow">
              <label
                htmlFor="username"
                className="f6 b db mb2"
              >Username</label>
              <Text
                field="username"
                name="username"
                id="username"
                label="Username"
                validate={ username_validate }
                className="input-reset ba b--black-20 br2 pa2 mb2 db w-100"
                aria-describedby="username-desc"
              />
              <small
                id="username-desc"
                className="f6 lh-copy black-60 db mb2"
              >Please enter your username.
              </small>
            </div>
            <div className="measure-narrow">
              <label
                htmlFor="password"
                className="f6 b db mb2"
              >Password</label>
              <PasswordField
                className="input-reset ba b--black-20 br2 pa2 mb2 db w-100"
                id="password"
                validate={ password_validate }
                aria-describedby="password-desc"
              />
              <small
                id="password-desc"
                className="f6 lh-copy black-60 db mb2"
              >Please enter your password.
              </small>
            </div>
            <div>{ formApi.errors && <code>{ formApi.errors }</code> }</div>
            <button
              type="submit"
              className="f6 link dim br2 ph3 pv2 mb2 fw8 ba b--dark-gray-black near-black bg-moon-gray"
            >Submit
            </button>
          </form>
        )}
      </Form>
    </div>
  </ApolloProvider>

