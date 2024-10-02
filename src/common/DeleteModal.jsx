/* eslint-disable react/prop-types */
import React from "react";

const DeleteModal = ({ isOpen, itemName, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded shadow-lg p-6 w-1/4'>
        <h2 className='text-xl font-semibold mb-4'>Delete {itemName}?</h2>
        <p className='mb-4'>Are you sure you want to delete this item?</p>
        <div className='flex justify-end'>
          <button
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2'
            onClick={onClose}>
            Cancel
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
            onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
