import React from "react";

function MoviesCard({ name, img, duration }) {
  const [isLiked, setIsLiked] = React.useState(false);

  const cardLikeButtonClassName = `${
    !isLiked ? "movie-card__like-button" : "movie-card__like-button_type_active"
  }`;

  function heandleLike() {
    !isLiked ? setIsLiked(true) : setIsLiked(false);
  }

  return (
    <>
      <li className="movies-card">
        <img className="movie-card__image" src={img} alt="Постер фильма" />
        <div className="movie-card__container">
          <h2 className="movie-card__name">{name}</h2>
          <button
            className={cardLikeButtonClassName}
            onClick={heandleLike}
            name="movie-card__like-button"
            type="button"
            aria-label="Лайк"
          ></button>
          <span className="movie-card__duration">{duration}</span>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
