/* eslint-disable react/prop-types */
// import React from "react";

// const CarDetailsInfo = () => {
//   return (
//     <div className="w-full absolute left-0 bottom-0 right-0">
//       <div className="px-4 sm:px-8 max-w-5xl m-auto">
//         <h1 className="text-center font-semibold text-sm">List Group</h1>
//         <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
//           <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
//             First Item
//           </li>
//           <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
//             Second Item
//           </li>
//           <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
//             Third Item
//           </li>
//           <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
//             Another Item
//           </li>
//           <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
//             Item for the Nth time
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CarDetailsInfo;

import React from "react";

const CarDetailsInfo = ({ selectedMarker }) => {
  console.log(selectedMarker);
  return (
    <div className="w-full absolute left-0 bottom-0 right-0">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <div className="bg-white">
          <div className="flex">
            {/* Left column */}
            <div className="flex-1">
              <ul className="border border-gray-200 rounded overflow-hidden">
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>AC:</strong> {selectedMarker.ac}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Engin:</strong> {selectedMarker.engine}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Fuel:</strong> {selectedMarker.fuel}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Speed:</strong> {selectedMarker.speed}
                </li>
              </ul>
            </div>
            {/* Right column */}
            <div className="flex-1">
              <ul className="border border-gray-200 rounded overflow-hidden">
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Time:</strong> {selectedMarker.time}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Latitude:</strong> {selectedMarker.latitude}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Longitude:</strong> {selectedMarker.longitude}
                </li>
                <li className="px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                  <strong>Satalite:</strong> {selectedMarker.satellite}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsInfo;
