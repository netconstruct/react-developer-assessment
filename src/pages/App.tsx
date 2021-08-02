import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import Box from '../components/Box'
import Navigation from '../components/Navigation'

import Home from './Home';
import About from './About';


function App() {
 
 

  return (
    <Router>
    <div>
      <Box as="nav" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" px="3px">
      <Box fontSize="3" fontWeight="bold">NetContruct</Box>
      <Navigation navigationItems={[{title: "Home", path:"/"}, {title: "About", path:"/about"}]}/>
      </Box>


      <hr />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  </Router>
  )
}

export default App;
