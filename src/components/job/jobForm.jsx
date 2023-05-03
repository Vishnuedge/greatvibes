import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createJobs, updateJob } from "../../api/api";

const JobForm = ({ closeModal, jobData   }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: jobData
  });
  const [tab, setTab] = useState(1);
  const [formData, setFormData] = useState({});
 

  const onSubmit =  async (data) => {
    if (tab === 1) {
      setFormData({ ...formData, ...data });
      setTab(2);
    } else if (tab === 2) {
      setFormData({ ...formData, ...data });
      try {
        if (jobData) {
          await updateJob(jobData.id, formData);
        } else {
          await createJobs(formData);
        }
      } catch (error) {
        console.error(error);
      }
      closeModal();
    }
  };

 
  const renderStepOne = () => {
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
                className={`focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9 ${
                  errors.jobTitle ? "border-red-500" : ""
                }`}
                {...register("jobTitle", { required: true })}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm">Job Title is required</p>
              )}
            </aside>
            <aside className="mb-6">
              <p className="font-medium mb-1 text-sm">
                Company Name <span className="text-red-600">*</span>
              </p>
              <input
                placeholder="ex.Google"
                className={`focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9 ${
                  errors.companyName ? "border-red-500" : ""
                }`}
                {...register("companyName", { required: true })}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">Company Name is required</p>
              )}
            </aside>
            <aside className="mb-6">
              <p className="font-medium mb-1 text-sm">
                Industry <span className="text-red-600">*</span>
              </p>
              <input
                placeholder="ex.Information Technology"
                className={`focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9 ${
                  errors.industry ? "border-red-500" : ""
                }`}
                {...register("industry", { required: true })}
              />
              {errors.industry && (
                <p className="text-red-500 text-sm">Industry is required</p>
              )}
            </aside>
            <section className="flex justify-between">
              <aside className="mb-6">
                <p className="font-medium mb-1 text-sm">Location</p>
                <input
                  placeholder="ex.Chennai"
                  className="focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9"
                  {...register("location")}
                />
              </aside>
              <aside>
                <p className="font-medium mb-1 text-sm">Remote Type</p>
                <input
                  placeholder="ex.In-Office"
                  className="focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9"
                  {...register("remoteType")}
                />
              </aside>
            </section>
          </section>
          <section className="flex justify-end mt-8">
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
    return (
      <main>
       <header className='flex items-center justify-between mb-6'>
        <p className='text-xl'>Create a job</p>
        <p>Step 2</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
          <section className='flex items-center justify-between'>
            <aside className='mb-6'>
              <p className='font-medium mb-1 text-sm'>Experience</p>
              <input
                placeholder='Minimum'
                className={`focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9 ${errors.minExperience ? 'border-red-500' : 'border-gray-300'}`}
                type='text'
                {...register('minExperience', { value : '',required: true, pattern: /^[0-9]+$/ })}
              />
              {errors.minExperience?.type === 'required' && <p className='text-red-500 text-sm'>Minimum experience is required.</p>}
              {errors.minExperience?.type === 'pattern' && <p className='text-red-500 text-sm'>Minimum experience should be a number.</p>}
            </aside>
            <aside>
              <input
                placeholder='Maximum'
                className={`focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9 ${errors.maxExperience ? 'border-red-500' : 'border-gray-300'}`}
                type='text'
                {...register('maxExperience', { required: true, pattern: /^[0-9]+$/ })}
              />
              {errors.maxExperience?.type === 'required' && <p className='text-red-500 text-sm'>Maximum experience is required.</p>}
              {errors.maxExperience?.type === 'pattern' && <p className='text-red-500 text-sm'>Maximum experience should be a number.</p>}
            </aside>
          </section>
          <section className='flex items-center justify-between'>
            <aside className='mb-6'>
              <p className='font-medium mb-1 text-sm'>Salary</p>
              <input
                placeholder='Minimum'
                className={`focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9 ${errors.minSalary ? 'border-red-500' : 'border-gray-300'}`}
                type='text'
                {...register('minSalary', { required: true, pattern: /^[0-9]+$/ })}
              />
              {errors.minSalary?.type === 'required' && <p className='text-red-500 text-sm'>Minimum salary is required.</p>}
              {errors.minSalary?.type === 'pattern' && <p className='text-red-500 text-sm'>Minimum salary should be a number.</p>}
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
              className='focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9'
              type="text"
            />
            {errors.maxSalary && <p className='text-red-500 text-xs'>{errors.maxSalary.message}</p>}
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
            className='focus:outline-none indent-1.5 placeholder:text-place-color placeholder:text-sm border-[1px] w-full rounded-md h-9'
            type="text"
          />
          {errors.totalEmployee && <p className='text-red-500 text-xs'>{errors.totalEmployee.message}</p>}
        </aside>

        <section className='flex gap-4'>
          <aside className='flex gap-1'>
            <input
              {...register("quickApply")}
              type='radio'
            />
            <p className='text-sm text-place-color'>Quick Apply</p>
          </aside>
          <aside className='flex gap-1'>
            <input
              {...register("externalApply")}
              type='radio'
            />
            <p className='text-sm text-place-color'>External Apply</p>
          </aside>
        </section>

        <section className='flex justify-end mt-16'>
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
