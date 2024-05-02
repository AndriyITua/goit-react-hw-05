import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    async function fetchMovies() {}

    fetchMovies();
  }, []);
  return <div>Home Page</div>;
}
