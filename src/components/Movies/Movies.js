import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import MoviesCardMore from "../MoviesCardMore/MoviesCardMore";

// import { getMoviesFromServer } from "../../utils/MoviesApi/MoviesApi";

function Movies({movies}) {

  return (
    <ul className="movies">
      <SearchForm />
      <MoviesCardsList movies={movies} />
      <MoviesCardMore />
    </ul>
  );
}

export default Movies;
