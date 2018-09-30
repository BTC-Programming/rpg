import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div className='whirly'>
      <img
        src={spinner}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </div>
  );
};
