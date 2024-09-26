/* eslint-disable react/prop-types */
const SelectInput = ({ label, value, onChange, options, id }) => (
  <div>
    <label htmlFor={id} className='block text-sm font-medium text-gray-900'>
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className='mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm'>
      <option value=''>Please select</option>
      {options.map((item, i) => (
        <option key={i} value={item.value}>
          {item.label || item.key}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
