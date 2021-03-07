import { BrowserRouter as Router } from 'react-router-dom';

import styles from '../styles/components/App.module.scss';
import { ContextProvider } from '../contexts/PostsContext';

import Navbar from './Navbar';
import Footer from './Footer';
import Routes from './Routes';

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar />

      <ContextProvider>
        <Router>
          <Routes />
        </Router>
      </ContextProvider>

      <Footer />
    </div>
  );
}

export default App;
