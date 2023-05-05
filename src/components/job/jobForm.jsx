import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {  useDispatch } from 'react-redux';
import { addJob, updateExistingJob } from "../../actions/jobs";
import {showAlert } from '../../reducers/alert'
const JobForm = ({ closeModal, jobData  }) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: jobData
  });
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const [checkboxError, setCheckboxError] = useState("");
  const [formData, setFormData] = useState({
    quickApply: false,
    externalApply: false,
  });
 
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    if (name === "quickApply" && checked) {
      setFormData((prevState) => ({
        ...prevState,
        externalApply: false,
      }));
    } else if (name === "externalApply" && checked) {
      setFormData((prevState) => ({
        ...prevState,
        quickApply: false,
      }));
    }
  };

  const validateCheckboxes = (quickApply, externalApply) => {
    return quickApply || externalApply;
  };
  const onSubmit =  async ( data) => {
    if (tab === 1) {
      setFormData({ ...formData, ...data });
      setTab(2);
    } else if (tab === 2) {
      try {
        if (jobData) {
          const { quickApply, externalApply } = data;
          const isCheckboxValid = validateCheckboxes(quickApply, externalApply);
          if (!isCheckboxValid) {
            setCheckboxError("Please select at least one option");
            return;
          }else{
            setCheckboxError("")
            dispatch(updateExistingJob({jobData : jobData, formData : {...formData,...data}}))
           dispatch(showAlert('Job updated successfully', 'success'));
          }
        } else {
          
          const { quickApply, externalApply } = data;
            const isCheckboxValid = validateCheckboxes(quickApply, externalApply);
            if (!isCheckboxValid) {
              setCheckboxError("Please select at least one option");
              return;
            }
          else{
            setCheckboxError("")
            dispatch(addJob({...formData,...data}))
            dispatch(showAlert('Job Created successfully', 'success'));
          }
         
        }
      } catch (error) {
        console.error("Failed to delete job", error);
      }
      closeModal();
    }
  };

 
  const renderStepOne = () => {
    let inputStyle = 'text-sm focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9'
    let errorStyle = 'text-error text-xs lg:text-sm'
    return (
      <main>
        <header className="flex items-center justify-between mb-6">
          <p className="text-xl">{jobData ? 'Edit' :'Create a' } job</p>
          <p>Step 1</p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <aside className="mb-6">
              <p className="font-medium mb-1 text-sm">
                Job Title <span className="text-red-600">*</span>
              </p>
              <input
                placeholder="ex.UX UI Designer"
                className={`${inputStyle} ${
                  errors.jobTitle ? {errorStyle} : ""
                }`}
                {...register("jobTitle", { required: true })}
              />
              {errors.jobTitle && (
                <p className={errorStyle}>Job Title is required</p>
              )}
            </aside>
            <aside className="mb-6">
              <p className="font-medium mb-1 text-sm">
                Company Name <span className="text-red-600">*</span>
              </p>
              <input
                placeholder="ex.Google"
                className={`${inputStyle} ${
                  errors.companyName ? {errorStyle} : ""
                }`}
                {...register("companyName", { required: true })}
              />
              {errors.companyName && (
                <p className={errorStyle}>Company Name is required</p>
              )}
            </aside>
            <aside className="mb-6">
              <p className="font-medium mb-1 text-sm">
                Industry <span className="text-red-600">*</span>
              </p>
              <input
                placeholder="ex.Information Technology"
                className={`${inputStyle} ${
                  errors.industry ? {errorStyle} : ""
                }`}
                {...register("industry", { required: true })}
              />
              {errors.industry && (
                <p className={errorStyle}>Industry is required</p>
              )}
            </aside>
            <section className="flex flex-col md:flex-row justify-between mb-6">
              <aside className="mb-6 lg:mb-0" >
                <p className="font-medium mb-1 text-sm">Location</p>
                <input
                  placeholder="ex.Chennai"
                  className={`${inputStyle} md:w-[225px]`}
                  {...register("location")}
                />
              </aside>
              <aside  >
                <p className="font-medium mb-1 text-sm">Remote Type</p>
                <input
                  placeholder="ex.In-Office"
                  className={`${inputStyle} md:w-[225px]`}
                  {...register("remoteType")}
                />
              </aside>
            </section>
          </section>
          <section className="flex justify-end mt-24">
            <button
              className="bg-button-primary text-white px-8 py-2 rounded-md"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Next
            </button>
          </section>
        </form>
      </main>
    );
  };
  const renderStepTwo = () => {
    let inputStyle = 'text-sm  mb-2 focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9'
    let errorStyle = 'text-error text-xs lg:text-sm'
    let checkboxStyle = 'appearance-none rounded-full border-2 border-gray-400 w-4 h-4 checked:bg-blue-400 checked:border-spacing-2 focus:outline-none'

    return (
      <main>
       <header className='flex items-center justify-between mb-6'>
        <p className='text-xl'>Create a job</p>
        <p>Step 2</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
          <p className='font-medium mb-1 text-sm'>Experience</p>
          <section className='flex flex-col md:flex-row justify-between lg:items-center mb-6'>
            <aside>
              <input
                placeholder='Minimum'
                className={`${inputStyle} md:w-[225px] ${errors.minExperience ? 'border-red-500' : 'border-gray-300'}`}
                type='text'
                {...register('minExperience', { value : '',required: true, pattern: /^[0-9]+$/ })}
              />
              {errors.minExperience?.type === 'required' && <p className={errorStyle}>Min exp is required.</p>}
              {errors.minExperience?.type === 'pattern' && <p className={errorStyle}>Min exp should be a number.</p>}
            </aside>
            <aside>
              <input
                placeholder='Maximum'
                className={`${inputStyle} md:w-[225px] ${errors.maxExperience ? 'border-red-500' : 'border-gray-300'}`}
                type='text'
                {...register('maxExperience', { required: true, pattern: /^[0-9]+$/ })}
              />
              {errors.maxExperience?.type === 'required' && <p className={errorStyle}>Max exp is required.</p>}
              {errors.maxExperience?.type === 'pattern' && <p className={errorStyle}>Max exp should be a number.</p>}
            </aside>
          </section>
          <p className='font-medium mb-1 text-sm'>Salary</p>
          <section className='flex flex-col md:flex-row lg:items-center  justify-between mb-6'>
            <aside>
              <input
                placeholder='Minimum'
                className={`${inputStyle} md:w-[225px] ${errors.minSalary ? 'border-red-500' : 'border-gray-300'}`}
                type='text'
                {...register('minSalary', { required: true, pattern: /^[0-9]+$/ })}
              />
              {errors.minSalary?.type === 'required' && <p className={errorStyle}>Min sal is required.</p>}
              {errors.minSalary?.type === 'pattern' && <p className={errorStyle}>Min sal should be a number.</p>}
            </aside>
            <aside>
            <input
              {...register("maxSalary", {
                required: "Maximum is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Maximum should be a number"
                }
              })}
              placeholder='Maximum'
              className={`${inputStyle} md:w-[225px] ${errors.minSalary ? 'border-red-500' : 'border-gray-300'}`}
              type="text"
            />
            {errors.maxSalary && <p className={errorStyle}>{errors.maxSalary.message}</p>}
          </aside>
        </section>
        
        <aside className='mb-6'>
          <p className='font-medium mb-1 text-sm'>Total Employee</p>
          <input
            {...register("totalEmployee", {
              required: "Total Employee is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Total Employee should be a number"
              }
            })}
            placeholder='ex.100'
            className={`${inputStyle} ${errors.minSalary ? 'border-red-500' : 'border-gray-300'}`}
            type="text"
          />
          {errors.totalEmployee && <p className={errorStyle}>{errors.totalEmployee.message}</p>}
        </aside>
        <section className='flex gap-4 mb-2'>
        <aside className='flex gap-1 items-center'>
          <input
            {...register("quickApply",{
            })}
            type='checkbox'
            name="quickApply"
            checked={formData.quickApply}
            onChange={handleCheckboxChange}
            className={checkboxStyle}
          />
          <p className='text-sm text-place-color'>Quick Apply</p>
        </aside>
        <aside className='flex gap-1 items-center'>
          <input
            {...register("externalApply")}
            type='checkbox'
            name="externalApply"
            checked={formData.externalApply}
            onChange={handleCheckboxChange}
            className={checkboxStyle}
          />
          <p className='text-sm text-place-color'>External Apply</p>
        </aside>
      </section>
      {checkboxError && (
        <p className={errorStyle}>{checkboxError}</p>
      )}
        <section className='flex justify-end mt-24'>
          <button type='submit' className="inline-flex justify-center rounded-md border border-transparent bg-button-primary px-4 py-2 text-sm font-medium text-white">Save</button>
          </section>
        </form>
      </main>
    );
  };

  return <>
  {tab === 1 ? renderStepOne() : renderStepTwo()} 
    
  </>;
};

export default JobForm;
