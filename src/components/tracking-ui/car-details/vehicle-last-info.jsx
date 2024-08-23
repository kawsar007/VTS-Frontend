/* eslint-disable react/prop-types */
import React from "react";

const SingleVehicleLastInfoModal = ({ vehicleInfo }) => {
  console.log("vehicleInfo", vehicleInfo);
  return (
    <div className="w-full absolute left-0 bottom-0 right-0">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <div className="!bg-slate-300">
          <div className="flex">
            {/* Left column */}
            <div className="flex-1">
              <ul className="border border-gray-200 rounded overflow-hidden">
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>AC:</strong> {vehicleInfo.ac}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Engin:</strong> {vehicleInfo.engine}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Fuel:</strong> {vehicleInfo.fuel}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Speed:</strong> {vehicleInfo.speed}
                </li>
              </ul>
            </div>
            {/* Right column */}
            <div className="flex-1">
              <ul className="border border-gray-200 rounded overflow-hidden">
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Time:</strong> {vehicleInfo.time}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Latitude:</strong> {vehicleInfo.latitude}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Longitude:</strong> {vehicleInfo.longitude}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Satalite:</strong> {vehicleInfo.satellite}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVehicleLastInfoModal;
