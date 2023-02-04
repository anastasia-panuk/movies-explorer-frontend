import React from "react";
import searchIcon from "../../images/search_icon.svg";

function SearchForm() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
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
      />
      <img className="search-form__icon" src={searchIcon} alt="Иконка лупы" />
      <div className="search-form__container">
        <button className="search-form__submit-button">Найти</button>
        <div className="search-form__checkbox-container">
          <input
            id="switch-input"
            type="checkbox"
            className="search-form__switch-input"
            name="switch-input"
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
          required
        />
        <button className="search-form__submit-button search-form__submit-button_type_mob">
          Найти
        </button>
      </div>
      <div className="search-form__checkbox-container">
        <input
          id="switch-input"
          type="checkbox"
          className="search-form__switch-input"
          name="switch-input"
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
    <form className="search-form">
      {screenWidth > breakpoint ? desctopSearchForm : mobSearchForm}
    </form>
  );
}

export default SearchForm;
