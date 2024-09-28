/* eslint-disable react/prop-types */

const TableHeader = ({ title, setShowModal }) => {
  return (
    <div className='flex justify-between items-center border border-gray-300 mb-4 p-2 rounded-md'>
      <h3 className='text-2xl font-bold'>{title}</h3>
      <button
        onClick={() => setShowModal(true)}
        className='px-5 py-1 rounded-md bg-[#20B486] text-white font-medium'>
        Create
      </button>
    </div>
  );
};

export default TableHeader;
