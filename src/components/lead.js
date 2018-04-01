import React from 'react'

import Settings from '../utils/settings.js'

function Lead(props) {
  return (
    <p className={ Settings.style.lead }>
      { props.text }
    </p>
  )
}

export default Lead


