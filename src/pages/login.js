import React from 'react'
import { ApolloProvider, Mutation } from 'react-apollo'
import { Form, Text, Field } from 'react-form'
import gql from 'graphql-tag'
import { Query, graphql } from 'react-apollo'

import Settings from '../utils/settings.js'
import Client from '../utils/client.js'
import Title from '../components/title.js'
import Lead from '../components/lead.js'
import Input from '../components/forms/input.js'
import PasswordInput from '../components/forms/password.js'
import Message from '../components/forms/message.js'

const username_validate = username => (
  !username || username.trim() === '' ? 'Username is a required field' : null
)
const password_validate = password => (
  !password || password.trim() === '' ? 'Password is a required field' : null
)

const submitForm = (data, e, formApi) => {
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

export default () =>
  <ApolloProvider client={Client}>
    <div>
      <Title text="Login"/>
      <Lead text="Enter your username and password to log in."/>
      <Form onSubmit={ submitForm }>
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
              validate={ username_validate }
            />
            <PasswordInput
              formApi={ formApi }
              name="password"
              title="Password"
              help_text="Please enter your password."
              validate={ password_validate }
            />
            <button
              type="submit"
              className={ Settings.style.buttonDefault }
            >Submit
            </button>
          </form>
        )}
      </Form>
    </div>
  </ApolloProvider>

