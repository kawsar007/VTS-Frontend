// /* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */

import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { SelectTime } from "../../../constants/InfoData";

const HistoryUI = ({
  vehicleInfo,
  setSingleCarHistory,
  vehicleHistory,
  setMapZoom,
  setCenter,
  setDirections,
  startPoint,
  endPoint,
}) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [reportTime, setReportTime] = useState(null);

  const handleSelectAllCars = () => {
    setSingleCarHistory(vehicleHistory);
    setMapZoom(18);
    setCenter({ lat: 23.165907, lng: 90.205648 }); // INITIALLY STATIC DATA ADDED

    // Fetch Direction when marker is clicked
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(
          parseFloat(startPoint?.latitude),
          parseFloat(startPoint?.longitude)
        ),
        destination: new window.google.maps.LatLng(
          parseFloat(endPoint?.latitude),
          parseFloat(endPoint?.longitude)
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        console.log("Final Result--->", { result, status });
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  const handleStartDateChange = (date) => {
    const formattedStartDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    setStartTime(formattedStartDate);
  };

  const handleEndDateChange = (date) => {
    const formattedEndDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    setEndTime(formattedEndDate);
  };

  const handleReportsTimes = (e) => {
    setReportTime(e.target.value);
  };

  const handleShowInformation = () => {
    console.log("My All Reports", {
      startTime,
      endTime,
      reportTime,
    });
  };

  return (
    <div>
      <div className="bg-white border shadow-sm p-4">
        <div>
          <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Select User
          </label>

          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="">Please select</option>
            <option value="SRV">Stevie Ray Vaughn</option>
            <option value="JH">Jimi Hendrix</option>
            <option value="BBK">B.B King</option>
            <option value="AK">Albert King</option>
          </select>
        </div>

        <div>
          {/* <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Select Vehicle
          </label>

          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="">Please select</option>
            <option value={vehicleName}>{vehicleName}</option>
          </select> */}
          <button className="text-black" onClick={handleSelectAllCars}>
            {vehicleInfo?.vehicle}
          </button>
        </div>

        <div>
          <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Select Group
          </label>

          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="">Please select</option>
            <option value="group-1">Group 1</option>
            <option value="group-2">Group 2</option>
            <option value="group-3">Group 3</option>
            <option value="group-4">Group 4</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Select Time
          </label>

          <select
            onChange={handleReportsTimes}
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
          >
            {SelectTime.map((item, i) => (
              <option key={i} value={item.value}>
                {item.key}
              </option>
            ))}
          </select>
        </div>

        <div>
          <DatePicker
            selected={startTime}
            onChange={handleStartDateChange}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
          />
        </div>

        <div>
          <DatePicker
            selected={endTime}
            onChange={handleEndDateChange}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
          />
        </div>
      </div>
      <button
        className="w-2/3 mt-4 object-none object-bottom  active:bg-red-700 focus:bg-yellow-500 focus:text-white hover:bg-green-500
                 text-yellow-700 hover:text-white py-1 px-4 border border-yellow-500  rounded"
        onClick={handleShowInformation}
      >
        Show
      </button>
    </div>
  );
};

export default HistoryUI;

// import React, { useEffect, useState } from "react";

// const HistoryUI = ({
//   vehicleInfo,
//   setSingleCarHistory,
//   vehicleHistory,
//   setMapZoom,
//   setCenter,
//   setDirections,
//   startPoint,
//   endPoint,
// }) => {
//   const [fetchingDirections, setFetchingDirections] = useState(false);

//   const fetchDirections = () => {
//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: new window.google.maps.LatLng(
//           parseFloat(startPoint?.latitude),
//           parseFloat(startPoint?.longitude)
//         ),
//         destination: new window.google.maps.LatLng(
//           parseFloat(endPoint?.latitude),
//           parseFloat(endPoint?.longitude)
//         ),
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error(`Directions request failed due to ${status}`);
//         }
//         setFetchingDirections(false); // Reset the fetching state
//       }
//     );
//   };

//   const handleSelectAllCars = () => {
//     setSingleCarHistory(vehicleHistory);
//     setMapZoom(18);
//     setCenter({ lat: 23.165907, lng: 90.205648 }); // INITIALLY STATIC DATA ADDED
//     setFetchingDirections(true);
//   };

//   // Fetch directions when fetchingDirections state changes
//   useEffect(() => {
//     if (fetchingDirections) {
//       fetchDirections();
//     }
//   }, [fetchingDirections]);

//   return (
//     <div>
//       <div className="bg-white border shadow-sm p-4">
//         <div>
//           <button className="text-black" onClick={handleSelectAllCars}>
//             {vehicleInfo?.vehicle}
//           </button>
//         </div>
//       </div>
//       <button
//         className="w-2/3 mt-4 object-none object-bottom  active:bg-red-700 focus:bg-yellow-500 focus:text-white hover:bg-green-500
//                  text-yellow-700 hover:text-white py-1 px-4 border border-yellow-500  rounded"
//       >
//         Show
//       </button>
//     </div>
//   );
// };

// export default HistoryUI;
