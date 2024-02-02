import React, { useEffect } from 'react';
import { useAuth } from '../ContextApi/AuthContext';


const MyAccount = () => {
  const { user } = useAuth();


  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h4>USER DETAILS</h4>
        </div>
        <div className="card-body">
          <div className="row">

            <div className="col-md-4">
              <div className="form-group ">
                <label className="font-weight-bold text-secondary">NAME:</label>
                <p >{user.firstName} {user.lastName}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label className="font-weight-bold text-secondary">ID NO:</label>
                <p>{user._id}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label className="font-weight-bold text-secondary">ROLE:</label>
                <p>{user.role}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="font-weight-bold text-secondary">EMAIL:</label>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="font-weight-bold text-secondary">JOBTITLE:</label>
                <p>{user.jobTitle}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="font-weight-bold text-secondary">LOCATION:</label>
                <p>{user.location}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
