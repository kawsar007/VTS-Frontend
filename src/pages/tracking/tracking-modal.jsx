/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";

const TrackingModal = ({ toggleTrackingModal, trackingModalVisible }) => {
  //   const [trackingModalVisible, setTrackingModalVisible] = useState(false);

  //   const toggleTrackingModal = () => {
  //     setTrackingModalVisible((prevState) => !prevState);
  //   };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-full">
        <div
          className={`formbold-form-wrapper mx-auto ${
            trackingModalVisible ? "" : "hidden"
          } w-full max-w-[550px] rounded-lg border border-[#e0e0e0] bg-white`}
        >
          <div className="flex items-center justify-between rounded-t-lg bg-[#6A6AF1] py-4 px-9">
            <h3 className="text-xl font-bold text-white">
              Lets chat? - Online
            </h3>
            <button onClick={toggleTrackingModal} className="text-white">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                className="fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.474874 0.474874C1.10804 -0.158291 2.1346 -0.158291 2.76777 0.474874L16.5251 14.2322C17.1583 14.8654 17.1583 15.892 16.5251 16.5251C15.892 17.1583 14.8654 17.1583 14.2322 16.5251L0.474874 2.76777C-0.158291 2.1346 -0.158291 1.10804 0.474874 0.474874Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.474874 16.5251C-0.158291 15.892 -0.158291 14.8654 0.474874 14.2322L14.2322 0.474874C14.8654 -0.158292 15.892 -0.158291 16.5251 0.474874C17.1583 1.10804 17.1583 2.1346 16.5251 2.76777L2.76777 16.5251C2.1346 17.1583 1.10804 17.1583 0.474874 16.5251Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-red-600">Track Modal Content</h3>
        </div>
        <div
          className={`mx-auto mt-12 flex max-w-[550px] items-center justify-end space-x-5 ${
            trackingModalVisible ? "hidden" : ""
          }`}
        >
          <button
            className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#6A64F1] text-white"
            onClick={toggleTrackingModal}
          >
            Track Modal
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
