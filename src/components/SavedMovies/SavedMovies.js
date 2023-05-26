import React from "react";

import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  movies,
  onMovieSearchRequest,
  onSavedMovieSearchRequest,
  onDeleteMovie,
  changeDurationFilter,
  savedMovies,
  isLaoding,
  isChecked,
  isNotFound,
  error,
  isServerError,
}) {
  return (
    <ul className="movies movies_type_saved">
      <SearchForm
        onMovieSearchRequest={onMovieSearchRequest}
        onSavedMovieSearchRequest={onSavedMovieSearchRequest}
        isSaved={true}
        changeDurationFilter={changeDurationFilter}
        isChecked={isChecked}
      />
      <Preloader isLaoding={isLaoding} />
      <MoviesCardsList
        movies={movies}
        isSaved={true}
        onDeleteMovie={onDeleteMovie}
        savedMovies={savedMovies}
        isNotFound={isNotFound}
        error={error}
        isServerError={isServerError}
      />
    </ul>
  );
}

export default SavedMovies;
