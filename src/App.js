import React from "react";
import Jobs from "./views/jobs";
import AlertComponent from "./components/common/alert";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/common/navbar";
import { closeModal, openModal } from "./reducers/modal";

const App = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const handleModalOpen = () => dispatch(openModal());
  const handleModalClose = () => dispatch(closeModal());

  return (
    <div className="min-h-screen bg-background mx-auto 2xl:max-w-[1600px]">
      <div className="sticky top-0 z-50 shadow-lg bg-black text-white">
        <Navbar
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          handleModalOpen={handleModalOpen}
        />
      </div>
      <AlertComponent {...alert} />
      <Jobs handleModalOpen={handleModalOpen} />
    </div>
  );
};

export default App;
