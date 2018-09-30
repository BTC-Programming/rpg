import React from 'react';
import { Link } from 'react-router-dom';

const ManageAccount = () => {
  return (
    <div className='btn-toolbar my-3' role='toolbar'>
      <Link to='/account' className='btn btn-theme-bluegray mr-2'>
        <i className='fa fa-cog'></i> Manage Account
      </Link>
      <Link to='/character' className='btn btn-theme-bluegray mr-2'>
        <i className='fa fa-user-plus'></i> New Character
      </Link>
      <Link to='/play' className='btn btn-theme-bluegray'>
        <i className="fa fa-play-circle"></i> Play Game 
      </Link>
    </div>
  );
};

export default ManageAccount;
