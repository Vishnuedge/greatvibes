import React from 'react'
import Jobs from './views/jobs'
import AlertComponent from './components/common/alert'
import {  useDispatch, useSelector } from 'react-redux';
import Navbar from './components/common/navbar';
import { closeModal, openModal } from './reducers/modal';


const App = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.alert);
  const isModalOpen =  useSelector((state) => state.modal.isOpen);
  const handleModalOpen = () => dispatch(openModal())
  const handleModalClose = () => dispatch(closeModal())
  

  return (
    <>
   
      <main className="w-full min-h-full bg-background 2xl:max-w-[1600px] mx-auto my-auto ">
      <div className='sticky top-0 z-30 shadow-lg w-full py-4 bg-black drop-shadow text-white'>
      <Navbar isModalOpen={isModalOpen} handleModalClose ={ handleModalClose} handleModalOpen={handleModalOpen} />
      </div>
      <AlertComponent {...alert}  />
      <Jobs  handleModalOpen ={handleModalOpen} />
    </main>
    </>
  )
}

export default App