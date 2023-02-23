import React from "react";
// import moviesArray from "../../utils/constants";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardsList({ movies }) {

  return (
    <ul className="movies-cards-list">
      {movies.map((movie) => {
        return (
          <MoviesCard
            key={movie.id}
            name={movie.nameRU}
            link={movie.trailerLink}
            img={movie.image.url}
            duration={movie.duration}
          />
        );
      })}
    </ul>
  );
}

export default MoviesCardsList;
