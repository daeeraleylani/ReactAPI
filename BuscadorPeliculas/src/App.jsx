import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Contenedor from './components/contenedor';
import { Card } from './components/card';
import axios from 'axios';
import SearchBar from './components/searchBar';

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` // Usa una variable de entorno segura
      }
    })
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error al obtener los géneros:', error);
      });
  }, []);

  return (
    <Contenedor>
      {
        movies.map(movie => ( 
          <Card
            key={movie.id}
            imagen={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            name={movie.title}
          />
        ))
      }
    </Contenedor>
  );
}

export default App;
