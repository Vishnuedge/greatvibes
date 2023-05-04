import React from 'react'
import Jobs from './views/jobs'
import AlertComponent from './components/common/alert'
import {  useSelector } from 'react-redux';


const App = () => {
  const alert = useSelector((state) => state.alert);
  return (
    <>
    <main className="w-full md:w-[1450px] mx-auto my-auto ">
      <AlertComponent {...alert}  />
      <Jobs />
    </main>
    </>
  )
}

export default App