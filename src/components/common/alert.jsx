import React  from 'react';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

function AlertComponent() {
  const alert = useSelector(state => state.alert);

  if (!alert) {
    return null;
  }

  return (
    <>
    <div className='mx-auto w-1/2' >
    <Alert className='fixed top-5  right-5  w-1/2 z-50 '  severity={alert.type}>{alert.message}</Alert>
    </div>
    </>
    
  );
}

export default AlertComponent;
