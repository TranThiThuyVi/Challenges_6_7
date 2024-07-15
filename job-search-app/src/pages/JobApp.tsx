import React, { useState, useEffect } from 'react';
import SearchBar from '../component/SearchBar';
import JobList from '../component/JobList';
import JobDetail from '../component/JobDetail';
import { Job } from '../types/job.typing';
import { getJobs } from '../service/JobService';

const JobApp: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [companyName, setCompanyName] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [city, setCity] = useState('');
  const [defaultCities] = useState(['Washington, DC', 'Madrid, Spain', 'Los Angeles, CA']);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobResults = await getJobs(page, companyName, selectedLevel, city);
        setJobs(jobResults);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      }
    };

    fetchJobs();
  }, [page, companyName, selectedLevel, city]);

  const handleSearch = async (company: string) => {
    setCompanyName(company);
    setPage(1);  
  };

  const handleSelect = (job: Job) => {
    setSelectedJob(job);
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(event.target.value);
    setPage(1);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    setPage(1);
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setPage(1);
  };

  return (
    <div className="mx-auto p-4">
      {selectedJob ? (
        <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <div className="flex flex-col lg:flex-row lg:w-[1100px] ">
            <div className="lg:w-1/4 mr-4">
              <label htmlFor="level" className="block mb-2">Level</label>
              <select
                id="level"
                className="w-full p-2 border border-gray-300 rounded"
                value={selectedLevel}
                onChange={handleLevelChange}
              >
                <option value="">All Levels</option>
                <option value="Internship">Internship</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>

              <label htmlFor="city" className="block mt-4 mb-2">City</label>
              <input
                id="city"
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city"
              />
              {defaultCities.map((defaultCity) => (
                <div key={defaultCity} className="mt-2">
                  <label>
                    <input
                      type="radio"
                      name="defaultCity"
                      value={defaultCity}
                      checked={city === defaultCity}
                      onChange={() => handleCitySelect(defaultCity)}
                      className="mr-2"
                    />
                    {defaultCity}
                  </label>
                </div>
              ))}
            </div>
            <div className="lg:w-3/4">
            {error ? (
                <p className="text-red-500 text-center justify-center">{error}</p>
              ) : (
                <>
                  {jobs.length === 0 ? (
                    <p className="text-red-500 text-center justify-center">No jobs found for "{companyName}".</p>
                  ) : (
                    <JobList
                      jobs={jobs}
                      onJobSelect={handleSelect}
                      companyName={companyName}
                      page={page}
                      setPage={setPage}
                      setError={setError}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobApp;
