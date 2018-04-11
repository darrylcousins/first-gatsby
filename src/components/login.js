/**
 * @file Provides a `login` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Mutation, Query } from 'react-apollo'
import { Form, Text, Field } from 'react-form'
import gql from 'graphql-tag'

import Client from '../utils/client.js'
import Settings from '../utils/settings.js'
import Input from '../components/forms/input.js'
import PasswordInput from '../components/forms/password.js'
import Message from '../components/forms/message.js'

const Q = gql`
  {
    currentUser {
      id
      username
    }
  }
`

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {loggedIn: false}
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
    let username = data["username"]
    // get a promise
    Client.mutate({"mutation": M})
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
          localStorage.setItem("token", result.tokenAuth.token)
          this.setState({loggedIn: true})
        }
      })
      .catch((errors) => {
        console.log(errors)
        formApi.setError("__all__", "Network error, you may need to reload page")
      })

    console.log(e)
  }

  render() {
    let style = Settings.style
    if (this.state.loggedIn === true) {
      return (
        <Redirect
          to="/profile"
          from="/login"
        />
      )
    }
    return (
      <Query query={ Q } fetchPolicy="network-only">
        {({ client, loading, data: { currentUser } }) => {
          let style = Settings.style
          if (loading) {
            return <span className={ style.navLink }>Loading...</span>
          }
          if (currentUser) {
            return (
              <Redirect
                to="/profile"
                from="/login"
              />
            )
          } else {
            return (
              <Form onSubmit={ this.onSubmit }>
                {formApi => (
                  <form
                    onSubmit={ formApi.submitForm }
                    id="login_form"
                    className={ style.form }>
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
                      className={ style.buttonDefault }
                    >Submit
                    </button>
                  </form>
                )}
              </Form>
            )
          }
        }}
      </Query>
    )
  }
}

export default Login
