import React, { useEffect, useState } from 'react';
import './App.css';
import Contenedor from './components/contenedor';
import { Card } from './components/card';
import axios from 'axios';
import SearchBar from './components/searchBar';
import { useMemo } from 'react';

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
    
    let value = event.target.value.trimStart();

    setSearchTerm(value);
    setIsLoading(true); 

    
    setTimeout(() => {
      setIsLoading(false); 
    }, 500); 
  };

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
        const movieNameMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const genreMatch = movie.genreNames.toLowerCase().includes(searchTerm.toLowerCase());
        return movieNameMatch || genreMatch;
    });
}, [movies, searchTerm]);

  return (
    <Contenedor>
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        {isLoading && <div className="loading-spinner"></div>}
      </div>
  
      {searchTerm.length > 0 && (
        <div className="movies-container">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
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
            ))
          ) : (
            <div className="no-results">
               <img src="/223614-P1B7MY-293.jpg" alt="No se encontraron películas" className="no-results-image"  width="450px"/>
               <p className='no-results-text'>No se encontraron películas.</p>
            </div>
          )}
        </div>
      )}
    </Contenedor>
  );
  
}

export default App;
