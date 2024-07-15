import axios from 'axios';
import { Job } from '../types/job.typing';

const API_BASE_URL = 'https://www.themuse.com/api/public';

export const getJobs = async (page: number, company?: string, level?: string, location?: string) => {
  const params: { [key: string]: any } = { page };

  if (company) {
    params.company = company;
  }
  if (level) {
    params.level = level;
  }
  if (location) {
    params.location = location;
  }

  const response = await axios.get<{ results: Job[] }>(`${API_BASE_URL}/jobs`, { params });
  return response.data.results;
};

export const getJobDetail = async (id: string) => {
  const response = await axios.get<Job>(`${API_BASE_URL}/jobs/${id}`);
  return response.data;
};
