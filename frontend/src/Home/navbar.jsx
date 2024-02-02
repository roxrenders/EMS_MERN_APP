
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../ContextApi/AuthContext';
import logo from '../../public/logo.png';



const Navbar = () => {
    const navigate = useNavigate()
    const {  logout } = useAuth();


    const handleLogout = async () => {
        try {
          await logout();
          alert('Logout successful');
        navigate('/')
        } catch (error) {
          console.error('Logout failed:', error.response.error);
        }
    };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
      <div className="navbar-brand">
                    <img src={logo} alt="logo" style={{ maxWidth: '100px', maxHeight: '50px' }} />
                </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link onClick={handleLogout} className="nav-link" to="/logout">Logout</Link >
            </li>
            <li className="nav-item">
              <Link className="nav-link"  >Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
