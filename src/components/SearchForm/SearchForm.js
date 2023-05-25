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
  const [isDisabled, setIsDisabled] = React.useState(true);

  function handleSearch(e) {
    setRequest(e.target.value);
    if (e.target.value.length === 0) {
      setIsDisabled(false);
      setIsValid(false);
    } else {
      setIsDisabled(true);
      setIsValid(true);
    }
  }

  React.useEffect(() => {
    if (!isSaved) {
      setRequest(localStorage.getItem("searchRequest"));
    }
  }, [isSaved]);

  function handleMovieSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (request === null || request.length === 0) {
      setIsDisabled(false);
      setIsValid(false);
    } else {
      setIsDisabled(true);
      setIsValid(true);
      onMovieSearchRequest(request);
    }
    localStorage.setItem("searchRequest", request);
    form.reset();
  }

  function handleSavedMovieSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (request === null || request.length === 0) {
      setIsDisabled(false);
      setIsValid(false);
    } else {
      setIsDisabled(true);
      setIsValid(true);
      onSavedMovieSearchRequest(request);
    }
    form.reset();
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
      />
      <span className="search-form__error-text">
        {isValid ? "" : "Введите название фильма"}
      </span>
      <img className="search-form__icon" src={searchIcon} alt="Иконка лупы" />
      <div className="search-form__container">
        <button
          className="search-form__submit-button"
          type="submit"
          disabled={!isDisabled}
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
        />
        <span className="search-form__error-text search-form__error-text_type_mob">
          {isValid ? "" : "Введите название фильма"}
        </span>
        <button
          className="search-form__submit-button search-form__submit-button_type_mob"
          type="submit"
          disabled={!isDisabled}
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
