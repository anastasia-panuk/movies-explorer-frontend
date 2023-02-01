import React from "react";
import moviesArray from "../../utils/constants";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardsList() {
  return (
    <ul className="movies-cards-list">
      {moviesArray.map((movie) => (
        <MoviesCard
          name={movie.name}
          img={movie.img}
          duration={movie.duration}
        />
      ))}
    </ul>
  );
}

export default MoviesCardsList;
