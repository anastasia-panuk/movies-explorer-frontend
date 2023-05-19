import React from "react";
import searchIcon from "../../images/search_icon.svg";

function SearchForm({
  onMovieSearchRequest,
  onSavedMovieSearchRequest,
  changeDurationFilter,
  isSaved,
  isChecked,
}) {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [request, setRequest] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  function handleSearch(e) {
    setRequest(e.target.value);
    setIsValid(e.target.checkValidity());
  }

  React.useEffect(() => {
    if (!isSaved) {
      setRequest(localStorage.getItem("searchRequest"));
    } else {
      setRequest(localStorage.getItem("searchSavedRequest"));
    }
  }, [isSaved]);

  function handleMovieSubmit(e) {
    e.preventDefault();
    const form = e.target;
    onMovieSearchRequest(request);
    localStorage.setItem("searchRequest", request);
    form.reset();
  }

  function handleSavedMovieSubmit(e) {
    e.preventDefault();
    const form = e.target;
    onSavedMovieSearchRequest(request);
    localStorage.setItem("searchSavedRequest", request);
    form.reset();
  }

  function handleFocus() {
    if (request.length < 2) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  function handleDurationFilter() {
    changeDurationFilter();
  }

  const breakpoint = 767;

  React.useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const desctopSearchForm = (
    <>
      <input
        className="search-form__input"
        type={"search"}
        placeholder={"Фильм"}
        onChange={handleSearch}
        value={request}
        minLength="2"
        onFocus={handleFocus}
      />
      <span className="search-form__error-text">
        {isValid ? "" : "Введите название фильма"}
      </span>
      <img className="search-form__icon" src={searchIcon} alt="Иконка лупы" />
      <div className="search-form__container">
        <button
          className={`${
            !isValid
              ? "search-form__submit-button search-form__submit-button_type_disabled"
              : "search-form__submit-button"
          }`}
          type="submit"
          disabled={!isValid}
        >
          Найти
        </button>
        <div className="search-form__checkbox-container">
          <input
            id="switch-input"
            type="checkbox"
            className="search-form__switch-input"
            name="switch-input"
            onChange={handleDurationFilter}
            checked={isChecked}
          />
          <label
            htmlFor="switch-input"
            className="search-form__fake-label"
          ></label>
          <label htmlFor="switch-input" className="search-form__label">
            Короткометражки
          </label>
        </div>
      </div>
    </>
  );

  const mobSearchForm = (
    <>
      <div className="search-form__input-container">
        <input
          className="search-form__input search-form__input_type_mob"
          type={"search"}
          placeholder={"Фильм"}
          onChange={handleSearch}
          value={request}
          minLength="2"
          onFocus={handleFocus}
        />
        <span className="search-form__error-text search-form__error-text_type_mob">
          {isValid ? "" : "Введите название фильма"}
        </span>
        <button
          className={`${
            !isValid
              ? "search-form__submit-button search-form__submit-button_type_mob search-form__submit-button_type_disabled"
              : "search-form__submit-button search-form__submit-button_type_mob"
          }`}
        >
          Найти
        </button>
      </div>
      <div className="search-form__checkbox-container">
        <input
          id="switch-input"
          type="checkbox"
          checked={isChecked}
          className="search-form__switch-input"
          name="switch-input"
          onChange={handleDurationFilter}
        />
        <label
          htmlFor="switch-input"
          className="search-form__fake-label"
        ></label>
        <label htmlFor="switch-input" className="search-form__label">
          Короткометражки
        </label>
      </div>
    </>
  );

  return (
    <form
      className="search-form"
      onSubmit={isSaved ? handleSavedMovieSubmit : handleMovieSubmit}
    >
      {screenWidth > breakpoint ? desctopSearchForm : mobSearchForm}
    </form>
  );
}

export default SearchForm;
