import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  registerStudent: (data) => api.post('/auth/register/student', data),
  loginStudent: (data) => api.post('/auth/login/student', data),
  registerOfficer: (data) => api.post('/auth/register/officer', data),
  loginOfficer: (data) => api.post('/auth/login/officer', data),
};

export const complaintAPI = {
  fileComplaint: (data) => api.post('/complaints', data),
  getComplaints: () => api.get('/complaints'),
  getComplaintByID: (referenceID) => api.get(`/complaints/${referenceID}`),
  updateComplaint: (id, data) => api.put(`/complaints/${id}`, data),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getAllComplaints: () => api.get('/dashboard/complaints/all'),
};

export const adminAPI = {
  getOfficers: () => api.get('/admin/officers'),
  assignComplaint: (data) => api.post('/admin/assign-complaint', data),
};

export default api;
