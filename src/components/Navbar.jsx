import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { close, companyLogo, hamburgerMenu, lock } from "../assets";
import LogoutIcon from "../assets/icons/logout-icon";
import ProfileIcon from "../assets/icons/profile-icon";
import SettingsIcon from "../assets/icons/settings-icon";
import { ROUTESCONSTANTS } from "../constants/Routes";
import { isLoggedIn, logout } from "../services";

const Navbar = () => {
  const navigate = useNavigate();
  const isLogin = isLoggedIn();
  const userInfo = JSON.parse(isLogin);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClick = () => setToggle(!toggle);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    toast.success("Logout Successfully");
  };

  return (
    <div className="w-full h-[80px] bg-white border-b fixed z-50">
      <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <Link to="/">
          <img src={companyLogo} className="h-[50px]" />
        </Link>
        <div className="hidden md:flex items-center ">
          <ul className="flex gap-4">
            <li>
              <Link to={ROUTESCONSTANTS.home}>Home</Link>
            </li>
            <li>
              <Link to={ROUTESCONSTANTS.tracking}>Tracking</Link>
            </li>
            <li>
              <Link to={ROUTESCONSTANTS.reports}>Reports</Link>
            </li>
            <li>
              <Link to={ROUTESCONSTANTS.operation}>Operation</Link>
            </li>
            <li>
              <Link to={ROUTESCONSTANTS.admin}>Admin</Link>
            </li>
            <li>
              <Link to={ROUTESCONSTANTS.accounting}>Accounting</Link>
            </li>
            <li>
              <Link to={ROUTESCONSTANTS.serviceCharge}> Service-Charge</Link>
            </li>
          </ul>
        </div>

        {!isLogin ? (
          <div className="hidden md:flex">
            <button className="flex justify-between items-center  bg-transparent  px-6 gap-2">
              <img src={lock} />
              <Link to={ROUTESCONSTANTS.login}>Login</Link>
            </button>
            <button className="px-8 py-3 rounded-md bg-[#20B486] text-white font-bold">
              <Link to={ROUTESCONSTANTS.register}>Sign Up For Free</Link>
            </button>
          </div>
        ) : (
          // User Modal Start
          <div
            onClick={() => setOpen(!open)}
            className={`relative border-b-4 border-transparent py-3 ${
              open ? "border-indigo-700 transform transition duration-300" : ""
            }`}
          >
            <div className="flex justify-center items-center space-x-3 cursor-pointer">
              <div className="hidden md:block font-semibold dark:text-white text-gray-900 text-lg">
                <div className="cursor-pointer">
                  {userInfo?.user?.first_name}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {open && (
              <div className="absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                <ul className="space-y-3 dark:text-white">
                  <li className="font-medium">
                    <a
                      href="/profile"
                      className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                    >
                      <div className="mr-3">
                        <ProfileIcon />
                      </div>
                      Profile
                    </a>
                  </li>
                  <li className="font-medium">
                    <a
                      href="#"
                      className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                    >
                      <div className="mr-3">
                        <SettingsIcon />
                      </div>
                      Setting
                    </a>
                  </li>
                  <hr className="dark:border-gray-700" />
                  <li className="font-medium">
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                    >
                      <div className="mr-3 text-red-600">
                        <LogoutIcon />
                      </div>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          // User Modal End
        )}

        <div className="md:hidden" onClick={handleClick}>
          <img src={toggle ? close : hamburgerMenu} />
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4  bg-white w-full px-8 md:hidden border-b"
            : "hidden"
        }
      >
        <ul>
          <li className="p-4 hover:bg-gray-100">
            <Link to={ROUTESCONSTANTS.home}>Home</Link>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <Link to={ROUTESCONSTANTS.tracking}>Tracking</Link>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <Link to={ROUTESCONSTANTS.reports}>Reports</Link>
          </li>
          <li className="p-4 hover:bg-gray-100">
            {" "}
            <Link to={ROUTESCONSTANTS.operation}>Operation</Link>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <Link to={ROUTESCONSTANTS.admin}> Admin </Link>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <Link to={ROUTESCONSTANTS.accounting}> Accounting </Link>
          </li>
          <li className="p-4 hover:bg-gray-100">
            {" "}
            <Link to={ROUTESCONSTANTS.serviceCharge}> Service-Charge</Link>
          </li>
          <div className="flex flex-col my-4 gap-4">
            <button className="border border-[20B486] flex justify-center items-center  bg-transparent  px-6 gap-2 py-4">
              <img src={lock} />
              <Link to={ROUTESCONSTANTS.login}>Login</Link>
            </button>
            <button className="px-8 py-5 rounded-md bg-[#20B486] text-white font-bold">
              <Link to={ROUTESCONSTANTS.register}>Sign Up For Free</Link>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
