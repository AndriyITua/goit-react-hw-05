import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGMzMjgyODNjNTY4YWY0MzhjOWExOTQwZWMwMThlNCIsInN1YiI6IjY2MzIxYjAyYWY0MzI0MDEyYjUzYTQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4xe0ZHrMXNkuRtdaJRS5SABTqhp-dlTX1pt4NLnyhUs",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get("trending/movie/week", options);
  return response.data.results;
}

export async function getDetailsMovie(movieId) {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
}

export async function getMovieCast(movieId) {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data;
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data.results;
}

export async function searchMovie(query, page) {
  const response = await axios.get(
    `search/movie?page=${page}&query=${query}`,
    options
  );
  return response.data.results;
}

export async function getPopularMovies(page) {
  const response = await axios.get(`movie/popular?page=${page}`, options);
  return response.data.results;
}
