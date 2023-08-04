import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  createTask(task) {
    return apiClient.post('/task', task);
  },
  getTasks() {
    return apiClient.get('/tasks');
  },
  getTask(id) {
    return apiClient.get('/task/' + id);
  },
  updateTask(id, task) {
    return apiClient.put('/task/' + id, task);
  },
  deleteTask(id) {
    return apiClient.delete('/task/' + id);
  }
};