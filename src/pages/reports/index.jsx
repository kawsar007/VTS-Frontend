/* eslint-disable react/prop-types */
import axios from "axios";

import { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "../../common/Loader";
import SelectInput from "../../common/SelectInput";
import { SelectTime } from "../../constants/InfoData";
import { convertNormalTimeToUnixTime } from "../../utils/date-convertar";
import { formatDateTime, getTimeRange } from "../../utils/select-time-utility";
import { report_types } from "../../utils/static-data";
import DistanceReport from "./distance-report";
import EngineStartStopReport from "./engine-start-stop-report";
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
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  const todayFormattedDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, []);

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
      setIsReportGenerated(true);
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
      case "engine-stop/start-report":
        return (
          <EngineStartStopReport
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
          <h2>Report Pages</h2>
          <div className='max-w-full mx-auto bg-white p-16 border'>
            <form onSubmit={handleSubmit}>
              <div className='grid gap-6 mb-6 lg:grid-cols-2'>
                <SelectInput
                  label='Vehicles'
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  options={userVehicle.map((item) => ({
                    value: item.number_plate,
                    label: item.number_plate,
                  }))}
                  id='vehicleSelect'
                />
                <SelectInput
                  label='Report Type'
                  value={selectReport}
                  onChange={(e) => setSelectReport(e.target.value)}
                  options={report_types}
                  id='reportTypeSelect'
                />
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

                <SelectInput
                  label='Select Time'
                  value={selectedTime}
                  onChange={handleSelectTimes}
                  options={SelectTime}
                  id='timeSelect'
                />

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
                  disabled={!isFormValid}
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  {loading ? "Loading..." : "Generate Reports"}
                </button>
              </div>
            </form>
          </div>
          {loading ? (
            <Loader />
          ) : reports?.length > 0 ? (
            <div className='max-w-full mx-auto bg-white p-16 border mt-2'>
              {renderReportTable()}
            </div>
          ) : (
            isReportGenerated && (
              <div className='flex justify-center items-center mt-4 h-48 bg-gray-100 rounded-md border border-gray-300'>
                <p className='text-gray-600 text-lg'>
                  No data available to display.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
