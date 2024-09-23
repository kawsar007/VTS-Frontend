/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { formatEpochToDateForTripReport } from "../../utils/select-time-utility";
import { calculateDuration, formatDuration } from "../../utils/utility";

const EngineStartStopReport = ({
  reports,
  // groupedData,
  selectReport,
  selectedVehicle,
  startTime,
  endTime,
  todayFormattedDate,
}) => {
  console.log(reports);
  const [engineStats, setEngineStats] = useState([]);
  console.log("engineStats", engineStats);

  useEffect(() => {
    let engineOn = false;
    let startTime = 0;
    let stopTime = 0;
    let distance = 0;
    let totalSpeed = 0;
    let speedCount = 0;
    let maxSpeed = 0;

    const stats = [];

    reports.forEach((entry, index) => {
      if (entry.engine === 1 && !engineOn) {
        engineOn = true;
        startTime = entry.time;
      }

      if (engineOn && entry.engine === 0) {
        engineOn = false;
        stopTime = entry.time;

        // calculate duration
        const duration = calculateDuration(startTime, stopTime);

        const timeDiff = calculateDuration(reports[index - 1].time, entry.time);
        distance += reports[index - 1].speed * (timeDiff / 3600);

        // Calculate average speed during engine on
        const avgSpeed = totalSpeed / speedCount;

        stats.push({
          startTime: formatEpochToDateForTripReport(startTime),
          stopTime: formatEpochToDateForTripReport(stopTime),
          duration: formatDuration(duration),
          travelledDistance: distance.toFixed(2), // Keep two decimals for distance
          avgSpeed: avgSpeed.toFixed(2),
          maxSpeed: maxSpeed,
          location: {
            latitude: reports[index - 1].latitude,
            longitude: reports[index - 1].longitude,
          },
        });
        distance = 0;
        totalSpeed = 0;
        speedCount = 0;
        maxSpeed = 0;
      }

      if (engineOn && index > 0) {
        const timeDiff = calculateDuration(reports[index - 1].time, entry.time);
        distance += entry.speed * (timeDiff / 3600); // Time in hours

        totalSpeed += entry.speed;
        speedCount += 1;

        // Track the maximum speed
        if (entry.speed > maxSpeed) {
          maxSpeed = entry.speed;
        }
      }
    });
    setEngineStats(stats);
  }, [reports]);

  // Style for PDF Btn
  // const styles = {
  //   flex: { width: "100%", display: "flex", gap: "5px", alignItems: "center" },
  //   btn: {
  //     borderRadius: "3px",
  //     border: "1px solid gray",
  //     display: "flex",
  //     alignItems: "center",
  //     gap: "2px",
  //     padding: "3px",
  //     fontSize: "11px",
  //     color: "#4f4f4f",
  //     fontWeight: 600,
  //     cursor: "pointer",
  //     userSelect: "none",
  //   },
  // };

  // const handleShare = async (blob) => {
  //   await saveAs(blob, `invoice.pdf`);
  //   window.location.href = `mailto:?subject=${encodeURIComponent(
  //     `Invoice`,
  //   )}&body=${encodeURIComponent(`Kindly find attached invoice`)}`;
  // };

  return (
    <>
      <div className='flex justify-between flex-wrap'>
        <div>
          <h2 className='text-3xl mb-4'>TrustBD Technologies Ltd.</h2>
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
        {/* <div className='flex justify-between items-center gap-8'>
          <PDFDownloadLink
            document={
              <DistanceReportDocs
                reports={reports}
                startTime={startTime}
                endTime={endTime}
                selectedVehicle={selectedVehicle}
                todayFormattedDate={todayFormattedDate}
              />
            }
            fileName='invoice.pdf'>
            <div style={styles.btn}>
              <HiOutlineDownload size={14} />
              <span>Download</span>
            </div>
          </PDFDownloadLink>
          <button className='py-2 px-4 border rounded-md'>Word</button>
          <BlobProvider
            document={
              <DistanceReportDocs
                reports={reports}
                startTime={startTime}
                endTime={endTime}
                selectedVehicle={selectedVehicle}
                todayFormattedDate={todayFormattedDate}
              />
            }>
            {({ url }) => (
              <a href={url} target='_blank' style={styles.btn} rel='noreferrer'>
                <HiOutlinePrinter size={14} />
                <span>Print</span>
              </a>
            )}
          </BlobProvider>
          <BlobProvider
            document={
              <DistanceReportDocs
                // reports={groupedData}
                startTime={startTime}
                endTime={endTime}
                selectedVehicle={selectedVehicle}
                todayFormattedDate={todayFormattedDate}
              />
            }>
            {({ url, blob }) => (
              <div style={styles.btn} onClick={() => handleShare(url, blob)}>
                <FiShare2 size={14} />
                <span>Share</span>
              </div>
            )}
          </BlobProvider>
        </div> */}
      </div>

      {engineStats.length > 0 ? (
        <div className='overflow-x-auto rounded-lg border border-gray-200'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
            <thead className='ltr:text-left rtl:text-right'>
              <tr>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Time Range
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Duration
                </th>

                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Travelled Distance
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Avg. Speed
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Max Speed
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Location
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Nearby Place
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Status
                </th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200'>
              {engineStats.map((report, index) => (
                <tr key={index}>
                  <td className='whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900'>
                    <span>{report?.startTime}</span>
                    <br />
                    <span>{report?.stopTime}</span>
                  </td>
                  <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
                    {report.duration}
                  </td>
                  <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
                    {report?.travelledDistance}km
                  </td>

                  <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
                    {report.avgSpeed} km/h
                  </td>
                  <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
                    {report?.maxSpeed} km/h
                  </td>
                  <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
                    ({report?.location?.latitude},{report?.location?.longitude})
                  </td>
                  <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
                    -
                  </td>
                  <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
                    Off
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

export default EngineStartStopReport;
