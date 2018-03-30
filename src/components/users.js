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
    <dl className="f6 lh-title mv2 bt b--black-10">
      <dt className="b">
        full name:
      </dt>
      <dd className="ml0 gray">
        { user.firstName } { user.lastName }
      </dd>
      <dt className="b">
        username:
      </dt>
      <dd className="ml0 gray">
        { user.username }
      </dd>
      <dt className="b">
        email:
      </dt>
      <dd className="ml0 gray">
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

