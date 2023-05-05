import React  from 'react';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';

function AlertComponent() {
  const alert = useSelector(state => state.alert);

  if (!alert) {
    return null;
  }

  return (
    <div className="sticky top-0 left-[95%] z-30  w-11/12 md:w-1/2 lg:w-1/3">
    <Alert  severity={alert.type}>
      {alert.message}
    </Alert>
  </div>
    
  );
}

export default AlertComponent;
