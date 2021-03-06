import styles from '../styles/components/App.module.css';
import { ContextProvider } from '../contexts/PostsContext';

import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../pages/Home';

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar />

      <ContextProvider>
        <Home />
      </ContextProvider>

      <Footer />
    </div>
  );
}

export default App;
