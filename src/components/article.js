import React from 'react'

function Article(props) {
  console.log('Article Props', props)
  return (
    <article className="tl">
      { props.children }
    </article>
  )
}

export default Article



