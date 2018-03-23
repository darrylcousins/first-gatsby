import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
        }
      }
    }
  }
`

function UserSummary(props) {
  console.debug('UserSummary Props', props)
  let user = props.user
  return (
    <dl>
      <dt>
        full name
      </dt>
      <dd>
        { user.firstName } { user.lastName }
      </dd>
      <dt>
        username
      </dt>
      <dd>
        { user.username }
      </dd>
      <dt>
        email
      </dt>
      <dd>
        { user.email }
      </dd>
    </dl>
  )
}


function Users(props) {

  if (props.data.loading) {
    return <div>loading ...</div>
  }

  if (props.data.error) {
    return <div>error ...</div>
  }

  if (!props.data.allUsers) {
    return <div>failed to load users ...</div>
  }

  let users = props.data.allUsers.edges
  console.log(users)

  return (
    <div>
      {
      users.map(
        user => <UserSummary key={ user.node.id }
                      user={ user.node } />
        )
      }
    </div>
  )

}

// hold
const options = {
  options: props => ({
    variables: {
    },
  }),
}

export default graphql(query)(Users)

