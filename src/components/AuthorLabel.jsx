// import React from 'react'
// import styles from '../styles/authorLabel.module.scss'
const AuthorLabel = ({ name, avatar }) => (
  <div>
    <img src={avatar} aria-hidden="true" alt="avatar" />
    <strong>{name}</strong>
  </div>
);
export default AuthorLabel;
