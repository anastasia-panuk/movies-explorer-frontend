import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import MoviesCardMore from "../MoviesCardMore/MoviesCardMore";

function Movies() {
  return (
    <ul className="movies">
      <SearchForm />
      <MoviesCardsList />
      <MoviesCardMore />
    </ul>
  );
}

export default Movies;
