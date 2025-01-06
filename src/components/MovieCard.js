import React, { useEffect } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, isWatchlisted, toggleWatchlist }) {
  useEffect(() => {
    // console.log("Movie--> ", movie);
  }, []); // Empty dependency array ensures this runs only on mount

  const getRatingClass = (rating) => {
    if (rating >= 9 && rating <= 10) return "rating-excellent";

    if (rating >= 8) return "rating-good";

    if (rating >= 5 && rating < 8) return "rating-ok";

    return "rating-bad";
  };

  const navigate = useNavigate();

  const handleGetStartedClick = (movie) => {
    // console.log("Navigating to movie details for:", movie); // Log the clicked movie
    navigate(`/movies/${movie.id}`); // Perform the navigation
  };

  return (
    <div key={movie.id} className="movie-card">
      <img
        src={movie.image ? `/images/${movie.image}` : "/images/default.jpg"}
        alt={movie.title}
        onClick={() => handleGetStartedClick(movie)} // Navigate on click
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={isWatchlisted}
            onChange={() => toggleWatchlist(movie.id)}
          ></input>

          <span className="slider">
            <span className="slider-label">
              {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
