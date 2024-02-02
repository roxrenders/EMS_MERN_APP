import React, { useEffect, useState } from 'react';
import { useAuth } from '../ContextApi/AuthContext';
import axios from '../axios';

const ModifyDepartment = () => {
  const { selectedDept, allUsers, token } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const selectEmployee = async (event) => {
    try {
      const employeeId = event.target.value;
      
      if (employeeId === "defaultOption") {
        alert("Select Anathor Option");
        return;
      }
  
      if (selectedEmployee.includes(employeeId)) {
        alert("This employee is already added to the department.");
        return;
      }
      await axios.post('/api/addemployee', { deptId: selectedDept._id, employeeId }, {
        headers: {
          Authorization: token
        }
      });
      setSelectedEmployee([...selectedEmployee, employeeId]); 
  
      event.target.value = '';
    } catch (error) {
      console.error('Error adding employee to department:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete('/api/deleteemployee', {
        data: { id, deptId: selectedDept._id },
        headers: {  
          Authorization: token
        }
      });
    
      setSelectedEmployee(selectedEmployee.filter(empId => empId !== id));
    } catch (error) {
      console.error('Error Deleting employee from department:', error);
    }
  };
  

  const fetchEmployees = async () => {
    try {
      if (selectedDept) {
        const response = await axios.get(`/api/dept/${selectedDept._id}`, {
          headers: {
            Authorization: token
          }
        });
        const department = response.data.department;
        setSelectedEmployee(department.employees);
      }
    } catch (error) {
      console.error('Error fetching Selected Employees:', error);
    }
  };
  
  useEffect(() => {
    fetchEmployees();
  }, [selectedDept]);
  
 

  return (
    <div className='container'>
      <h2 className='text-center mt-3'>EMPLOYEES IN DEPARTMENT</h2>
      {selectedDept && (
        <>
          <h2 className='text-center text-success m-2'>{selectedDept.name}</h2>
        </>
      )}
      <select onChange={selectEmployee}>
        <option value="defaultOption">Add Employees</option>
        {allUsers.length >= 1 &&
          allUsers.map((employee) => (
            <option key={employee._id} value={employee._id}>
              NAME - {employee.firstName},  JOBTITLE- {employee.jobTitle}
            </option>
          ))}
      </select>

      <h4 className='mt-4'>This Department's Employees</h4>
      <ul>
        {selectedEmployee?.map((employeeId) => {
          const employee = allUsers.find((emp) => emp._id === employeeId);
          if (employee) {
            return (
              <li key={employee._id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', margin:'2px' }}>
                  <span>{employee.firstName}</span>
                  <span>{employee.email}</span>
                  <span>{employee.location}</span>
                  <button className=' btn btn-outline-danger ' onClick={() => handleDelete(employee._id)}>❌</button>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default ModifyDepartment;
