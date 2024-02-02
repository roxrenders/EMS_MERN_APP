
import React, { useState } from 'react';
import axios from '../axios';
import { useAuth } from '../ContextApi/AuthContext';

const FilterSort = ({ setAllUsers }) => {
    const { token } = useAuth();
    const [filterLocation, setFilterLocation] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleFilterByLocation = async (location) => {
        try {
            const response = await axios.get(`/api/allusers/filterByLocation?location=${location}`, {
                headers: {
                    Authorization: token
                }
            });
            const { users } = response.data;
         
            setAllUsers(users);
        } catch (error) {
            console.error('Error filtering employees:', error);
        }
    };

    const handleSortByName = async () => {
        try {
            const response = await axios.get(`/api/allusers/sortByName?sortOrder=${sortOrder}`, {
                headers: {
                    Authorization: token
                }
            });
            setAllUsers(response.data.employees);
        } catch (error) {
            console.error('Error sorting employees:', error);
        }
    };

    return (
        <div className='d-flex mx-2 '>
       
            <div className="mb-3 d-flex">
                <input type="text" className=' form-control' placeholder="Enter location..." value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} />
                <button className="btn btn-primary mx-2 " onClick={() => handleFilterByLocation(filterLocation)}>Search</button>
            </div>
            <div className="mb-3 d-flex">
                <select  value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <button className="btn btn-primary mx-2" onClick={handleSortByName}>Sort by Name</button>
            </div>
        </div>
    );
};

export default FilterSort;
