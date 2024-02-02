import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../ContextApi/AuthContext';


const Sidebar = () => {
 const {activeTab,setActiveTab}=useAuth()

  const handleClick = (item) => {
    setActiveTab(item);
  };

  return (
    <div className="m-3 mt-5">
      <div className="d-grid gap-2">
        {['MyAccount', 'AllUsers', 'Departments'].map(item => (
          <Link
            key={item}
           
            className={`btn btn-block mb-2 ${activeTab === item ? " btn-secondary" : ""}`}
            onClick={() => handleClick(item)}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
