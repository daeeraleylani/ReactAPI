import React, { useEffect, useState } from 'react';
import './assets/estilos/App.css';
import Contenedor from './components/contenedor';
import { Card } from './components/card';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Correcto para Vite

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    })
    .then(response => {
      setMovies(response.data.results);
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);

  return (
    <Contenedor>
      {movies.map(movie => (
        <Card
          key={movie.id}
          imagen={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          name={movie.title}
          precio_ant="3099"  
          precio="250"  
        />
      ))}
    </Contenedor>
  );
}

export default App;
