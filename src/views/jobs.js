import React, { useState, useEffect } from 'react';
import { createJobs, deleteJob, getJob, getJobs, updateJob } from '../api/api';
import Navbar from '../components/common/navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonCard from '../components/common/skeletonCard';
import JobCard from '../components/job/jobCard';


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobs = async (page, limit) => {
    try {
      const data = await getJobs(page, limit);
      return data;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchJobs(1).then((data) => {
      setJobs(data);
      if (data.length === 0) {
        setHasMore(false);
      }
    });
  }, []);

  const fetchNextPage = () => {
    fetchJobs(currentPage + 1, 10).then((data) => {
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setJobs((prevJobs) => [...prevJobs, ...data]);
        setCurrentPage(currentPage + 1);
      }
    });
  };


  const deleteAction = async (job) => {
    try {
      let response = await deleteJob(job.id);
      setJobs(jobs.filter((job) => job.id !== response.id));
    } catch (error) {
      console.error('Failed to delete job', error);
    }
  }
  return (
    <>
      <Navbar />
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={ 
        <>
          {Array.from(Array(4)).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
          
        </>}
      >
        <main className="flex flex-wrap items-center justify-center bg-background gap-8 py-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} deleteAction={deleteAction}  />
          ))}
        </main>
      </InfiniteScroll>
    </>
  );
};

export default Jobs;

