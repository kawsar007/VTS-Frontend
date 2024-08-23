/* eslint-disable react/prop-types */

const ReportHeader = ({
  selectReport,
  selectedVehicle,
  startTime,
  endTime,
  todayFormattedDate,
}) => {
  return (
    <div className="flex justify-between flex-wrap">
      <div>
        <h2 className="text-3xl mb-4">TrustBD Technologies Ltd.</h2>
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Report Title</dt>
              <dd className="text-gray-700 sm:col-span-2">: {selectReport}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Vehicle</dt>
              <dd className="text-gray-700 sm:col-span-2">
                : {selectedVehicle}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Owner</dt>
              <dd className="text-gray-700 sm:col-span-2">
                : Milk Vita (milkvita){" "}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Report Time</dt>
              <dd className="text-gray-700 sm:col-span-2">
                : {startTime} To {endTime}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Report Date</dt>
              <dd className="text-gray-700 sm:col-span-2">
                : {todayFormattedDate}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/* Convert All Button */}
    </div>
  );
};

export default ReportHeader;
