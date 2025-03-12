import React, { useEffect, useState } from 'react';
import './assets/estilos/App.css';
import Contenedor from './components/contenedor';
import { Card } from './components/card';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` // Usa una variable de entorno segura
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
      {
        movies.map(movie => (
          <Card
            key={movie.id}
            imagen={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            name={movie.title}
            precio_ant="500"  // Valor de ejemplo, puedes cambiarlo
            precio="200"  
          />
        ))
      }
    </Contenedor>
  );
}

export default App;
