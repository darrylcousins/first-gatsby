import React from 'react'

// User
export default (props) {
  console.log('Props', props)
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
