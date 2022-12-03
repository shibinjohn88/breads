const React = require('react')
const Default = require('./layouts/default')

function Page404 () {
    return (
       <Default>
         <h2>404</h2>
         <h3> bread not found <a href='/breads/'>Go to home</a></h3>
        </Default>
    )
}

module.exports = Page404