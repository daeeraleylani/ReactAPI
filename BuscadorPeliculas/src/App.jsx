import React, { useEffect, useState } from 'react';
import './assets/estilos/App.css';
import Contenedor from './components/contenedor';
import { Card } from './components/card';
import axios from 'axios';
import SearchBar from './components/searchBar';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      }
    })
      .then(response => {
        setGenres(response.data.genres); 
      })
      .catch(error => {
        console.error('Error al obtener los géneros:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      }
    })
      .then(response => {
        const moviesWithGenres = response.data.results.map(movie => {
          const genreNames = movie.genre_ids
            .map(id => genres.find(genre => genre.id === id)?.name)
            .join(", ");
          return { ...movie, genreNames: genreNames || "No disponible" };
        });
        setMovies(moviesWithGenres); 
      })
      .catch(error => {
        console.error('Error al obtener las películas:', error);
      });
  }, [genres]); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter(movie => {
    const movieNameMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const genreMatch = movie.genreNames.toLowerCase().includes(searchTerm.toLowerCase());
    return movieNameMatch || genreMatch;
  });

  return (
    <div className="app-container">
      {}
      <header className="app-header">
        <h1 className="seccion_Titulo">Encuentra tus películas favoritas aquí</h1>
        <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      </header>
      <Contenedor>
        {
          filteredMovies.map(movie => (
            <Card
              key={movie.id}
              imagen={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              name={movie.title}
              overview={movie.overview}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
              genreIds={movie.genre_ids}
              allGenres={genres}
            />
          ))
        }
      </Contenedor>
    </div>
  );
}

export default App;
