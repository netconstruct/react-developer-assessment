import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from '../styles/components/App.module.css';
import { ContextProvider } from '../contexts/PostsContext';

import Navbar from './Navbar';
import Home from '../pages/Home';
import Details from '../pages/Details';
import Footer from './Footer';

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar />

      <ContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route
              exact
              path="/details/:id"
              render={(routeProps) => (
                <Details postId={routeProps.match.params.id} />
              )}
            />
          </Switch>
        </Router>
      </ContextProvider>

      <Footer />
    </div>
  );
}

export default App;
