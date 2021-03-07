import styles from '../styles/components/Navbar.module.scss';

import Logo from '../assets/images/Logo.svg';

function Navbar() {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navContent}>
        <img className={styles.logo} src={Logo} alt="NetConstruct" />

        <div>
          <span>react-developer-assessment</span>
          <p>
            by{' '}
            <a href="https://pedroklepa.com" rel="noreferrer" target="_blank">
              Pedro Klepa
            </a>
          </p>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
