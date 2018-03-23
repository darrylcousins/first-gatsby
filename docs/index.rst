::

Python virtual environment::

  $ virtualenv starter-one
  $ cd starter-one
  $ source bin/activate

Install `nodeenv` into same directory and activate::

  (starter-one) $ pip install nodeenv
  (starter-one) $ nodeenv -p
  (starter-one) $ source bin/activate

With local `npm` install `gatsby` and `react`/`apollo` stack::

  (starter-one) $ npm install --save gatsby-cli
  (starter-one) $ npm install --save apollo-client-preset react-apollo graphql-tag graphql

Create a barebones gatsby site::

  (starter-one) $ gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world

Test it::

  (starter-one) $ cd gatsby-starter-hello-world
  (starter-one) $ gatsby develop
