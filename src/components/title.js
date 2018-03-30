import React from 'react'

function Title(props) {
  console.log('Title Props', props)
  return (
    <h1 className="f4 fw6 f1-ns lh-title measure mt0 mb1">
      { props.text }
    </h1>
  )
}

export default Title

