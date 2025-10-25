import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';  // URL API Laravel

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fungsi untuk panggil API Genre
export const getGenres = () => api.get('/genres');
export const createGenre = (data) => api.post('/genres', data);

// Fungsi untuk panggil API Author
export const getAuthors = () => api.get('/authors');
export const createAuthor = (data) => api.post('/authors', data);

// Fungsi untuk update Genre
export const updateGenre = (id, data) => api.put(`/genres/${id}`, data);

// Fungsi untuk delete Genre
export const deleteGenre = (id) => api.delete(`/genres/${id}`);

// Fungsi untuk update Author
export const updateAuthor = (id, data) => api.put(`/authors/${id}`, data);

// Fungsi untuk delete Author
export const deleteAuthor = (id) => api.delete(`/authors/${id}`);

export default api;