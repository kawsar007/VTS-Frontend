/* eslint-disable react/prop-types */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { Analytics, Dashboard, Guides } from "./Test";

const Layout = ({ children, menuItems }) => {
  return (
    <div className='w-full py-14 md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0'>
      <div>
        <div className='flex h-screen'>
          <div className='w-2/12'>
            <Sidebar menuItems={menuItems} />
          </div>
          <div className='w-10/12 border p-4 mt-10'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/analytics' element={<Analytics />} />
              <Route path='/guides' element={<Guides />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
