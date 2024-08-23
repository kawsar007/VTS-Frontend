import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaAddressBook } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { FiInfo } from "react-icons/fi";
import {
  MdBluetoothDrive,
  MdOutlineQuickreply,
  MdOutlineSms,
} from "react-icons/md";
import { axiosOpen } from "../../api/axios";
import { Tab, Tabs } from "../../common/tabs";
import DriverTable from "../../components/home/driver";
import { Manager } from "../../components/home/manager";
import SMSTable from "../../components/home/sms";
import VehicleInfo from "../../components/home/vehicle-info";
const ALL_VEHICLES = "vehicle/users/all";

const HomePage = () => {
  const [allVehicles, setAllVehicles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllVehicles = async () => {
      try {
        const response = await axiosOpen.post(ALL_VEHICLES, 10);
        // setAllVehicles(response.data);
        console.log("All Vehicles", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all vehicles:", error);
        setLoading(false);
      }
    };

    fetchAllVehicles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#E9F8F3B2]">
      <div className="w-full py-14 md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0">
        <div className="mt-16">
          <Tabs>
            <Tab label="Vehicle" icon={<FiInfo size={24} color="green" />}>
              <div className="py-4">
                <VehicleInfo />
              </div>
            </Tab>
            <Tab
              label="Log Book"
              icon={<FaAddressBook size={24} color="green" />}
            >
              <div className="py-4">
                <h2 className="text-lg font-medium mb-2">Tab 2 Content</h2>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid culpa
                  officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                  harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                  quia. Quo neque error repudiandae fuga? Ipsa laudantium
                  molestias eos sapiente officiis modi at sunt excepturi
                  expedita sint? Sed quibusdam recusandae alias error harum
                  maxime adipisci amet laborum.
                </p>
              </div>
            </Tab>
            <Tab label="SMS" icon={<MdOutlineSms size={24} color="green" />}>
              <div className="py-4">
                <SMSTable />
              </div>
            </Tab>

            <Tab
              label="Quick Info"
              icon={<MdOutlineQuickreply size={24} color="green" />}
            >
              <div className="py-4">
                <h2 className="text-lg font-medium mb-2">Tab 4 Content</h2>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid culpa
                  officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                  harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                  quia. Quo neque error repudiandae fuga? Ipsa laudantium
                  molestias eos sapiente officiis modi at sunt excepturi
                  expedita sint? Sed quibusdam recusandae alias error harum
                  maxime adipisci amet laborum.
                </p>
              </div>
            </Tab>
            <Tab label="Manager" icon={<FcManager size={24} color="green" />}>
              <div className="py-4">
                <Manager />
              </div>
            </Tab>

            <Tab
              label="Driver"
              icon={<MdBluetoothDrive size={24} color="green" />}
            >
              <div className="py-4">
                <div className="flex justify-between items-center border border-gray-300 mb-2 p-2 rounded-md">
                  <h3 className="text-2xl font-bold">Vehicle Info</h3>
                  <button className="px-5 py-1 rounded-md bg-[#20B486] text-white font-medium">
                    Create
                  </button>
                </div>
                <DriverTable />
              </div>
            </Tab>

            <Tab label="Profile" icon={<CgProfile size={24} color="green" />}>
              <div className="py-4">
                <h2 className="text-lg font-medium mb-2">Tab 7 Content</h2>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime mollitia, molestiae quas vel sint commodi repudiandae
                  consequuntur voluptatum laborum numquam blanditiis harum
                  quisquam eius sed odit fugiat iusto fuga praesentium optio,
                  eaque rerum! Provident similique accusantium nemo autem.
                  Veritatis obcaecati tenetur iure eius earum ut molestias
                  architecto voluptate aliquam nihil, eveniet aliquid culpa
                  officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                  harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                  quia. Quo neque error repudiandae fuga? Ipsa laudantium
                  molestias eos sapiente officiis modi at sunt excepturi
                  expedita sint? Sed quibusdam recusandae alias error harum
                  maxime adipisci amet laborum.
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
