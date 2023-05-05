import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../actions/jobs';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonCard from '../components/common/skeletonCard';
import JobCard from '../components/job/jobCard';
import { useSelector, useDispatch } from 'react-redux';

const Jobs = ({handleModalOpen}) => {
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
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={
          <>
              <SkeletonCard  />
          </>
        }
      >
        <main className="flex flex-wrap items-center justify-center bg-background gap-8 py-8 px-4 sm:px-8 ">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job}  />
          ))}
        </main>
      </InfiniteScroll>

      <div data-dial-init className="visible md:invisible group fixed bottom-0 right-0 mb-4 mr-4">
  <button
    type="button"
    onClick={handleModalOpen}
    data-dial-toggle="speed-dial-menu-click"
    data-dial-trigger="click"
    aria-controls="speed-dial-menu-click"
    aria-expanded="false"
    className="flex items-center justify-center text-white bg-button-primary rounded-full w-14 h-14 hover:bg-button-primary dark:bg-button-primary dark:hover:bg-button-primary focus:ring-4 focus:ring-button-primary focus:outline-none dark:focus:ring-button-primary"
  >
    <svg aria-hidden="true" className="w-8 h-8 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
  </button>
</div>

    </>
  );
};

export default Jobs;
