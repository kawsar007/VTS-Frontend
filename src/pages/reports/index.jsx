import axios from "axios";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectTime } from "../../constants/InfoData";
import { convertNormalTimeToUnixTime } from "../../utils/date-convertar";
import { formatDateTime, getTimeRange } from "../../utils/select-time-utility";
import { report_types } from "../../utils/static-data";
import DistanceReport from "./distance-report";
import TripReport from "./trip-report";
import TripReportSummary from "./trip-report-summary";

const Reports = () => {
  const [userVehicle, setUserVehicle] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [reports, setReports] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectReport, setSelectReport] = useState("");
  const [loading, setLoading] = useState(false);

  console.log({
    startTime: startTime,
    endTime: endTime,
  });

  const todayFormattedDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, []);

  // const isFormValid = selectedVehicle && userVehicle && selectedTime;
  const isFormValid = useMemo(
    () => selectedVehicle && userVehicle.length > 0 && selectedTime,
    [selectedVehicle, userVehicle, selectedTime],
  );

  // Get individual user all vehicles
  const fetchUserVehicles = useCallback(() => {
    const requestBody = {
      id: "5", // Logged in user ID
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}vehicle/users/all`, requestBody)
      .then((response) => {
        setUserVehicle(response.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchUserVehicles();
    setCurrentTime(formatDateTime(new Date()));
  }, [fetchUserVehicles]);

  // Select time handle
  const handleSelectTimes = useCallback((e) => {
    const { value } = e.target;
    setSelectedTime(value);

    const { startTime, endTime } = getTimeRange(value);
    setStartTime(startTime);
    setEndTime(endTime);
  }, []);
  // Select Vehicle handler
  const handleVehicleChange = useCallback((event) => {
    setSelectedVehicle(event.target.value);
  }, []);
  // Select Report type handler
  const handleSelectReport = useCallback((event) => {
    setSelectReport(event.target.value);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      vehicle: "_353701091544367",
      start_time: convertNormalTimeToUnixTime(startTime).toString(),
      end_time: convertNormalTimeToUnixTime(endTime).toString(),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}report/raw-data`,
        requestBody,
      );
      setReports(response?.data?.data || []);
    } catch (error) {
      console.error("Error generating reports ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderReportTable = () => {
    switch (selectReport) {
      case "distance-report":
        return (
          <DistanceReport
            reports={reports}
            // groupedData={groupedData}
            selectReport={selectReport}
            selectedVehicle={selectedVehicle}
            startTime={startTime}
            endTime={endTime}
            todayFormattedDate={todayFormattedDate}
          />
        );
      case "trip-report-in-details":
        return (
          <TripReport
            reports={reports}
            selectReport={selectReport}
            selectedVehicle={selectedVehicle}
            startTime={startTime}
            endTime={endTime}
            todayFormattedDate={todayFormattedDate}
          />
        );
      case "trip-report-summary":
        return (
          <TripReportSummary
            reports={reports}
            selectReport={selectReport}
            selectedVehicle={selectedVehicle}
            selectStartTime={startTime}
            selectEndTime={endTime}
            todayFormattedDate={todayFormattedDate}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className='bg-[#E9F8F3B2]'>
      <div className='w-full py-14 md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0'>
        <div className='mt-16'>
          <h2>This is Report Pages</h2>
          <div className='max-w-full mx-auto bg-white p-16 border'>
            <form onSubmit={handleSubmit}>
              <div className='grid gap-6 mb-6 lg:grid-cols-2'>
                <div>
                  <label
                    htmlFor='HeadlineAct'
                    className='block text-sm font-medium text-gray-900'>
                    Vehicles
                  </label>
                  <select
                    name='HeadlineAct'
                    id='HeadlineAct'
                    value={selectedVehicle}
                    onChange={handleVehicleChange}
                    className='mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm'>
                    <option value=''>Please select</option>
                    {userVehicle?.length > 0 &&
                      userVehicle.map((item, i) => (
                        <option key={i} value={item?.number_plate}>
                          {item?.number_plate}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='HeadlineAct'
                    className='block text-sm font-medium text-gray-900'>
                    Report Type:
                  </label>

                  <select
                    name='HeadlineAct'
                    id='HeadlineAct'
                    value={selectReport}
                    onChange={handleSelectReport}
                    className='mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm'>
                    <option value=''>--Select--</option>
                    {report_types?.length > 0 &&
                      report_types.map((item, i) => (
                        <option key={i} value={item?.value}>
                          {item?.label}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='HeadlineAct'
                    className='block text-sm font-medium text-gray-900'>
                    Report Format:
                  </label>

                  <select
                    name='HeadlineAct'
                    id='HeadlineAct'
                    className='mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm'>
                    <option value=''>Please select</option>
                    <option value='group-1'>Group 1</option>
                    <option value='group-2'>Group 2</option>
                    <option value='group-3'>Group 3</option>
                    <option value='group-4'>Group 4</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='HeadlineAct'
                    className='block text-sm font-medium text-gray-900'>
                    Select Time
                  </label>

                  <select
                    value={selectedTime}
                    onChange={handleSelectTimes}
                    name='HeadlineAct'
                    id='HeadlineAct'
                    className='mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm'>
                    {SelectTime.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.key}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Start Time:</label>
                  <input
                    className='mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm'
                    type='text'
                    value={startTime}
                    placeholder={currentTime}
                    readOnly
                  />
                </div>

                <div>
                  <label>End Time:</label>
                  <input
                    className='mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm'
                    type='text'
                    value={endTime}
                    placeholder={currentTime}
                    readOnly
                  />
                </div>
              </div>
              <div className='flex justify-end items-end'>
                <button
                  type='submit'
                  // onClick={fetchVehicleReports}
                  disabled={!isFormValid}
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  {loading ? "Loading..." : "Generate Reports"}
                </button>
              </div>
            </form>
          </div>
          {reports?.length && (
            <div className='max-w-full mx-auto bg-white p-16 border mt-2'>
              {renderReportTable()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
