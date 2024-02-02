import React from 'react';

import CreateDepartment from '../Panels/createDepartment';
import ModifyDepartment from './ModifyDepartment';

const ManagerPanel = () => {
  return (
    <div className='row w-100 overflow-hidden'>
      <div className='col-sm-6'>
        <CreateDepartment/>
      </div>
      <div className='col-sm-6'>
        <ModifyDepartment/>
      </div>
    </div>
  );
};

export default ManagerPanel;
