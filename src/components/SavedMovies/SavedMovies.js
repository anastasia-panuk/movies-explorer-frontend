import React from "react";

import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
  return (
    <main className="movies movies_type_saved">
      <SearchForm />
      <MoviesCardsList />
    </main>
  );
}

export default SavedMovies;
