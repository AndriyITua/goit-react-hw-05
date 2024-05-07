import { useEffect, useState } from "react";
import { searchMovie } from "../../tmdb-api";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";

export default function SearchMoviePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const query = searchParams.get("name");

  const handleSearch = (value) => {
    setSearchParams({ name: value });
    setMovies([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    async function fetchMovie() {
      if (query === null) {
        return;
      }
      try {
        setLoading(true);
        const data = await searchMovie(query, page);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [query, page]);

  return (
    <>
      <section>
        <div>
          Search Page
          <SearchBar onSearch={handleSearch} />
          {movies.length > 0 && <MovieList movies={movies} />}
        </div>
      </section>
    </>
  );
}
