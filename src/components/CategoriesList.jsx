// import React from 'react'
// import styles from '../styles/CategoriesList.module.scss'
import PropTypes from 'prop-types';
const CategoriesList = ({ categories, onClickItem }) => (
  <ul>
    {categories?.map((category) => (
      <li key={category.id}>
        <button value={category.id} onClick={onClickItem}>
          {category.name}
        </button>
      </li>
    ))}
  </ul>
);
CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
  ),
  onClickItem: PropTypes.func,
};
export default CategoriesList;
