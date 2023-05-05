import React, { useState } from "react";
import Modal from "./modal";
import JobForm from "../job/jobForm";

const Navbar = () => {

  let [isJobFormOpen, setJobFormOpen] = useState(false);

  const closeJobFormModal = () => setJobFormOpen(false)
  const openJobFormModal = () => setJobFormOpen(true)

  const flexBetween = "flex items-center justify-between";
  const navbarBackground =  "bg-black drop-shadow text-white"

  return (
    <>
    <nav>
      <div className={` ${navbarBackground} ${flexBetween}  sticky z-30 w-full py-6`}>
        <div className={`${flexBetween } mx-auto w-full md:w-5/6`}>
          <div className={`${flexBetween} w-full gap-32`} >
              <p className={`${flexBetween} md:visible invisible gap-2 text-2xl font-semibold`}>GREAT <p>VIBES</p></p>
          </div>
        </div>
        <button className="bg-white md:visible invisible px-4 py-2 text-black rounded-lg inline-block mr-10"  onClick={openJobFormModal} >Post Job</button>
      </div>
    </nav>
    <div data-dial-init className="visible md:invisible fixed z-10 right-6 bottom-6 group">
        <button type="button" onClick={openJobFormModal} data-dial-toggle="speed-dial-menu-click" data-dial-trigger="click" aria-controls="speed-dial-menu-click" aria-expanded="false" className="flex items-center justify-center text-white bg-button-primary rounded-full w-14 h-14 hover:bg-button-primary dark:bg-button-primary dark:hover:bg-button-primary focus:ring-4 focus:ring-button-primary focus:outline-none dark:focus:ring-button-primary">
            <svg aria-hidden="true" className="w-8 h-8 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </button>
    </div>
    <Modal isOpen = {isJobFormOpen} closeModal = {closeJobFormModal} >
        <JobForm closeModal={closeJobFormModal} />
    </Modal>
    </>
  )
}

export default Navbar