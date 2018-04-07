/**
 * @file Provides a `NavProfile` component for the navbar
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { ApolloProvider } from 'react-apollo'

import Client from '../utils/client.js'
import Settings from '../utils/settings.js'

const Q = gql`
  {
    currentUser {
      id
      username
    }
  }
`

class NavProfile extends React.Component {

  constructor(props) {
    super(props)
  }

  logout(client) {
    localStorage.removeItem('token')
    client.resetStore()
  }

  render() {
    return (
      <ApolloProvider client={ Client }>
        <Query query={ Q } fetchPolicy="network-only">
          {({ client, loading, data: { currentUser } }) => {
            let style = Settings.style
            if (loading) {
              return <span className={ style.navLink }>Loading...</span>
            }
            if (currentUser) {
              return (
                <span>
                  <Link to="/profile" title="Profile"
                    className={ style.navLink }>
                    { currentUser.username }
                  </Link>
                  <a className={ style.navLink }
                    onClick={() => {
                      // call your auth logout code then reset store
                      this.logout(client)
                    }}
                  >
                    Log out
                  </a>
                </span>
              )
            }
            return (
              <Link to="/login" title="Login"
                className={ style.navLink }>
                Login
              </Link>
            )
          }}
        </Query>
      </ApolloProvider>
    )
  }
}

export default NavProfile
