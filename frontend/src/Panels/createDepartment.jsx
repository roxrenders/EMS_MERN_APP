import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useAuth } from '../ContextApi/AuthContext';

const CreateDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const { setSelectedDept, token } = useAuth();

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/alldepts', {
        headers: {
          Authorization: token
        }
      });
      setDepartments(response.data.departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddDept = async () => {
    try {
      if (departments.some((dept) => dept.name === newDeptName)) {
        alert('A department with this name already exists.');
        return;
      }
      const response = await axios.post(
        '/api/createdept',
        { name: newDeptName },
        {
          headers: {
            Authorization: token
          }
        }
      );
      setDepartments([...departments, response.data]);
      setNewDeptName('');
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className='m-2 container'>
      <h1 className='text-center'>ALL DEPARTMENTS</h1>
      <div className="m-3 d-flex  ">
        <input
          type="text"
          className="form-control mx-3"
          placeholder="Enter department name"
          value={newDeptName}
          onChange={(e) => setNewDeptName(e.target.value)}
        />
        <button className="btn btn-primary px-4" onClick={handleAddDept}>
          Add 
        </button>
      </div>
     
      <div
        className="list-group"
        style={{ maxHeight: '450px', overflowY: 'auto', borderRadius: '5px' }}
      >
        {departments?.map((dept) => (
          <button
            key={dept._id}
            className={`list-group-item list-group-item-action ${
              selectedDeptId === dept._id ? 'active' : ''
            }`}
            onClick={() => {
              setSelectedDeptId(dept._id);
              setSelectedDept(dept);
            }}
          >
            {dept.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CreateDepartment;
