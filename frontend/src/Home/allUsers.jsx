import React, { useEffect, useState } from 'react';
import { useAuth } from '../ContextApi/AuthContext';
import axios from '../axios';
import Pagination from '../Pagination/pagination'
import FilterSort from '../FilterSort/filterSort';

export const AllUsers = () => {
    const { allUsers,isAdmin,user,setAllUsers,token} = useAuth();
  
    const [editId, setEditId] = useState(null);
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
   const [totalPages, setTotalPages] = useState(0);
   
    useEffect(() => {
        fetchUsers();
    }, [page, pageSize]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`/api/allusers?page=${page}&pageSize=${pageSize}`, {
                headers: {
                    Authorization: token
                }
            });
            setAllUsers(response.data.users);
            const totalUsers = response.data.users.length;
            const totalPages = Math.ceil(totalUsers / pageSize);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handlePagination = (newPage) => {
        setPage(newPage);
    };


    const handeDelete= async(id)=>{
        if (id === user._id) {
            alert("Cannot delete your own account");
            return;
        }   
        
        try {
            const response = await axios.delete(`/api/user/delete/${id}`,{
              headers: {
                Authorization: token
              }
            });
            setAllUsers(allUsers.filter(user => user._id !== id));
          } catch (error) {
            console.error('Error removing User:', error);
          }
    }

    const handeEdit = async (id) => {
        try {
            setEditId(id)
           
        } catch (error) {
            console.error('Error updating User:', error);
        }
    };

    const handleSave = async (id) => {
        try {
            const response = await axios.put(`/api/user/edit/${id}`, {
                firstName: editFirstName,
                lastName: editLastName
            }, {
                headers: {
                    Authorization: token
                }
            });
            const updatedUser = response.data.user;
            setAllUsers(allUsers.map(user => (user._id === id ? updatedUser : user)));
            setEditId(null);
        } catch (error) {
            console.error('Error updating User:', error);
        }
    };
    
      const handleCancel = () => {
        setEditId(null);
        setEditFirstName("");
        setEditLastName("");

      };

    return (
        <div className="container mt-5 h-100vh">
            <h1 className="mb-4">All Users</h1>

        <div className='d-flex mx-2  align-items-center'>
            
             <FilterSort setAllUsers={setAllUsers} />
        </div>
   
         <Pagination page={page} totalPages={totalPages} handlePagination={handlePagination} />

            <ul className="list-group"  style={{ maxHeight: '450px', overflowY: 'auto', borderRadius: '5px' }}>
  {allUsers?.length >= 1 && allUsers.map(({ _id, firstName, lastName, email, jobTitle, location }) => (
    <li className="list-group-item d-flex justify-content-between align-items-center m-2" key={_id}>
      {editId === _id ? (
        <div className="d-flex flex-column">
          <input type="text" className="form-control mb-1" placeholder="First name" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
          <input type="text" className="form-control mb-1" placeholder="Last name" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
        </div>
      ) : (
        <div className="d-flex flex-column">
  <h5 className="mb-3">{firstName} {lastName}</h5>
  <div className="d-flex flex-wrap">
    <p className="me-3 mb-0"> <span className="text-primary">EMAIL:</span> {email}</p>
    <p className="me-3 mb-0"><span className="text-primary">LOCATION:</span> {location}</p>
    <p className="mb-0"><span className="text-primary">JOB TITLE:</span> {jobTitle}</p>
  </div>
</div>   )}

      {isAdmin === true && (
        <div>
          {editId === _id ? (
            <div>
              <button className="btn btn-primary mb-1" onClick={() => handleSave(_id)}>Save</button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button className="btn btn-outline-primary me-3" onClick={() => handeEdit(_id, firstName, lastName, email)}>✏️ Edit</button>
          )}
          <button className="btn btn-outline-danger" onClick={() => handeDelete(_id)}>❌ Delete</button>
        </div>
      )}
    </li>
  ))}
</ul>

        </div>
    );
};

export default AllUsers;
