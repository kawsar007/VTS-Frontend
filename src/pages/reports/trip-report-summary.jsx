/* eslint-disable react/prop-types */

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const TripReportSummary = ({
  reports,
  selectReport,
  selectedVehicle,
  startTime,
  endTime,
  todayFormattedDate,
}) => {
  console.log("Trip Reports--->", reports);

  const getJourneySegments = (reports) => {
    const segments = [];
    let currentSegment = {
      startLocation: null,
      startTimeEpoch: null,
      startTime: null,
      totalDistance: 0,
      totalTime: 0,
      maxSpeed: 0,
      speeds: [],
    };

    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];

      if (report.engine === 1) {
        if (!currentSegment.startLocation) {
          currentSegment.startLocation = {
            latitude: report.latitude,
            longitude: report.longitude,
          };
          currentSegment.startTimeEpoch = report.time;
          currentSegment.startTime = new Date(
            report.time * 1000,
          ).toLocaleString();
        }

        currentSegment.speeds.push(report.speed);
      } else if (report.engine === 0 && currentSegment.startLocation) {
        const endLocation = {
          latitude: report.latitude,
          longitude: report.longitude,
        };
        const distance = calculateDistance(
          parseFloat(currentSegment.startLocation.latitude),
          parseFloat(currentSegment.startLocation.longitude),
          parseFloat(endLocation.latitude),
          parseFloat(endLocation.longitude),
        );
        const duration = (report.time - currentSegment.startTimeEpoch) / 60; // Duration in minutes

        segments.push({
          startLocation: currentSegment.startLocation,
          startTime: currentSegment.startTime,
          endLocation,
          endTime: new Date(report.time * 1000).toLocaleString(),
          duration,
          distance,
          averageSpeed: distance / (duration / 60), // Average speed in km/h
          maxSpeed: Math.max(...currentSegment.speeds), // Max speed in km/h
        });

        currentSegment = {
          startLocation: null,
          startTimeEpoch: null,
          startTime: null,
          totalDistance: 0,
          totalTime: 0,
          maxSpeed: 0,
          speeds: [],
        };
      }
    }

    // Handle case where the last report ends with the engine still running
    if (currentSegment.startLocation) {
      segments.push({
        startLocation: currentSegment.startLocation,
        startTime: currentSegment.startTime,
        endLocation: null,
        endTime: null,
        duration: null,
        distance: null,
        averageSpeed: null,
        maxSpeed: null,
      });
    }

    return segments;
  };

  const journeySegments = getJourneySegments(reports);

  // Calculate total distance
  const totalDistance = journeySegments.reduce(
    (total, segment) => total + (segment.distance || 0),
    0,
  );

  return (
    <>
      <div className='flex justify-between flex-wrap'>
        <div>
          <h2 className='text-3xl mb-4'>
            TrustBD Technologies Ltd. Trip Report Summary
          </h2>
          <div className='flow-root'>
            <dl className='-my-3 divide-y divide-gray-100 text-sm'>
              <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                <dt className='font-medium text-gray-900'>Report Title</dt>
                <dd className='text-gray-700 sm:col-span-2'>
                  : {selectReport}
                </dd>
              </div>

              <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                <dt className='font-medium text-gray-900'>Vehicle</dt>
                <dd className='text-gray-700 sm:col-span-2'>
                  : {selectedVehicle}
                </dd>
              </div>

              <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                <dt className='font-medium text-gray-900'>Owner</dt>
                <dd className='text-gray-700 sm:col-span-2'>
                  : Milk Vita (milkvita){" "}
                </dd>
              </div>

              <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                <dt className='font-medium text-gray-900'>Report Time</dt>
                <dd className='text-gray-700 sm:col-span-2'>
                  : {startTime} To {endTime}
                </dd>
              </div>

              <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
                <dt className='font-medium text-gray-900'>Report Date</dt>
                <dd className='text-gray-700 sm:col-span-2'>
                  : {todayFormattedDate}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {journeySegments.length > 0 ? (
        <div className='overflow-x-auto rounded-lg border border-gray-200'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
            <thead className='ltr:text-left rtl:text-right'>
              <tr>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Start Location
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  End Location
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Start Time
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  End Time
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Duration
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Traveled Distance
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Avg. Speed
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Max Speed
                </th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200'>
              {journeySegments.map((report, index) => (
                <tr key={index}>
                  <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
                    {report.startLocation
                      ? `${report.startLocation.latitude}, ${report.startLocation.longitude}`
                      : "N/A"}
                  </td>
                  <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
                    {report.endLocation
                      ? `${report.endLocation.latitude}, ${report.endLocation.longitude}`
                      : "N/A"}
                  </td>

                  <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
                    {/* {formatEpochToDateForTripReport(report.startTime || 'N/A')} */}
                    {report.startTime || "N/A"}
                  </td>
                  <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
                    {/* {formatEpochToDateForTripReport(report.endTime || 'N/A')} */}
                    {report.endTime || "N/A"}
                  </td>

                  <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
                    {report.duration
                      ? `${report.duration.toFixed(2)} minutes`
                      : "N/A"}
                  </td>
                  <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
                    {report.distance
                      ? `${report.distance.toFixed(2)} km`
                      : "N/A"}
                  </td>
                  <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
                    {report.averageSpeed
                      ? `${report.averageSpeed.toFixed(2)} km/h`
                      : "N/A"}
                  </td>
                  <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
                    {report.maxSpeed ? `${report.maxSpeed} km/h` : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='w-full border flex justify-center items-center mt-8'>
          <h2 className='text-red-600 text-2xl p-4'>No records found!</h2>
        </div>
      )}
    </>
  );
};

export default TripReportSummary;

// /* eslint-disable react/prop-types */

// import { formatEpochToDateForTripReport } from "../../utils/select-time-utility";

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of the Earth in kilometers
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//             Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in kilometers
//   return distance;
// };

// const TripReportSummary = ({
//   reports,
//   selectReport,
//   selectedVehicle,
//   startTime,
//   endTime,
//   todayFormattedDate,
// }) => {
//   console.log("Trip Reports--->", reports);

//   const getJourneySegments = (reports) => {
//     const segments = [];
//     let currentSegment = {
//       startLocation: null,
//       startTimeEpoch: null,
//       startTime: null,
//       totalDistance: 0,
//       totalTime: 0,
//       maxSpeed: 0,
//       speeds: [],
//     };

//     for (let i = 0; i < reports.length; i++) {
//       const report = reports[i];

//       if (report.engine === 1) {
//         if (!currentSegment.startLocation) {
//           currentSegment.startLocation = { latitude: report.latitude, longitude: report.longitude };
//           currentSegment.startTimeEpoch = report.time;
//           currentSegment.startTime = new Date(report.time * 1000).toLocaleString();
//         }

//         currentSegment.speeds.push(report.speed);
//       } else if (report.engine === 0 && currentSegment.startLocation) {
//         const endLocation = { latitude: report.latitude, longitude: report.longitude };
//         const distance = calculateDistance(
//           parseFloat(currentSegment.startLocation.latitude),
//           parseFloat(currentSegment.startLocation.longitude),
//           parseFloat(endLocation.latitude),
//           parseFloat(endLocation.longitude)
//         );
//         const duration = (report.time - currentSegment.startTimeEpoch) / 60; // Duration in minutes

//         segments.push({
//           startLocation: currentSegment.startLocation,
//           startTime: currentSegment.startTime,
//           endLocation,
//           endTime: new Date(report.time * 1000).toLocaleString(),
//           duration,
//           distance,
//           averageSpeed: distance / (duration / 60), // Average speed in km/h
//           maxSpeed: Math.max(...currentSegment.speeds), // Max speed in km/h
//         });

//         currentSegment = {
//           startLocation: null,
//           startTimeEpoch: null,
//           startTime: null,
//           totalDistance: 0,
//           totalTime: 0,
//           maxSpeed: 0,
//           speeds: [],
//         };
//       }
//     }

//     // Handle case where the last report ends with the engine still running
//     if (currentSegment.startLocation) {
//       segments.push({
//         startLocation: currentSegment.startLocation,
//         startTime: currentSegment.startTime,
//         endLocation: null,
//         endTime: null,
//         duration: null,
//         distance: null,
//         averageSpeed: null,
//         maxSpeed: null,
//       });
//     }

//     return segments;
//   };

//   const journeySegments = getJourneySegments(reports);

//   console.log(journeySegments);

//   return (
//     <>
//       <div className='flex justify-between flex-wrap'>
//         <div>
//           <h2 className='text-3xl mb-4'>
//             TrustBD Technologies Ltd. Trip Report Summary
//           </h2>
//           <div className='flow-root'>
//             <dl className='-my-3 divide-y divide-gray-100 text-sm'>
//               <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
//                 <dt className='font-medium text-gray-900'>Report Title</dt>
//                 <dd className='text-gray-700 sm:col-span-2'>
//                   : {selectReport}
//                 </dd>
//               </div>

//               <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
//                 <dt className='font-medium text-gray-900'>Vehicle</dt>
//                 <dd className='text-gray-700 sm:col-span-2'>
//                   : {selectedVehicle}
//                 </dd>
//               </div>

//               <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
//                 <dt className='font-medium text-gray-900'>Owner</dt>
//                 <dd className='text-gray-700 sm:col-span-2'>
//                   : Milk Vita (milkvita){" "}
//                 </dd>
//               </div>

//               <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
//                 <dt className='font-medium text-gray-900'>Report Time</dt>
//                 <dd className='text-gray-700 sm:col-span-2'>
//                   : {startTime} To {endTime}
//                 </dd>
//               </div>

//               <div className='grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'>
//                 <dt className='font-medium text-gray-900'>Report Date</dt>
//                 <dd className='text-gray-700 sm:col-span-2'>
//                   : {todayFormattedDate}
//                 </dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>

//       {reports.length > 0 ? (
//         <div className='overflow-x-auto rounded-lg border border-gray-200'>
//           <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
//             <thead className='ltr:text-left rtl:text-right'>
//               <tr>
//                 <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
//                   Start Location
//                 </th>
//                 <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
//                   End Location
//                 </th>
//                 <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
//                   Start Time
//                 </th>
//                 <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
//                   End Time
//                 </th>
//                 <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
//                   Duration
//                 </th>
//                 <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
//                   Traveled Distance
//                 </th>
//                 <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
//                   Avg. Speed
//                 </th>
//                 <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
//                   Max Speed
//                 </th>
//               </tr>
//             </thead>

//             <tbody className='divide-y divide-gray-200'>
//               {reports.map((report, index) => (
//                 <tr key={index}>
//                   <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
//                     ({report?.latitude}, {report.longitude})
//                   </td>
//                   <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
//                     ({report?.latitude}, {report.longitude})
//                   </td>

//                   <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
//                     {formatEpochToDateForTripReport(report.time)}
//                   </td>
//                   <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
//                     {formatEpochToDateForTripReport(report.time)}
//                   </td>

//                   <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
//                     0:35:39 (Dummy)
//                   </td>
//                   <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
//                     15.69 km (Dummy)
//                   </td>
//                   <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
//                     {report?.speed}
//                   </td>
//                   <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
//                     {report?.speed}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className='w-full border flex justify-center items-center mt-8'>
//           <h2 className='text-red-600 text-2xl p-4'>No records found!</h2>
//         </div>
//       )}
//     </>
//   );
// };

// export default TripReportSummary;
