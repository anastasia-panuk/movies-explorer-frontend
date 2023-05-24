import React from "react";

function MoviesCard({
  movie,
  name,
  duration,
  link,
  onMovieLike,
  isSaved,
  onDeleteMovie,
  savedMovies,
}) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const actualSavedMovies = savedMovies.find((i) => i.nameRU === movie.nameRU);

  const cardLikeButtonClassName = `${
    !isLiked
      ? "movies-card__like-button"
      : "movies-card__like-button_type_active"
  }`;

  function heandleLike() {
    if (!isLiked) {
      onMovieLike(movie);
      setIsLiked(true);
    } else {
      const searchMovie = savedMovies.find((i) => i.movieId === movie.id);
      onDeleteMovie(searchMovie._id);
      setIsLiked(false);
    }
  }

  function deleteMovie() {
    onDeleteMovie(movie._id);
  }

  function handleMouseOver() {
    setIsHovering(true);
  }

  function handleTouchStart() {
    setIsHovering(true);
  }

  function handleMouseOut() {
    setIsHovering(false);
  }

  React.useEffect(() => {
    if (actualSavedMovies) {
      setIsLiked(true);
    }
  }, [actualSavedMovies]);

  return (
    <>
      <li className="movies-card" id={isSaved ? movie._id : movie.id}>
        <a href={link} target="_blank" rel="noreferrer">
          <img
            className="movies-card__image"
            src={
              isSaved
                ? movie.image
                : `https://api.nomoreparties.co${movie.image.url}`
            }
            alt={`${name}`}
          />
        </a>
        <div
          className="movies-card__container"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onTouchStart={handleTouchStart}
        >
          <h2 className="movies-card__name">{`${name}`}</h2>
          {isSaved ? (
            <button
              className={
                isHovering
                  ? "movies-card__delete-button_type_active"
                  : "movies-card__delete-button"
              }
              onClick={deleteMovie}
              name="movies-card__like-button"
              type="button"
              aria-label="Лайк"
            ></button>
          ) : (
            <button
              className={cardLikeButtonClassName}
              onClick={heandleLike}
              name="movies-card__like-button"
              type="button"
              aria-label="Лайк"
            ></button>
          )}

          <span className="movies-card__duration">{`${duration}`}</span>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
