import React from "react";

function MoviesCard({ name, img, duration }) {
  const [isLiked, setIsLiked] = React.useState(false);

  const cardLikeButtonClassName = `${
    !isLiked ? "movies-card__like-button" : "movies-card__like-button_type_active"
  }`;

  function heandleLike() {
    !isLiked ? setIsLiked(true) : setIsLiked(false);
  }

  return (
    <>
      <li className="movies-card">
        <img className="movies-card__image" src={img} alt="Постер фильма" />
        <div className="movies-card__container">
          <h2 className="movies-card__name">{name}</h2>
          <button
            className={cardLikeButtonClassName}
            onClick={heandleLike}
            name="movies-card__like-button"
            type="button"
            aria-label="Лайк"
          ></button>
          <span className="movies-card__duration">{duration}</span>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
