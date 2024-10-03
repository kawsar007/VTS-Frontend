/* eslint-disable react/prop-types */

const THead = ({ columns }) => {
  return (
    <thead className='ltr:text-left rtl:text-right'>
      <tr>
        {columns.map((column, index) => (
          <th key={index} className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default THead;