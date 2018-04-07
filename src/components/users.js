/**
 * @file Provides a `Users` component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Settings from '../utils/settings.js'

const query = gql`
  {
    allUsers {
      edges {
        node {
          id,
          username,
          email,
          firstName,
          lastName,
          staff {
            title
          }
        }
      }
    }
  }
`

/**
 * `UserSummary` provides the layout for a user
 * @param {node} user - the user
 */
const UserSummary = ({ user }) => {

  let style = Settings.style

  return (
    <div className="mb4">
      <dl className={ style.dl }>
        <dt className={ style.dt }>full name:</dt>
        <dd className={ style.dd }>{ user.firstName } { user.lastName }</dd>
      </dl>
      <dl className={ style.dl }>
        <dt className={ style.dt }>email:</dt>
        <dd className={ style.dd }>{ user.email }</dd>
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
}

/**
 * `Users` provides the layout for a fetched list of users
 */
export default () => (
  <Query query={ query }>
    {({ loading, error, data }) => {
      if (loading) return <div>loading...</div>
      if (error) return <div>Error! { error.message }</div>

      return (
        <div>
          { data.allUsers.edges.map(user => (
            <UserSummary key={ user.node.id }
                         user={ user.node } />
          ))}
        </div>
      )
    }}
  </Query>
)
