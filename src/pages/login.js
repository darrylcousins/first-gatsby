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

const username_validate = username => !username || username.trim() === '' ? 'Username is a required field' : null
const password_validate = password => !password || password.trim() === '' ? 'Password is a required field' : null

function submitForm(data) {
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
  const form = this
  const options = {
    "mutation": M,
  }
  // got a promise
  const promise = Client.mutate(options)
    .then((data) => {
      const result = data.data.createTokenAuth
      if (result.formErrors != null) {
        // feed error back to form
        console.log(result.formErrors)
        form.formState.errors = result.formErrors
        form.resetAll()
        console.log(form)
      } else {
        const token = result.tokenAuth.token
        console.log(token)
      }
    })
    .catch((errors) => {
      console.log(errors)
    })

}

export default () =>
  <ApolloProvider client={Client}>
    <div>
      <Title text="Login"/>
      <Lead text="Use your username and password to log in."/>
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

