import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardsList({
  movies,
  onMovieLike,
  isSaved,
  onDeleteMovie,
  savedMovies,
  isNotFound,
  error,
  isServerError,
}) {
  return (
    <>
      {isNotFound ? (
        isServerError ? (
          <span className="preloader__error-text">{error}</span>
        ) : (
          <span className="preloader__error-text">Ничего не найдено</span>
        )
      ) : (
        <ul className="movies-cards-list">
          {movies.map((movie) => {
            return (
              <MoviesCard
                key={isSaved ? movie._id : movie.id}
                movieId={isSaved ? movie._id : movie.id}
                name={movie.nameRU}
                link={movie.trailerLink}
                img={movie.image}
                duration={`${Math.trunc(movie.duration / 60)}ч ${
                  movie.duration % 60
                }м`}
                onMovieLike={onMovieLike}
                onDeleteMovie={onDeleteMovie}
                movie={movie}
                isSaved={isSaved}
                savedMovies={savedMovies}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

export default MoviesCardsList;
