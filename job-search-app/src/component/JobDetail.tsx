import React from 'react';
import { Job } from '../types/job.typing';
import { Schedule, Public } from '@mui/icons-material';

interface JobDetailProps {
  job: Job;
  onBack: () => void; 
}

const JobDetail: React.FC<JobDetailProps> = ({job, onBack}) => {
  const getTimeDifference = (date: string): string => {
    const now = new Date();
    const jobDate = new Date(date);
    const differenceInSeconds = Math.floor((now.getTime() - jobDate.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;

    if (differenceInSeconds < secondsInMinute) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < secondsInHour) {
      const minutes = Math.floor(differenceInSeconds / secondsInMinute);
      return `${minutes} minutes ago`;
    } else if (differenceInSeconds < secondsInDay) {
      const hours = Math.floor(differenceInSeconds / secondsInHour);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(differenceInSeconds / secondsInDay);
      return `${days} days ago`;
    }
  };

  return (
    <div className="mx-auto p-4 flex flex-col lg:flex-row">
      <div className="flex flex-col lg:w-1/4 ">
        <button onClick={onBack} className="flex items-center text-blue-500">
          <svg className="w-5 h-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 14.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L7.414 7H18a1 1 0 0 1 0 2H7.414l5.293 5.293z" clipRule="evenodd" />
          </svg>
          Back to search
        </button>
        <p className='mt-5 text-slate-500'>HOW TO APPLY</p>
        <p className='mt-5'>Please click on the link below to apply</p>
        <a href={job.refs && job.refs.landing_page} className="text-blue-500 mt-5">Apply Here</a>
      </div>
      <div className="mt-4 lg:w-3/4 lg:ml-4">
        <h2 className="text-2xl font-bold">{job.name}</h2>
        <div className='text-slate-400 flex items-center text-sm'>
          <Schedule className='w-4 h-4 mr-2'/>
          {getTimeDifference(job.publication_date!)}
        </div>
        <p className="mb-4 mt-4 text-xl">{job.company && job.company.name}</p>
        <div className="pr-4 text-slate-400 flex items-center">
          <Public className='w-6 h-6 mr-2'/>
          {job.locations?.map(location => location.name).join(', ') || 'NA'}
        </div>
        <div className="mt-10" dangerouslySetInnerHTML={{ __html: job.contents || '' }} />
      </div>
    </div>
  );
};

export default JobDetail;
