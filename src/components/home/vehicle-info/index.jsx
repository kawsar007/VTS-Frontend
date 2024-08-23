import React from "react";
import { VehicleInfoData } from "../../../utils/fake_db";

const VehicleInfo = () => {
  console.log(VehicleInfoData);
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                SL
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Vehicle
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Model
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Type
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Driver
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                is_active
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {VehicleInfoData.map((vehicle, i) => (
              <tr key={i}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {vehicle?.sl}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {vehicle?.number_plate}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {vehicle?.vehicle_code}
                </td>
                <td className="whitespace-nowrap">
                  {vehicle?.status === "Active" ? (
                    <span className="rounded-full px-2 py-1 bg-green-300 text-xs font-semibold leading-5 text-green-800">
                      {vehicle?.status}
                    </span>
                  ) : (
                    <span className="rounded-full px-2 py-1 bg-red-300 text-xs font-semibold leading-5 text-red-800">
                      {vehicle?.status}
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {vehicle?.speed_limit}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {vehicle?.driver}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Section */}
      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 dark:border-gray-700">
        <ol className="flex justify-end gap-1 text-xs font-medium">
          <li>
            <a
              href="#"
              className="p-[10px] inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="px-[15px] block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            >
              1
            </a>
          </li>

          <li className="px-[15px] block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 dark:text-white">
            2
          </li>

          <li>
            <a
              href="#"
              className="px-[15px] block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            >
              3
            </a>
          </li>

          <li>
            <a
              href="#"
              className="px-[15px] block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            >
              4
            </a>
          </li>

          <li>
            <a
              href="#"
              className="p-[10px] inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default VehicleInfo;
