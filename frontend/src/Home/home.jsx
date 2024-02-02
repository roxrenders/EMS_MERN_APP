import React from 'react';
import Navbar from './navbar';
import { useAuth } from '../ContextApi/AuthContext';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import Departments from '../Panels/Departments';
import { AllUsers } from './allUsers';
import MyAccount from './myAccount';

export const Home = () => {
  const { user, token, activeTab } = useAuth();

  return (
    <div>
      {token !== null ? (
        <div>
          <Navbar />
          <div className="d-flex" style={{ height: '100vh' }}>
            <div className="flex-grow-0" style={{ width: '15%', backgroundColor: '#f0f0f0' }}>
              <Sidebar />
            </div>
            <div className="flex-grow-1 bg-white overflow-auto">
              {activeTab === 'MyAccount' && <MyAccount />}
              {activeTab === 'AllUsers' && <AllUsers />}
              {activeTab === 'Departments' && <Departments />}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <p className="mb-3">Login to access this page</p>
          <Link to="/" className="btn btn-primary curs">Login</Link>
        </div>
      </div>
      )}
    </div>
  );
};

export default Home;
