/**
 * @file Provides a html root document - copied from `.cache/default_html.js`
 * @author Darryl Cousins <darryljcousins@gmail.com>
 * My additions noted below
 * 1. added the tachyons stylesheet following the pattern of stylesStr
 */
import React from "react"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

let tachyons
// my hope being that I will get this css file compiled into gatsby for production
if (process.env.NODE_ENV === `development`) {
  try {
    tachyons = require(`!raw-loader!../static/tachyons.min.css`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }
    let tachyons_css = null
    if (process.env.NODE_ENV === `development`) {
      tachyons_css = (
        <style
          id="tachyons-css"
          dangerouslySetInnerHTML={{ __html: tachyons }}
        />
      )
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
          {css}
          {tachyons_css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
