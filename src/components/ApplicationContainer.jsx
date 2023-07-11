import React from 'react';

function ApplicationContainer({ children }) {
  return (
    <div className='mx-auto max-w-screen-lg py-5 px-8 md:px-32'>{children}</div>
  );
}

export default ApplicationContainer;
