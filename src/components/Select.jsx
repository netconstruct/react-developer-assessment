import PropTypes from 'prop-types';
const Select = ({
  options = [],
  onChange,
  value,
  hasEmptyValue = true,
  id = 'selectInput',
}) => (
  <select id={id} onChange={onChange} value={value}>
    {hasEmptyValue && (
      <option disabled={true} value="">
        Please Select
      </option>
    )}
    {options?.map((opt) => (
      <option key={opt.id} value={opt.id}>
        {opt.label}
      </option>
    ))}
  </select>
);
Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.node, id: PropTypes.string })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  hasEmptyValue: PropTypes.bool,
  multi: PropTypes.bool,
};
export default Select;
