import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import Contenedor from './components/contenedor';
import { Card } from './components/card';
import axios from 'axios';
import SearchBar from './components/searchBar';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  const normalizeText = (text) => 
    text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresResponse, moviesResponse] = await Promise.all([
          axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` },
            params: { language: 'es-ES' }
          }),
          axios.get('https://api.themoviedb.org/3/movie/popular', {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` },
            params: { language: 'es-ES' }
          })
        ]);

        setGenres(genresResponse.data.genres);

        const moviesWithCredits = await Promise.all(
          moviesResponse.data.results.map(async movie => {
            const creditsResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
              {
                headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` }
              }
            );

            const director = creditsResponse.data.crew.find(
              member => member.job === "Director"
            )?.name || "No disponible";

            return {
              ...movie,
              genreNames: movie.genre_ids
                .map(id => genresResponse.data.genres.find(g => g.id === id)?.name)
                .filter(Boolean)
                .join(", ") || "No disponible",
              cast: creditsResponse.data.cast
                .map(actor => actor.name)
                .join(", "),
              director: director 
            };
          })
        );

        setMovies(moviesWithCredits);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    let value = event.target.value.trimStart();
    setSearchTerm(value);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const filteredMovies = useMemo(() => {
    if (!debouncedSearchTerm) return movies;
    
    const normalizedTerm = normalizeText(debouncedSearchTerm);
    
    return movies.filter(movie => {
      const normalizedTitle = normalizeText(movie.title);
      const normalizedGenres = normalizeText(movie.genreNames);
      const normalizedCast = normalizeText(movie.cast);
      const normalizedDirector = normalizeText(movie.director);
      
      return (
        normalizedTitle.includes(normalizedTerm) || 
        normalizedGenres.includes(normalizedTerm) ||
        normalizedCast.includes(normalizedTerm) ||
        normalizedDirector.includes(normalizedTerm) 
      );
    });
  }, [movies, debouncedSearchTerm]);

  const getRandomMovies = (moviesList, count) => {
    const shuffled = [...moviesList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const displayedMovies = searchTerm.length > 0 ? filteredMovies : getRandomMovies(movies, 6);

  return (
    <Contenedor>
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        {isLoading && <div className="loading-spinner"></div>}
      </div>
  
      <div className="movies-container">
        {displayedMovies.length > 0 ? (
          displayedMovies.map((movie) => (
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
                director={movie.director} 
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
    </Contenedor>
  );
}

export default App;