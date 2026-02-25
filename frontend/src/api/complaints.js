import api from './axios';

export const getComplaints = () => api.get('complaints/');
export const createComplaint = (data) => api.post('complaints/', data);
export const updateComplaintStatus = (id, status) => api.put(`complaints/${id}/`, { status });
export const getComplaintDetail = (id) => api.get(`complaints/${id}/`);
