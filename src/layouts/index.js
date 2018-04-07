/**
 * @file Provides a `Lead` layout component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'

import Settings from '../utils/settings.js'

export default ({ children }) =>
  <div className="w-100 sans-serif">
    <Helmet>
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css"/>
    </Helmet>
    <div className="center w85">
      <header>
        <div className="w-100 pa3 ph5-ns bg-white">
          <div className="db dt-ns mw9 center w-100">
            <div className="db dtc-ns v-mid tl w-50">
              <Link to="/" className={ Settings.style.homeLink } title="Home">
                Work
                <div className="dib">
                  <small className="nowrap f6 ml1 mt2 mt3-ns pr2 black-70 fw2">v0.0.0</small>
                </div>
              </Link>
            </div>
            <nav className="db dtc-ns v-mid w-100 tl tr-ns mt2 mt0-ns">
              <Link title="School on GitHub"
                to="https://github.com/darrylcousins/school"
                className={ Settings.style.navLink }>
                GitHub
              </Link>
              <Link to="/login" title="Login"
                className={ Settings.style.navLink }>
                Login
              </Link>
            </nav>
          </div>
        </div>
            <div className="ph3 ph5-ns w-100 bg-transparent pv3 mb1 mb2-ns bt bb b--black-10 overflow-auto">
              <Link to="/users" title="Users"
                className={ Settings.style.navLink }>
                Users
              </Link>
            </div>
      </header>
      <div className="ph3 ph5-ns">
        <div className="cf mw9 center tc-m">
          <div className="pb3 pb4-ns pt3 pt4-ns mt0 black-70 fl-l w-50-l">
            <div className="ph3 pv1 background-gray">
              { children() }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
