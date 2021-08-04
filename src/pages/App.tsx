import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Box from '../components/Box';
import Navigation from '../components/Navigation';

import Home from './Home';
import About from './About';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then<any>((res) => setPosts(res.posts));

    //unmount
    return () => {};
  }, []);

  console.log('posts', posts);
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
        <Box
          as="nav"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          px={['3px', '12px']}
          py={['2px', '10px']}
          borderBottom="1px solid grey"
        >
          <Navigation
            navigationItems={[
              { title: 'Home', path: '/', count: posts.length },
              { title: 'About', path: '/about' },
            ]}
          />
          <Box fontSize="3" fontWeight="bold">
            NetContruct
          </Box>
        </Box>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route exact path="/">
                <Home posts={posts} />
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          )}
        />
    </HashRouter>
  );
};

export default App;
