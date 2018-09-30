import React from 'react';
import placeholder from './placeholder.svg';

export default () => {
  return (
    <div className='placeholder'>
      <img
        className='mr-2'
        src={placeholder}
        style={{ 'maxWidth': '80px', 'margin': 'auto', 'display': 'block' }}
        alt='Loading...'
      />
    </div>
  );
};
