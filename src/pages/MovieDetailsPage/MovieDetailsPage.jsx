import { useState, useEffect, useRef } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { getDetailsMovie } from "../../tmdb-api";

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [releaseData, setReleaseData] = useState("");
  const [rating, setRating] = useState("");
  const [genres, setGenres] = useState([]);

  const location = useLocation();
  const backLink = useRef(location.state);

  useEffect(() => {
    async function clickMovie() {
      try {
        setLoading(true);
        const data = await getDetailsMovie(movieId);
        setMovie(data);
        setRating(Math.round(data.vote_average * 10) / 10);
        setReleaseData(data.release_date.slice(0, 4));
        setGenres(data.genres);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    clickMovie();
  }, [movieId]);

  return (
    <>
      <section>
        {movie && (
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
            }
            alt={movie.title}
            width="400px"
            height="600px"
          />
        )}
        <div>
          <Link to={backLink.current}>Go Back</Link>
          <h2>{movie.title}</h2>
          <ul>
            <li>
              Release: <span>{releaseData}</span>
            </li>
            <li>
              Rating: <span>{rating}</span>
            </li>
            <li>
              Vote: <span>{movie.vote_count}</span>
            </li>
            <li>
              Duration: <span>{movie.runtime} min.</span>
            </li>
          </ul>
          <div>
            <b>Genre:</b>
            <ul>
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <div>
              <b>Overview</b>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h3>Additional information</h3>
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </section>
    </>
  );
}
