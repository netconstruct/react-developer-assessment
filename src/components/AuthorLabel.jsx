import styles from '../styles/authorLabel.module.scss'
const AuthorLabel = ({ name, avatar }) => (
  <div className={styles.wrapper}>
    <img src={avatar} aria-hidden="true" alt="avatar" className={styles.avatar}/>
    <strong>{name}</strong>
  </div>
);
export default AuthorLabel;
