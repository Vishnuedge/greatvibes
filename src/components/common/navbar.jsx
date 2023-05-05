import React from "react";
import Modal from "./modal";
import JobForm from "../job/jobForm";

const Navbar = ({ isJobFormOpen, closeJobFormModal, openJobFormModal }) => {
  
  const flexBetween = "flex items-center justify-between";

  return (
    <>
    <nav className={`${flexBetween}`}>
        <div className={`${flexBetween } mx-auto w-full md:w-5/6`}>
          <div className={`${flexBetween} w-full gap-32`} >
              <p className={`${flexBetween} md:visible invisible gap-2 text-2xl font-semibold`}>GREAT <p>VIBES</p></p>
          </div>
        </div>
        <button className="bg-white md:visible invisible px-4 py-2 text-black rounded-lg inline-block mr-10"  onClick={openJobFormModal} >Post Job</button>
    </nav>
   
    <Modal isOpen = {isJobFormOpen} closeModal = {closeJobFormModal} >
        <JobForm closeModal={closeJobFormModal} />
    </Modal>
    </>
  )
}

export default Navbar