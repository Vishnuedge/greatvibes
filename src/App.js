import React from 'react'
import Jobs from './views/jobs'
import AlertComponent from './components/common/alert'
import {  useSelector } from 'react-redux';


const App = () => {
  const alert = useSelector((state) => state.alert);
  return (
    <>
    <main className="w-full 2xl:w-[1800px] mx-auto my-auto ">
      <AlertComponent {...alert}  />
      <Jobs />
    </main>
    </>
  )
}

export default App