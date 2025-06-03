import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast from 'react-hot-toast';
import type { Movie, MovieDatabaseResponse } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import { useState } from 'react';
import MovieModal from '../MovieModal/MovieModal';
import { Toaster } from 'react-hot-toast';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const onSuccess = (data: MovieDatabaseResponse) => {
    if (data.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  };

  const onError = () => {
    toast.error('There was an error, please try again...');
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
    onSuccess: onSuccess,
    onError: onError,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleChangePage = ({ selected }: {selected: number}) = {
    setPage(selected + 1);
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
