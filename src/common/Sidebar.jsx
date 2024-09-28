/* eslint-disable react/prop-types */
import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = ({ menuItems }) => {
  return (
    <aside className='flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l'>
      <div className='flex flex-col justify-between flex-1 mt-6'>
        <nav className='-mx-3 space-y-6'>
          {menuItems.map((section, index) => (
            <div key={index} className='space-y-3'>
              <label className='px-3 text-xs text-gray-500 uppercase'>
                {section.label}
              </label>
              {section.items.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.href}
                  className='flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700'>
                  <item.icon className='w-5 h-5' />
                  <span className='mx-2 text-sm font-medium'>{item.name}</span>
                </Link>
              ))}
            </div>
          ))}
         
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
