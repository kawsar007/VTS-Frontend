/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  return (
    <aside className='flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l'>
      <div className='flex flex-col justify-between flex-1 mt-6'>
        <nav className='-mx-3 space-y-6'>
          {menuItems?.map((section, index) => (
            <div key={index} className='space-y-3'>
              <label className='px-3 text-xs text-gray-500 uppercase'>
                {section.label}
              </label>
              {section.items.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg w-full ${
                      isActive
                        ? "md:bg-gray-200 md:text-gray-900" // Active background for mobile
                        : "text-gray-600 md:hover:bg-gray-100 md:hover:text-gray-700"
                    }`
                  }>
                  {/* Icon */}
                  <item.icon className='w-5 h-5' />

                  {/* Name - Hidden on small devices */}
                  <span className='mx-2 text-sm font-medium hidden md:block'>
                    {item.name}
                  </span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
