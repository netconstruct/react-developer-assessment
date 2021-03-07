import { AnimatePresence } from 'framer-motion';
import { Route, Switch, useLocation } from 'react-router';

import Details from '../pages/Details';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

function Routes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/details/:id"
          render={(routeProps) => (
            <Details postId={routeProps.match.params.id} />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

export default Routes;
