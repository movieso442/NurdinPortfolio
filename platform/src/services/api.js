import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authApi = {
    apply: (data) => api.post('/auth/apply', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
};

export const applicationApi = {
    getAll: () => api.get('/applications'),
    approve: (id, data) => api.post(`/applications/${id}/approve`, data),
    reject: (id, data) => api.post(`/applications/${id}/reject`, data),
};

export const courseApi = {
    getAll: (params) => api.get('/courses', { params }),
    create: (data) => api.post('/courses', data),
    getById: (id) => api.get(`/courses/${id}`),
    update: (id, data) => api.put(`/courses/${id}`, data),
    delete: (id) => api.delete(`/courses/${id}`),
};

export const institutionApi = {
    getAll: () => api.get('/institutions'),
    create: (data) => api.post('/institutions', data),
    getBySlug: (slug) => api.get(`/institutions/${slug}`),
};

export const certApi = {
    getMy: () => api.get('/certificates/my'),
    issue: (courseId) => api.post('/certificates/issue', { courseId }),
    verify: (code) => api.get(`/certificates/verify/${code}`),
};

export const bookingApi = {
    getAll: () => api.get('/bookings/my'),
    create: (data) => api.post('/bookings', data),
    updateStatus: (id, data) => api.patch(`/bookings/${id}/status`, data),
};

export const labApi = {
    submit: (data) => api.post('/labs/submit', data),
    getSubmissions: (lessonId) => api.get(`/labs/submissions/${lessonId || ''}`),
    review: (id, data) => api.post(`/labs/review/${id}`, data),
};

export { api };
export default api;
