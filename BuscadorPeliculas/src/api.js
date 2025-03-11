import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie/popular';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
  }
});

export default api;
