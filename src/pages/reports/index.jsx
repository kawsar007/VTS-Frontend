import axios from "axios";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectTime } from "../../constants/InfoData";
import { calculateDistance, convertEpochToDate } from "../../utils/calculate-distance";
import { convertNormalTimeToUnixTime } from "../../utils/date-convertar";
import { formatDateTime, getTimeRange } from "../../utils/select-time-utility";
import { report_types } from "../../utils/static-data";
import DistanceReport from "./distance-report";

const Reports = () => {
  const [userVehicle, setUserVehicle] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [reports, setReports] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectReport, setSelectReport] = useState("");

  // Get today's date
  const today = new Date();
  // Format the date as "Jul 02, 2024"
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const todayFormattedDate = today.toLocaleDateString("en-US", options);

  const isFormValid = selectedVehicle && userVehicle && selectedTime;

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
  }, [fetchUserVehicles]);

  useEffect(() => {
    const now = new Date();
    const formattedNow = formatDateTime(now);
    setCurrentTime(formattedNow);
  }, []);

  const handleSelectTimes = (e) => {
    const value = e.target.value;
    setSelectedTime(value);

    const { startTime, endTime } = getTimeRange(value);
    setStartTime(startTime);
    setEndTime(endTime);
  };

  const handleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleSelectReport = (event) => {
    setSelectReport(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      vehicle: "_353701091544367",
      start_time: convertNormalTimeToUnixTime(startTime).toString(),
      end_time: convertNormalTimeToUnixTime(endTime).toString(),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}report/raw-data`,
        requestBody
      );
      const data = response?.data?.data;
      setReports(data);
    } catch (error) {
      console.log("Error:- ", error);
    }
  };


  const groupedData = useMemo(() => {
      const grouped = {};

      reports?.forEach((item, index) => {
        const date = convertEpochToDate(item.time);
        if(!grouped[date]) {
          grouped[date] = 0;  // Initialize total distance for the date
        }

        if(index > 0) {
          const prevItem = reports[index - 1];
          if(convertEpochToDate(prevItem.time) === date) {
            const distance = calculateDistance(
              parseFloat(prevItem.latitude),
              parseFloat(prevItem.longitude),
              parseFloat(item.latitude),
              parseFloat(item.longitude)
            );
            grouped[date] += distance;
          }
        }
      });

       // Convert the grouped object to an array of { date, totalDistance } objects
      return Object.keys(grouped).map(date => ({
        date,
        totalDistance: grouped[date].toFixed(2),
      }))
  }, [reports]);

  console.log("Grouped Data ---> ", groupedData);
  

  return (
    <div className="bg-[#E9F8F3B2]">
      <div className="w-full py-14 md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0">
        <div className="mt-16">
          <h2>This is Report Pages</h2>
          <div className="max-w-full mx-auto bg-white p-16 border">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="HeadlineAct"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Vehicles
                  </label>
                  <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    value={selectedVehicle}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
                  >
                    <option value="">Please select</option>
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
                    htmlFor="HeadlineAct"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Report Format:
                  </label>

                  <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    value={selectReport}
                    onChange={handleSelectReport}
                    className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
                  >
                    <option value="">--Select--</option>
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
                    htmlFor="HeadlineAct"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Report Types:
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
                    value={selectedTime}
                    onChange={handleSelectTimes}
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
                  <label>Start Time:</label>
                  <input
                    className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
                    type="text"
                    value={startTime}
                    placeholder={currentTime}
                    readOnly
                  />
                </div>

                <div>
                  <label>End Time:</label>
                  <input
                    className="mt-1.5 w-full rounded-lg border p-2 border-gray-300 text-gray-700 sm:text-sm"
                    type="text"
                    value={endTime}
                    placeholder={currentTime}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-end items-end">
                <button


                  type="submit"
                  // onClick={fetchVehicleReports}
                  disabled={!isFormValid}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Generate Reports
                </button>
              </div>
            </form>
          </div>
          {isFormValid && (
            <div className="max-w-full mx-auto bg-white p-16 border mt-2">
              <DistanceReport groupedData={groupedData} selectReport={selectReport}
                selectedVehicle={selectedVehicle}
                startTime={startTime}
                endTime={endTime}
                todayFormattedDate={todayFormattedDate} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
