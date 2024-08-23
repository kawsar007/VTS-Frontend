/* eslint-disable react/prop-types */
import React from "react";
import VehicleTable from "./vehicle-table";

const VehicleUi = ({
  userVehicle,
  handleSelectVehicle,
  selectVehicle,
  handleSelectAllVehicle,
  selectAllVehicle,
  checkedVehicle,
}) => {
  return (
    <div>
      <div className="bg-white border shadow-sm p-4">
        <div>
          <label
            htmlFor="HeadlineAct"
            className="block text-sm font-medium text-gray-900"
          >
            Select Dealer
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
            <option value="JM">John Mayer</option>
            <option value="SRV">Stevie Ray Vaughn</option>
            <option value="JH">Jimi Hendrix</option>
            <option value="BBK">B.B King</option>
          </select>
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
            <option value="BBK">B.B King</option>
            <option value="AK">Albert King</option>
            <option value="BG">Buddy Guy</option>
            <option value="EC">Eric Clapton</option>
          </select>
        </div>
      </div>

      <div>
        <VehicleTable
          userVehicle={userVehicle}
          handleSelectVehicle={handleSelectVehicle}
          selectVehicle={selectVehicle}
          handleSelectAllVehicle={handleSelectAllVehicle}
          selectAllVehicle={selectAllVehicle}
          checkedVehicle={checkedVehicle}
        />
      </div>
    </div>
  );
};

export default VehicleUi;
