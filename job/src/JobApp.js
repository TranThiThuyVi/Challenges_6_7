import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import Pagination from './components/Paginations'; 

const JobApp = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [city, setCity] = useState('');
  const [defaultCities] = useState(['Washington, DC', 'Madrid, Spain', 'Los Angeles, CA']);
  const [searchError, setSearchError] = useState(false); 

  useEffect(() => {
    fetchJobs(currentPage, searchTerm, selectedLevel, city);
  }, [currentPage, searchTerm, selectedLevel, city]);

  const fetchJobs = async (page = 1, query = '', level = '', location = '') => {
    try {
      let url = `https://www.themuse.com/api/public/jobs?page=${page}`;

      if (query) {
        url += `&company=${encodeURIComponent(query)}`;
      }

      if (level) {
        url += `&level=${encodeURIComponent(level)}`;
      }

      if (location) {
        url += `&location=${encodeURIComponent(location)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.results.length === 0) {
        setSearchError(true); 
      } else {
        setSearchError(false); 
      }

      console.log('Fetched Jobs:', data);
      setJobs(data.results || []);
      setTotalPages(data.page_count || 1);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setSearchError(true);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    setCurrentPage(1);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setCurrentPage(1);
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setCurrentPage(1);
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="mx-auto p-4">
      {selectedJob ? (
        <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <div className="flex w-[1100px]">
            <div className="w-1/4 mr-4">
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
                <div key={defaultCity} className="mt-5">
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
            <div className="w-3/4">
              {searchError && (
                <p className="text-red-500 text-center justify-center">No jobs found.</p>
              )}
              {!searchError && (
                <>
                  <JobList jobs={jobs} onJobSelect={handleJobSelect} />
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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
