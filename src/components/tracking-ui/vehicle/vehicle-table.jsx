/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";

const VehicleTable = ({
  userVehicle,
  handleSelectVehicle,
  handleSelectAllVehicle,
  selectAllVehicle,
  selectVehicle,
  checkedVehicle,
}) => {
  const [searchCar, setSearchCar] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleActionClick = (id) => {
    setOpenDropdownId(id === openDropdownId ? null : id);
  };

  const handleSearch = (e) => {
    setSearchCar(e.target.value);
  };

  // Filter car
  const filterCar = userVehicle?.filter((car) => {
    return car.number_plate.toLowerCase()?.includes(searchCar.toLowerCase());
  });

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative shadow-md sm:rounded-lg">
        <div className="p-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <HiSearch color="gray" />
            </div>
            <input
              type="text"
              id="table-search"
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search for items"
              value={searchCar}
              onChange={handleSearch}
            />
          </div>
        </div>

        <table className="text-left w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 w-full">
            <tr className="flex justify-between items-center w-full">
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={selectAllVehicle}
                    onChange={handleSelectAllVehicle}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Car name
              </th>
              <th scope="col" className="px-6 py-3">
                Km/h
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white flex flex-col items-center justify-start overflow-y-scroll w-full h-[200px]">
            {filterCar?.map((car, index) => (
              <tr
                key={index}
                className="flex justify-between items-center h-[40px] w-full text-black border-b bg-white hover:bg-gray-50"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      value={car?.id}
                      checked={checkedVehicle?.includes(car?.number_plate)}
                      onChange={(e) =>
                        handleSelectVehicle(e, car?.number_plate)
                      }
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {car?.number_plate}
                </th>
                <td className="px-6 py-4 flex justify-start items-center">
                  {car?.speed_limit}
                  <span className="font-medium text-blue-600 hover:underline ml-1">
                    <FaCarSide />
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      onClick={() => handleActionClick(car.id)}
                    >
                      <BsThreeDotsVertical />
                    </button>

                    {openDropdownId === car.id && (
                      <div
                        className="z-100 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`options-menu-${car.id}`}
                      >
                        <div className="py-1" role="none">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            // onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            // onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;
