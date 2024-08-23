import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaCarSide } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Tab, Tabs } from "../../common/tabs";
import CarDetailsInfo from "../../components/tracking-ui/car-details";
import SingleVehicleLastInfoModal from "../../components/tracking-ui/car-details/vehicle-last-info";
import HistoryUI from "../../components/tracking-ui/history";
import VehicleUi from "../../components/tracking-ui/vehicle";

const fetchData = async (setData, setIsLoading, setError) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}location/history`
    );
    setData(response.data);
    setIsLoading(false);
  } catch (error) {
    setError(error);
    setIsLoading(false); // Ensure loading state is updated even in case of an error
  }
};

const Tracking = () => {
  const mapRef = useRef();
  const [formVisible, setFormVisible] = useState(false);
  const [mapZoom, setMapZoom] = useState(8);
  const [center, setCenter] = useState({ lat: 23.3453453, lng: 90.543433 });
  // const center = useMemo(() => ({ lat: 23.3453453, lng: 90.543433 }), []);

  const options = useMemo(
    () => ({
      mapId: "4e550a138db6cc0a",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onload = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const toggleTrackModal = () => {
    setFormVisible((prevState) => !prevState);
  };

  // History Functionalities Start
  const [singleCarHistory, setSingleCarHistory] = useState([]); // store single car history
  const [vehicleInfo, setVehicleInfo] = useState(null); // store vehicle info for history section.
  const [userVehicle, setUserVehicle] = useState([]); // store logged in user vehicle
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState(null);
  const [selectVehicle, setSelectVehicle] = useState([]); // store single, multiple select vehicle
  const [checkedVehicle, setCheckedVehicle] = useState([]); // Store all Checked vehicle
  const [selectAllVehicle, setSelectAllVehicle] = useState(false); // store all select & deselect vehicle
  const [selectVehicleLastInfo, setSelectVehicleLastInfo] = useState(null); // store checked vehicle information for vehicle section.

  const [startPointInfoWindowOpen, setStartPointInfoWindowOpen] =
    useState(true);
  const [endPointInfoWindowOpen, setEndPointInfoWindowOpen] = useState(true);

  const fetchDataCallback = useCallback(() => {
    fetchData(setVehicleInfo, setIsLoading, setError);
  }, []);

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

  // Will Call Again After 5seconds last location is updated;
  // useEffect(() => {
  //   fetchDataCallback();
  //   fetchUserVehicles();

  //   const interval = setInterval(fetchUserVehicles, 5000);
  //   return () => clearInterval(interval);
  // }, [fetchDataCallback, fetchUserVehicles]);

  useEffect(() => {
    fetchDataCallback();
    fetchUserVehicles();

    const interval = setInterval(() => {
      if (checkedVehicle.length > 0) {
        selectSingleVehicle(checkedVehicle.join("#"));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchDataCallback, fetchUserVehicles, checkedVehicle]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!singleCarHistory) {
    return null; // Handle case where data is null
  }

  // History Functionalities End

  const startPoint = singleCarHistory[0];
  const endPoint = singleCarHistory[singleCarHistory.length - 1];

  const handleSelectVehicle = (event, numberPlate) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const updatedSelectedvehicle = [...checkedVehicle, numberPlate];
      setCheckedVehicle(updatedSelectedvehicle);
      selectSingleVehicle(updatedSelectedvehicle.join("#"));
    } else {
      const updatedSelectedVehicle = checkedVehicle.filter(
        (plate) => plate !== numberPlate
      );
      setCheckedVehicle(updatedSelectedVehicle);
      selectSingleVehicle(updatedSelectedVehicle.join("#"));
    }
  };

  // Handle Select ALl Car
  const handleSelectAllVehicle = (event) => {
    const isChecked = event.target.checked;
    setSelectAllVehicle(isChecked);
    if (isChecked) {
      const allNumberPlates = userVehicle.map(
        (vehicle) => vehicle.number_plate
      );
      setCheckedVehicle(allNumberPlates);
      selectSingleVehicle(allNumberPlates.join("#"));
    } else {
      setCheckedVehicle([]);
    }
  };

  // Single Vehicle Select
  const selectSingleVehicle = async (selectVehicleString) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}location/last`,
        {
          vehicles: selectVehicleString,
        }
      );
      setSelectVehicle(response.data?.data);
    } catch (error) {
      console.error("Error fetching vehicle details:", error.message);
    }
  };

  return (
    <div className="bg-[#E9F8F3B2]">
      <div className="w-full py-14 m-auto px-4 md:px-0">
        <div className="mt-6 relative">
          <div id="map" style={{ width: "100%", height: "100%" }}>
            <GoogleMap
              zoom={mapZoom}
              center={center}
              mapContainerClassName="map-container"
              options={options}
              onload={onload}
            >
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      zIndex: 50,
                      strokeColor: "red",
                      // strokeOpacity: 1,
                      strokeWeight: 10,
                    },
                    suppressMarkers: true,
                  }}
                />
              )}

              {/* Start Point */}
              {startPoint && (
                <InfoWindow
                  position={{
                    lat: parseFloat(startPoint.latitude),
                    lng: parseFloat(startPoint.longitude),
                  }}
                  onCloseClick={() => setStartPointInfoWindowOpen(false)}
                  options={{ maxWidth: 200 }}
                  visible={startPointInfoWindowOpen}
                >
                  <div>
                    <p>Start Point</p>
                  </div>
                </InfoWindow>
              )}

              {/* End Point */}
              {endPoint && (
                <InfoWindow
                  position={{
                    lat: parseFloat(endPoint.latitude),
                    lng: parseFloat(endPoint.longitude),
                  }}
                  onCloseClick={() => setEndPointInfoWindowOpen(false)}
                  options={{ maxWidth: 200 }}
                  visible={endPointInfoWindowOpen}
                >
                  <div>
                    <p>End Point</p>
                  </div>
                </InfoWindow>
              )}

              {singleCarHistory.map((car, i) => (
                <React.Fragment key={i}>
                  <Marker
                    position={{
                      lat: parseFloat(car.latitude),
                      lng: parseFloat(car.longitude),
                    }}
                    icon={{
                      url: "/src/assets/car-icon.png", // URL to your custom icon image
                      scaledSize: new window.google.maps.Size(40, 40), // Size of the icon
                    }}
                    onClick={() => setSelectedMarker(car)}
                  />
                </React.Fragment>
              ))}

              {selectedMarker && (
                <InfoWindow
                  position={{
                    lat: parseFloat(selectedMarker.latitude),
                    lng: parseFloat(selectedMarker.longitude),
                  }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div>
                    <p>AC: {selectedMarker.ac}</p>
                    <p>Engin: {selectedMarker.engine}</p>
                    <p>Fuel: {selectedMarker.fuel}</p>
                    <p>Speed: {selectedMarker.speed}</p>
                    <p>Time: {selectedMarker.time}</p>
                    <p>Latitude: {selectedMarker.latitude}</p>
                  </div>
                </InfoWindow>
              )}
              {/* Single Car Details */}
              {selectedMarker && (
                <CarDetailsInfo selectedMarker={selectedMarker} />
              )}

              {/* Vehicle Last Location Show in Map Functionalities Start */}
              {checkedVehicle.length > 0 &&
                selectVehicle?.map((vehicle, i) => (
                  <React.Fragment key={i}>
                    <Marker
                      position={{
                        lat: parseFloat(vehicle?.latitude),
                        lng: parseFloat(vehicle?.longitude),
                      }}
                      icon={{
                        url:
                          vehicle?.engine === "0"
                            ? "/src/assets/stop-icon.png"
                            : "/src//assets/on-car.png", // URL to your custom icon image
                        scaledSize: new window.google.maps.Size(40, 40), // Size of the icon
                      }}
                      onClick={() => setSelectVehicleLastInfo(vehicle)}
                    />
                  </React.Fragment>
                ))}

              {selectVehicleLastInfo && (
                <InfoWindow
                  position={{
                    lat: parseFloat(selectVehicleLastInfo.latitude),
                    lng: parseFloat(selectVehicleLastInfo.longitude),
                  }}
                  onCloseClick={() => setSelectVehicleLastInfo(null)}
                >
                  <div>
                    <p>AC: {selectVehicleLastInfo.ac}</p>
                    <p>Engin: {selectVehicleLastInfo.engine}</p>
                    <p>Fuel: {selectVehicleLastInfo.fuel}</p>
                    <p>Speed: {selectVehicleLastInfo.speed}</p>
                    <p>Time: {selectVehicleLastInfo.time}</p>
                    <p>Latitude: {selectVehicleLastInfo.latitude}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>

        {/* Select Vehicle Last Info */}
        {selectVehicleLastInfo && (
          <SingleVehicleLastInfoModal vehicleInfo={selectVehicleLastInfo} />
        )}

        {/* Vehicle Last Location Show in Map Functionalities End */}

        {/* Track Modal */}
        <div
          className={`absolute ${
            formVisible ? "bottom-0 left-0" : "bottom-4 left-4"
          } text-white py-2 rounded`}
        >
          <div className="flex items-center justify-center">
            <div className="w-full">
              <div
                className={`formbold-form-wrapper mx-auto ${
                  formVisible ? "" : "hidden"
                } w-[420px] h-[75vh] rounded-lg border border-[#e0e0e0] bg-white`}
              >
                <div className="flex items-center justify-between rounded-t-lg bg-[#6A64F1] py-2 px-4">
                  <h3 className="text-xl font-medium text-white">
                    All Tracking Info
                  </h3>
                  <button onClick={toggleTrackModal} className="text-white">
                    <IoMdClose />
                  </button>
                </div>
                <Tabs>
                  <Tab
                    label="Vehicle"
                    // icon={<FiInfo size={24} color="green" />}
                  >
                    <VehicleUi
                      userVehicle={userVehicle}
                      handleSelectVehicle={handleSelectVehicle}
                      selectVehicle={selectVehicle}
                      handleSelectAllVehicle={handleSelectAllVehicle}
                      selectAllVehicle={selectAllVehicle}
                      checkedVehicle={checkedVehicle}
                    />
                  </Tab>
                  <Tab
                    label="Markers"
                    // icon={<FiInfo size={24} color="green" />}
                  >
                    <h3 className="py-4 text-red-700">
                      Markers Tab Lorem ipsum dolor sit amet. Markers Tab Lorem
                      ipsum dolor sit amet.
                    </h3>
                  </Tab>
                  <Tab
                    label="History"
                    // icon={<FiInfo size={24} color="green" />}
                  >
                    <HistoryUI
                      vehicleHistory={vehicleInfo.data.slice(0, 20)}
                      setSingleCarHistory={setSingleCarHistory}
                      vehicleInfo={vehicleInfo}
                      setMapZoom={setMapZoom}
                      setCenter={setCenter}
                      setDirections={setDirections}
                      startPoint={startPoint}
                      endPoint={endPoint}
                    />
                  </Tab>
                </Tabs>
              </div>
              <div
                className={`mx-auto mt-12 flex max-w-[550px] items-center justify-end space-x-5 ${
                  formVisible ? "hidden" : ""
                }`}
              >
                <button
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#6A64F1] text-white"
                  onClick={toggleTrackModal}
                >
                  <FaCarSide size={30} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
