import React from 'react'
import { useAuth } from '../ContextApi/AuthContext'
import ManagerPanel from './managerPanel'

const Departments = () => {
    const{user}=useAuth()
  return (
    <div >
       <div className='justify-content-center align-items-center vh-100' style={{ flex: '1', backgroundColor: '#ffffff', overflowY: 'auto' }}>
        {user.role >= 1 ? <ManagerPanel /> : <div className='text-center mt-5 border border-danger-subtle '><h4>This Section Is Only For Managers</h4> </div>}
      </div>
    </div>
  )
}

export default Departments
