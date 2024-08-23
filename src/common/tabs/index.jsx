/* eslint-disable react/prop-types */
import React, { useState } from "react";
import TabButton from "../buttons/tab-button";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleTabClick = (newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  return (
    <div className="w-full max-auto">
      <div className="flex border-b border-gray-300 bg-white">
        {children.map((child) => (
          <TabButton
            key={child.props.label}
            isActive={activeTab === child.props.label}
            onClick={() => handleTabClick(child.props.label)}
            icon={child.props.icon}
            label={child.props.label}
          />
        ))}
      </div>

      <div className="py-4">
        {children.map((child) => (
          <div
            key={child.props.label}
            style={{
              display: activeTab === child.props.label ? "block" : "none",
            }}
          >
            {child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

const Tab = ({ label, children }) => {
  return (
    <div label={label} className="hidden">
      {children}
    </div>
  );
};

export { Tab, Tabs };
