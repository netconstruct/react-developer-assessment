import PropTypes from 'prop-types';
const Select = ({
  options = [],
  onChange,
  value,
  hasEmptyValue = true,
  multi = false,
  id='selectInput'
}) => (
  <select id={id} onChange={onChange} value={value} multi={multi}>
    {hasEmptyValue && <option disabled={true}>Please Select</option>}
    {options?.map((opt) => {
      <option key={opt.value} value={opt.value}>{opt.label}</option>;
    })}
  </select>
);
Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.node, value: PropTypes.string })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id:PropTypes.string,
  hasEmptyValue: PropTypes.bool,
  multi: PropTypes.bool,
};
export default Select;