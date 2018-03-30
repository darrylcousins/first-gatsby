import React from 'react'

function Lead(props) {
  console.log('Lead Props', props)
  return (
    <p className="f5 f4-ns fw4 b measure dib-m lh-copy">
      { props.text }
    </p>
  )
}

export default Lead


