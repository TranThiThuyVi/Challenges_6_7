import React, { useState, useEffect, useCallback } from 'react';
import { Job } from '../types/job.typing';
import LogoDefault from '../assets/images/404.jpg';
import { Schedule, Public } from '@mui/icons-material';

interface JobListProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  companyName: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobSelect, companyName, page, setPage, setError }) => {
  const [pageNumberInput, setPageNumberInput] = useState<string>('');

  useEffect(() => {
    setPageNumberInput(page.toString());
  }, [page]);

  const handlePageNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumberInput(event.target.value);
  };

  const handlePageNumberKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const newPage = parseInt(pageNumberInput, 10);
        if (!isNaN(newPage) && newPage >= 1) {
          setPage(newPage);
        } else {
          setError('Invalid page number. Please enter a valid page number.');
        }
      }
    },
    [pageNumberInput, setPage, setError]
  );

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
    <div className="mt-2">
      <div className="flex items-center justify-end mb-4">
        <input
          type="number"
          className="p-2 border rounded-lg mr-2 w-16 text-center"
          placeholder=""
          value={pageNumberInput}
          onChange={handlePageNumberChange}
          onKeyPress={handlePageNumberKeyPress}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => {
            const newPage = parseInt(pageNumberInput, 10);
            if (!isNaN(newPage) && newPage >= 1) {
              setPage(newPage);
            } else {
              setError('Invalid page number. Please enter a valid page number.');
            }
          }}
        >
          Go
        </button>
      </div>
      <div className="pagination mt-4 flex justify-end space-x-4 mb-2">
        <button
          className="p-2 bg-gray-200 rounded"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          &laquo; Previous
        </button>
        <span className="p-2">Page {page}</span>
        <button className="p-2 bg-gray-200 rounded" onClick={() => setPage((prevPage) => prevPage + 1)}>
          Next &raquo;
        </button>
      </div>
      <ul>
        {jobs.slice(0,6).map((job, index) => (
          <li
            key={job.id}
            className={`p-4 bg-white border cursor-pointer flex flex-col rounded-md ${
              index > 0 ? 'mt-4' : ''
            }`}
            onClick={() => onJobSelect(job)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={job.company?.logo_url || LogoDefault}
                alt={`${job.company?.name} logo`}
                className="w-20 h-20 mr-4"
              />
              <div className="flex-1">
                <div>
                  <p className="font-bold text-sm">{job.company?.name}</p>
                  <p className="text-lg">{job.name}</p>
                  <p>{job.levels?.map((level) => level.name).join(', ') || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center mt-2 text-gray-500 space-x-4 self-end">
              <div className="flex items-center">
                <Public className="w-6 h-6 mr-2" />
                {job.locations?.map((location) => location.name).join(', ') || 'NA'}
              </div>
              <div className="flex items-center">
                <Schedule className="w-6 h-6 mr-2" />
                {getTimeDifference(job.publication_date!)}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination mt-4 flex justify-end space-x-4">
        <button
          className="p-2 bg-gray-200 rounded"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          &laquo; Previous
        </button>
        <span className="p-2">Page {page}</span>
        <button className="p-2 bg-gray-200 rounded" onClick={() => setPage((prevPage) => prevPage + 1)}>
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default JobList;
