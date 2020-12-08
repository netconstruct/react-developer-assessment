import styles from '../styles/categoriesList.module.scss'
import PropTypes from 'prop-types';
const CategoriesList = ({ categories }) => (
  <ul className={styles.wrapper}>
    {categories?.map((category) => (
      <li key={category.id} className={styles.pill}>
          {category.name}
      </li>
    ))}
  </ul>
);
CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string,value:PropTypes.string })
  ),
};
export default CategoriesList;
