import React from "react";

function MoviesCardMore({ addMovieToList, className }) {
  return (
    <section className="movies-card-more">
      <button className={className} type="button" onClick={addMovieToList}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardMore;
