/**
 * @file Provides a `Profile` component for users
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Settings from '../utils/settings.js'

const Q = gql`
  {
    currentUser {
      id
      username
      firstName
      lastName
      email
      staff {
        title
        comment
      }
    }
  }
`

class Profile extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  render(refetch) {
    let style = Settings.style
    if ( this.props.match !== undefined) {
      console.log(this.props.match.params.username)
      return (
        <div>{ this.props.match.params.username }</div>
      )
    }
    return (
      <Query
        query={ Q }
        fetchPolicy={ refetch ? 'cache-and-network': 'cache-first' }
      >
        {({ loading, error, data: { currentUser } }) => {
          if (loading) return <span>loading....</span>
          if (error) return <div><strong>Error:</strong> { error.message }</div>
          if (currentUser == null) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: this.props.location }
                }}
              />
            )
          }
          let user = currentUser
          return (
            <div>
              <h2>Welcome back {user.firstName}</h2>
              <p>
                This is what we have on you:
              </p>
              <dl className={ style.dl }>
                <dt className={ style.dt }>email:</dt>
                <dd className={ style.dd }>{ user.email }</dd>
              </dl>
              <dl className={ style.dl }>
                <dt className={ style.dt }>full name:</dt>
                <dd className={ style.dd }>{ user.firstName } { user.lastName }</dd>
              </dl>
              <dl className={ style.dl }>
                <dt className={ style.dt }>username:</dt>
                <dd className={ style.dd }>{ user.username }</dd>
              </dl>
              <dl className={ style.dl }>
                <dt className={ style.dt }>role:</dt>
                <dd className={ style.dd }>{ user.staff.title }</dd>
              </dl>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Profile
