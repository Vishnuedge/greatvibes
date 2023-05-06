import React, { useCallback, useState } from "react";
import { getJob } from "../../api/api";
import Modal from "../common/modal";
import JobForm from "./jobForm";
import { useDispatch } from "react-redux";
import { deleteExistingJob } from "../../actions/jobs";
import { showAlert } from "../../reducers/alert";
import { jobPostedFailed, jobPostedSuccess } from "../../constants/error";

const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isJobFormOpen, setJobformOpen] = useState(false);

  const triggerDeleteModal = () => openDeleteModal();

  const triggerEditModal = async (jobId) => {
    try {
      const response = await getJob(jobId);
      setJobData(response);
    } catch (error) {
      return error;
    }
    openJobFormModal();    
  };

  const closeDeleteModal = useCallback(() => setIsOpen(false), []);
  const openDeleteModal = useCallback(() => setIsOpen(true), []);
  const openJobFormModal = useCallback(() => setJobformOpen(true), []);
  const closeJobFormModal = useCallback(() => setJobformOpen(false), []);




  const deleteAction = async (job) => {
    try {
      const response = await dispatch(deleteExistingJob(job.id));
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(showAlert(jobPostedSuccess.message, jobPostedSuccess.alert));
        closeDeleteModal();
      }
    } catch (error) {
      dispatch(showAlert(jobPostedFailed.message, jobPostedFailed.alert));
    }
  };


  return (
    <>
      <main>
        <section className="relative capitalize rounded-lg bg-white  md:w-[630px] h-auto border-background px-6 py-4 ">
          <button
            type="button"
            className="absolute top-4 right-4"
            onClick={() => triggerEditModal(job.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-4 h-4 transform transition-transform duration-500 hover:rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button
            className="absolute top-4 right-11"
            type="button"
            onClick={triggerDeleteModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 transition duration-500 transform hover:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <div className="flex gap-3" >
          <aside className="flex self-start">
            <img
              src="https://cdn.vox-cdn.com/thumbor/sW5h16et1R3au8ZLVjkcAbcXNi8=/0x0:3151x2048/2000x1333/filters:focal(1575x1024:1576x1025)/cdn.vox-cdn.com/uploads/chorus_asset/file/15844974/netflixlogo.0.0.1466448626.png"
              alt="Company Logo"
              className="w-12 h-12 rounded-md"
            />
            <Modal isOpen={isOpen} closeModal={closeDeleteModal}>
              <div>
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Delete Job
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete this job?
                  </p>
                </div>

                <div class="mt-4 gap-4 flex">
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={() => deleteAction(job)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
            <Modal isOpen={isJobFormOpen} closeModal={openJobFormModal}>
              <JobForm jobData= {jobData} closeModal={closeJobFormModal}  />
            </Modal>
          </aside>
          <aside className="font-light ">
            <article className="mb-5 text-dark lg:text-sm 2xl:text-base">
              <p className="text-xl 2xl:text-2xl">{job.jobTitle}</p>
              <p>
                {job.companyName} - {job.industry}
              </p>
              <p className="text-light">{job.location} ({job.remoteType})</p>
            </article>
          </aside>
          </div>
          <div className="md:flex md:gap-3" >
            <div className="w-0 md:w-12 md:visible invisible">
            </div>
            <article className="mb-5 lg:text-sm 2xl:text-base text-dark">
              <p className="mb-2">{job.remoteType} (9.00 am - 5.00 pm IST) </p>
              <p className="mb-2">
                
                Experience ({job.minExperience} - {job.maxExperience} years)
              </p>
              <p className="mb-2">
                INR (₹) {job.minSalary} - {job.maxSalary} / Month
              </p>
              <p>{job.totalEmployee} employees</p>
              <article >
              {job.option === 'quickApply' ? (
                <button className="py-2 mt-6 px-4 text-sm border-[1px] border-button-primary bg-button-primary rounded-md text-white inline-block hover:bg-opacity-40">
                  Apply Now
                </button>
              ) : (
                <button className="py-2 mt-6 px-4 text-sm border-[1px] border-button-primary rounded-md text-button-primary inline-block hover:text-opacity-80">
                  External Apply
                </button>
              )}
            </article>
            </article>
           
          </div>
        </section>
      </main>
    </>
  );
};

export default JobCard;
