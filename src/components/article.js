import React from 'react'

import Settings from '../utils/settings.js'

function Article(props) {
  return (
    <article className={  Settings.style.article }>
      { props.children }
    </article>
  )
}

export default Article



