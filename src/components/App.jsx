import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from '../components/NavBar/NavBar'
import Hero from '../components/Hero/Hero'
import Detail from '../components/Detail/Detail'

// Retrieve the data from the mock API. DONE
// Output the data in a list, including properties from the data that are appropriate for a list view. DONE
// Implement a category filter - this can be single or multi-select. DONE
// Implement pagination - this can be traditional numbered pages or "load more". DONE
// Use semantic markup where possible. DONE
// Create a responsive layout with HTML and CSS.

// Use client-side routing to create a "detail" page. DONE
// Persist filter state in the query string. 
// Include animated transitions between application state, e.g. when filtering.
// Convert the application to use TypeScript instead of JavaScript.
// Use a CSS preprocessor or CSS-in-JS rather than plain CSS. DONE



function App() {

  return (
      <Router>
      <NavBar />
        <Switch>
        <Route exact path="/" component={Hero} exact />
        <Route path="/:id" component={Detail} exact />
        </Switch>
      </Router>
  )
}

export default App;
