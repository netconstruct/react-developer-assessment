import PropTypes from 'prop-types';
const MultiSelect = ({ options = [], onChange, values = [] }) => (
  <ul>
    {options?.map((opt) => (
      <li key={opt.id}>
        <label htmlFor={opt.id}>{opt.label}</label>
        <input
          type="checkbox"
          value={opt.id}
          checked={values.includes(opt.id)}
          onChange={onChange}
        />
      </li>
    ))}
  </ul>
);
MultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.node, id: PropTypes.string })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
};
export default MultiSelect;
