import React, { useEffect, useState } from 'react';
import './App.css';
import Contenedor from './components/contenedor';
import { Card } from './components/card';
import axios from 'axios';
import SearchBar from './components/searchBar';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para la animación de carga

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      params: {
        language: 'es-ES',
      },
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
      },
      params: {
        language: 'es-ES',
      },
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
    const value = event.target.value;
    setSearchTerm(value);
    setIsLoading(true); // Activar la animación de carga

    // Simular un retraso antes de actualizar los resultados
    setTimeout(() => {
      setIsLoading(false); // Desactivar la animación de carga
    }, 500); // Puedes ajustar el tiempo del retraso
  };

  const filteredMovies = movies.filter(movie => {
    const movieNameMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const genreMatch = movie.genreNames.toLowerCase().includes(searchTerm.toLowerCase());
    return movieNameMatch || genreMatch;
  });

  return (
    <Contenedor>
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      </div>
      <div className="movies-container">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card-wrapper">
            <Card
              id={movie.id}
              imagen={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              name={movie.title}
              overview={movie.overview}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
              genreIds={movie.genre_ids}
              allGenres={genres}
            />
          </div>
        ))}
      </div>
    </Contenedor>
  );
}

export default App;
