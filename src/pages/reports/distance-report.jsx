/* eslint-disable react/prop-types */
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useMemo } from "react";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineDownload, HiOutlinePrinter } from "react-icons/hi";
import {
  calculateDistance,
  convertEpochToDate,
} from "../../utils/calculate-distance";
import DistanceReportDocs from "./download-docs/distance-report-docs";

const DistanceReport = ({
  reports,
  // groupedData,
  selectReport,
  selectedVehicle,
  startTime,
  endTime,
  todayFormattedDate,
}) => {
  const groupedData = useMemo(() => {
    const grouped = {};

    reports?.forEach((item, index) => {
      const date = convertEpochToDate(item.time);
      if (!grouped[date]) {
        grouped[date] = 0; // Initialize total distance for the date
      }

      if (index > 0) {
        const prevItem = reports[index - 1];
        if (convertEpochToDate(prevItem.time) === date) {
          const distance = calculateDistance(
            parseFloat(prevItem.latitude),
            parseFloat(prevItem.longitude),
            parseFloat(item.latitude),
            parseFloat(item.longitude),
          );
          grouped[date] += distance;
        }
      }
    });
    // Convert the grouped object to an array of { date, totalDistance } objects
    return Object.keys(grouped).map((date) => ({
      date,
      totalDistance: grouped[date].toFixed(2),
    }));
  }, [reports]);

  // Style for PDF Btn
  const styles = {
    flex: { width: "100%", display: "flex", gap: "5px", alignItems: "center" },
    btn: {
      borderRadius: "3px",
      border: "1px solid gray",
      display: "flex",
      alignItems: "center",
      gap: "2px",
      padding: "3px",
      fontSize: "11px",
      color: "#4f4f4f",
      fontWeight: 600,
      cursor: "pointer",
      userSelect: "none",
    },
  };

  const handleShare = async (blob) => {
    await saveAs(blob, `invoice.pdf`);
    window.location.href = `mailto:?subject=${encodeURIComponent(
      `Invoice`,
    )}&body=${encodeURIComponent(`Kindly find attached invoice`)}`;
  };

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
        <div className='flex justify-between items-center gap-8'>
          <PDFDownloadLink
            document={
              <DistanceReportDocs
                reports={groupedData}
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
                reports={groupedData}
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
                reports={groupedData}
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
        </div>
      </div>

      {groupedData.length > 0 ? (
        <div className='overflow-x-auto rounded-lg border border-gray-200'>
          <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
            <thead className='ltr:text-left rtl:text-right'>
              <tr>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Date
                </th>
                <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  Total Distance
                </th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-200'>
              {groupedData.map((report, index) => (
                <tr key={index}>
                  <td className='whitespace-nowrap text-center px-4 py-2 font-medium text-gray-900'>
                    {report.date}
                  </td>
                  <td className='whitespace-nowrap px-4 text-center py-2 text-gray-700'>
                    {report.totalDistance} km
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

export default DistanceReport;
