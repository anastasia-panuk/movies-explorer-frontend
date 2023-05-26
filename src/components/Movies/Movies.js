import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import MoviesCardMore from "../MoviesCardMore/MoviesCardMore";
import Preloader from "../Preloader/Preloader";
import {
  MOB_BREAKEPOINT,
  TABLET_BREAKEPOINT,
  DESKTOP_BREAKEPOINT,

  NUMBER_OF_MOB_MOVIES,
  NUMBER_OF_TABLET_MOVIES,
  NUMBER_OF_DESKTOP_MOVIES,

  NUMBER_OF_MORE_MOB_MOVIES,
  NUMBER_OF_MORE_TABLET_MOVIES,
  NUMBER_OF_MORE_DESKTOP_MOVIES,

  NUMBER_OF_MORE_ADD_TO_MOB_MOVIES,
  NUMBER_OF_MORE_ADD_TO_TABLET_MOVIES,
  NUMBER_OF_MORE_ADD_TO_DESKTOP_MOVIES,
} from "../../utils/constants/constants";

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
    if (screenWidth >= DESKTOP_BREAKEPOINT) {
      return NUMBER_OF_DESKTOP_MOVIES;
    } else if (screenWidth >= TABLET_BREAKEPOINT) {
      return NUMBER_OF_TABLET_MOVIES;
    } else if (screenWidth >= MOB_BREAKEPOINT) {
      return NUMBER_OF_MOB_MOVIES;
    }
  });

  const [addMovieToMoviesList, setAddMovieToMoviesList] = React.useState(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= DESKTOP_BREAKEPOINT) {
      return NUMBER_OF_MORE_DESKTOP_MOVIES;
    } else if (screenWidth >= TABLET_BREAKEPOINT) {
      return NUMBER_OF_MORE_TABLET_MOVIES;
    } else if (screenWidth >= MOB_BREAKEPOINT) {
      return NUMBER_OF_MORE_MOB_MOVIES;
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
    if (screenWidth >= DESKTOP_BREAKEPOINT) {
      setMovieInList(NUMBER_OF_DESKTOP_MOVIES);
      setAddMovieToMoviesList(NUMBER_OF_MORE_ADD_TO_DESKTOP_MOVIES);
    } else if (screenWidth >= TABLET_BREAKEPOINT) {
      setMovieInList(NUMBER_OF_TABLET_MOVIES);
      setAddMovieToMoviesList(NUMBER_OF_MORE_ADD_TO_TABLET_MOVIES);
    } else if (screenWidth >= MOB_BREAKEPOINT) {
      setMovieInList(NUMBER_OF_MOB_MOVIES);
      setAddMovieToMoviesList(NUMBER_OF_MORE_ADD_TO_MOB_MOVIES);
    }
  }
  React.useEffect(() => {
    window.addEventListener("resize", changeScreenWidth);
    return () => {
      window.removeEventListener("resize", changeScreenWidth);
    };
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
