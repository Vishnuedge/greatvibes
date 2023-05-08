import axios from "axios";

const API_BASE_URL = "https://64515c80a32219691161cd90.mockapi.io/api/gv";

export const getJobs = async (page, limit = 10) => {
  const response = await axios.get(
    `${API_BASE_URL}/jobs?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getJob = async (jobId) => {
  const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`);
  return response.data;
};

export const createJobs = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/jobs/`, formData);
  return response.data;
};

export const updateJob = async (jobId, formData) => {
  const response = await axios.put(`${API_BASE_URL}/jobs/${jobId}/`, formData);
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await axios.delete(`${API_BASE_URL}/jobs/${jobId}/`);
  return response.data;
};
