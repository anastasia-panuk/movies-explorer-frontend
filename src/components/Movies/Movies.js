import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import MoviesCardMore from "../MoviesCardMore/MoviesCardMore";

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardsList />
      <MoviesCardMore />
    </main>
  );
}

export default Movies;
