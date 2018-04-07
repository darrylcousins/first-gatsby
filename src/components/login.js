/**
 * @file Provides a `login` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { ApolloProvider, Mutation } from 'react-apollo'
import { Form, Text, Field } from 'react-form'
import gql from 'graphql-tag'

import Settings from '../utils/settings.js'
import Input from '../components/forms/input.js'
import PasswordInput from '../components/forms/password.js'
import Message from '../components/forms/message.js'

class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  username_validate(username) {
    return !username || username.trim() === '' ? 'Username is a required field' : null
  }

  password_validate(password) {
    return !password || password.trim() === '' ? 'Password is a required field' : null
  }

  onSubmit(data, e, formApi) {
    // failed to work out how to use template substitution at this level.
    const M = gql`
      mutation {
        createTokenAuth(data: {username: "${ data["username"] }", password: "${ data["password"] }"} ) {
          status
          formErrors
          tokenAuth {
            token
          }
        }
      }
    `
    // get a promise
    const promise = Client.mutate({"mutation": M})
      .then((data) => {
        var result = data.data.createTokenAuth
        if (result.formErrors != null) {
          formApi.setFormState("submitting", false)
          const errors = JSON.parse(result.formErrors)
          var field
          for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
              // formApi needs to know that it has a field with key name
              // using username works well enough for me
              // TODO create a hidden field along the lines of Password
              // and call that "__all__""???
              field = key
              if (field == "__all__") field = "username"
              formApi.setError(field, errors[key][0])
            }
          }
        } else {
          const token = result.tokenAuth.token
          localStorage.setItem("token", token)
          window.location.replace("/")
        }
      })
      .catch((errors) => {
        console.log(errors)
        formApi.setError("__all__", "Network error, you may need to reload page")
      })

    console.log(e)
  }

  render() {
    return (
      <Form onSubmit={ this.onSubmit }>
        {formApi => (
          <form
            onSubmit={ formApi.submitForm }
            id="login_form"
            className={ Settings.style.form }>
            <div>{ formApi.errors && <Message name="__all__" type="error" messages={ formApi.errors }/> }</div>
            <Input
              formApi={ formApi }
              name="username"
              title="Username"
              help_text="Please enter your username."
              validate={ this.username_validate }
            />
            <PasswordInput
              formApi={ formApi }
              name="password"
              title="Password"
              help_text="Please enter your password."
              validate={ this.password_validate }
            />
            <button
              type="submit"
              className={ Settings.style.buttonDefault }
            >Submit
            </button>
          </form>
        )}
      </Form>
    )
  }
}

export default Login
