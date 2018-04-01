import React from 'react'

import Settings from '../utils/settings.js'

function Title(props) {
  return (
    <h1 className={ Settings.style.title }>
      { props.text }
    </h1>
  )
}

export default Title

