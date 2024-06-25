import React from 'react';
import { Schedule, Public } from '@mui/icons-material';

const JobList = ({ jobs, onJobSelect }) => {
  const getTimeDifference = (date) => {
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
    <div>
      {jobs.slice(0, 6).map((job, index) => (
        <li 
          key={job.id} 
          className={`p-4 bg-white border cursor-pointer flex rounded-md ${index > 0 ? 'mt-4 rounded-md' : ''}`} 
          onClick={() => onJobSelect(job)}
        >
          <img
            src={job.company.logo_url}
            alt={`${job.company.name} logo`}
            className="w-20 h-20 mr-4"
          />
          <div className="flex-1">
            <div>
              <p className="font-bold text-sm">{job.company.name}</p>
              <p className="text-lg">{job.name}</p>
              <p>{job.levels[0]?.name || 'N/A'}</p>
            </div>
            <div className="flex flex-row justify-end items-end mt-2">
              <div className="pr-4 text-slate-200 flex items-center">
                <Public className='w-6 h-6 mr-2'/>
                {job.locations.map(location => location.name).join(', ')}
              </div>
              <div className='text-slate-200 flex items-center'>
                <Schedule className='w-6 h-6 mr-2'/>
                {getTimeDifference(job.publication_date)}
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default JobList;
