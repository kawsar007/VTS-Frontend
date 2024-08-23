/* eslint-disable react/prop-types */
const SelectField = ({ options, onChange }) => {
  return (
    <select
      onChange={onChange}
      className="mt-1.5 w-1/2 mx-auto rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
    >
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.class}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
