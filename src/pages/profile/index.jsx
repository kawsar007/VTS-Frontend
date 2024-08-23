/* eslint-disable react/prop-types */

import { getUserDetails } from "../../services";

function Profile() {
  const loggedInUser = getUserDetails();
  const { user } = loggedInUser;
  return (
    <div className="w-full py-14 md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0">
      <div className="border-b-2 block md:flex py-14">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">
              {user?.first_name} {user?.last_name}
            </span>
            {/* <a
                href="#"
                className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
              >
                Edit
              </a> */}
          </div>

          <span className="text-gray-600">
            With a passion for safe and comfortable transportation, Babu Khan
            has been serving as a private car driver for [X years/months].
            Dedicated to providing exceptional service, he ensures that
            passengers reach their destinations promptly and securely.
          </span>
          <div className="w-full p-8 mx-2 flex justify-center">
            <img
              id="showImage"
              className="max-w-xs w-32 items-center border"
              src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="rounded  shadow p-6">
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Name
              </label>
              <div className="flex">
                <input
                  disabled
                  id="username"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="text"
                  value={`${user.first_name} ${user.last_name}`}
                />
              </div>
            </div>

            <div className="pb-4">
              <label
                htmlFor="about"
                className="font-semibold text-gray-700 block pb-1"
              >
                Email
              </label>
              <input
                disabled
                id="email"
                className="border-1  rounded-r px-4 py-2 w-full"
                type="email"
                value={user.email}
              />
            </div>
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Address
              </label>
              <div className="flex">
                <input
                  disabled
                  id="username"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="text"
                  value={`${user.address_line_one} ${user.address_line_two}`}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Phone No
              </label>
              <div className="flex">
                <input
                  disabled
                  id="username"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="text"
                  value={user?.phone_no}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Role
              </label>
              <div className="flex">
                <input
                  disabled
                  id="username"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="text"
                  value={user?.role}
                />
              </div>
            </div>
            <span className="text-gray-600 pt-4 block opacity-70">
              Personal login information of your account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
