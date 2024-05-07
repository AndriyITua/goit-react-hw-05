import { useEffect, useState } from "react";
import { getPopularMovies } from "../../tmdb-api";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getPopularMovies(page);
      setMovies(data);
    }

    fetchMovies();
  }, [page]);

  return (
    <>
      <section>
        <h3>Popular movies</h3>
        <MovieList movies={movies} />
      </section>
    </>
  );
}
