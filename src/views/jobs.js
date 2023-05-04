import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../actions/jobs';
import Navbar from '../components/common/navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonCard from '../components/common/skeletonCard';
import JobCard from '../components/job/jobCard';
import { useSelector, useDispatch } from 'react-redux';


const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, hasMore } = useSelector((state) => state.jobs);
  const [lastPageFetched, setLastPageFetched] = useState(0);

  useEffect(() => {
    dispatch(fetchJobs({ page: 1, limit: 10 }));
    setLastPageFetched(1);
  }, [dispatch]);

  const fetchNextPage = () => {
    if (!hasMore || jobs.length % 10 !== 0) {
      return;
    }
    const nextPage = lastPageFetched + 1;
    dispatch(fetchJobs({ page: nextPage, limit: 10 }));
    setLastPageFetched(nextPage);
  };

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
          </>
        }
      >
        <main className="flex flex-wrap items-center justify-center bg-background gap-8 py-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job}  />
          ))}
        </main>
      </InfiniteScroll>
    </>
  );
};

export default Jobs;
