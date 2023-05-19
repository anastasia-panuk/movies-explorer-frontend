import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import MoviesCardMore from "../MoviesCardMore/MoviesCardMore";
import Preloader from "../Preloader/Preloader";

function Movies({
  movies,
  onMovieSearchRequest,
  onSavedMovieSearchRequest,
  onMovieLike,
  onDeleteMovie,
  changeDurationFilter,
  savedMovies,
  isLaoding,
  isChecked,
  isNotFound,
  error,
  isServerError,
}) {
  const [movieInList, setMovieInList] = React.useState(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 12;
    } else if (screenWidth >= 768) {
      return 8;
    } else if (screenWidth >= 456) {
      return 5;
    }
  });

  const [addMovieToMoviesList, setAddMovieToMoviesList] = React.useState(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 3;
    } else if (screenWidth >= 768) {
      return 2;
    } else if (screenWidth >= 456) {
      return 1;
    }
  });

  const moviesVisibleList = movies.slice(0, movieInList);

  const moviesCardMoreButtonClassName = `${
    moviesVisibleList.length === movies.length
      ? "movies-card-more_type_hidden"
      : "movies-card-more__button"
  }`;

  function changeScreenWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setMovieInList(12);
      setAddMovieToMoviesList(4);
    } else if (screenWidth >= 768) {
      setMovieInList(8);
      setAddMovieToMoviesList(3);
    } else if (screenWidth >= 456) {
      setMovieInList(5);
      setAddMovieToMoviesList(2);
    }
  }
  React.useEffect(() => {
    window.addEventListener("resize", changeScreenWidth);
  }, []);

  function addMovieToList() {
    setMovieInList((i) => i + addMovieToMoviesList);
  }

  return (
    <ul className="movies">
      <SearchForm
        onMovieSearchRequest={onMovieSearchRequest}
        onSavedMovieSearchRequest={onSavedMovieSearchRequest}
        isSaved={false}
        changeDurationFilter={changeDurationFilter}
        isChecked={isChecked}
      />
      <Preloader isLaoding={isLaoding} />
      <MoviesCardsList
        movies={moviesVisibleList}
        onMovieLike={onMovieLike}
        onDeleteMovie={onDeleteMovie}
        isSaved={false}
        savedMovies={savedMovies}
        isNotFound={isNotFound}
        error={error}
        isServerError={isServerError}
      />
      <MoviesCardMore
        className={moviesCardMoreButtonClassName}
        addMovieToList={addMovieToList}
      />
    </ul>
  );
}

export default Movies;
