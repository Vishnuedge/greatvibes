import React, {useState} from 'react'
import Jobs from './views/jobs'
import AlertComponent from './components/common/alert'
import {  useSelector } from 'react-redux';
import Navbar from './components/common/navbar';


const App = () => {
  const alert = useSelector((state) => state.alert);
  const [isJobFormOpen, setJobformOpen] = useState(false);
  const openJobFormModal = () => setJobformOpen(true);
  const closeJobFormModal = () => setJobformOpen(false);
  

  return (
    <>
    <main className="w-full 2xl:w-[1800px] mx-auto my-auto ">
      <div className='sticky top-0 z-30 shadow-lg w-full py-4 bg-black drop-shadow text-white'>
      <Navbar isJobFormOpen = {isJobFormOpen} closeJobFormModal = {closeJobFormModal} openJobFormModal = {openJobFormModal}  />
      </div>
      <AlertComponent {...alert}  />
      <Jobs openJobFormModal={openJobFormModal} />
    </main>
    </>
  )
}

export default App