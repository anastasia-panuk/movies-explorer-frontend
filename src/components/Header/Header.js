import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Navigation from "../Navigation/Navigation";
import AccountButton from "../AccountButton/AccountButton";

import logo from "../../images/logo.svg";

import { TABLET_BREAKEPOINT } from "../../utils/constants/constants";

function Header({ isLoggedIn }) {
  const pathname = ["/movies", "/saved-movies", "/profile"];

  const fullHeader = (
    <header className="header header_type_logged-in">
      <HashLink to={{ pathname: "/", hash: "about-project" }}>
        <img className="header__logo" src={logo} alt="Логотип" />
      </HashLink>
      <nav className="header__conteiner header__conteiner_type_logged-in">
        <div className="header__button-container">
          <NavLink to="/movies" className={({isActive}) => (isActive ? "header__link_type_active" : "header__link")}>

          Фильмы
            {/* <button className="header__button header__button_type_logged-in">
              Фильмы
            </button> */}

          </NavLink>
          <NavLink to="/saved-movies" className={({isActive}) => (isActive ? "header__link_type_active" : "header__link")}>
              Сохраненные фильмы
          </NavLink>
        </div>
        <Link to={"/profile"} className="header__link">
          <AccountButton name={"header__button"}></AccountButton>
        </Link>
      </nav>
    </header>
  );

  const reducedHeader = (
    <header className="header header_type_logged-in">
      <HashLink to={{ pathname: "/", hash: "about-project" }}>
        <img className="header__logo" src={logo} alt="Логотип" />
      </HashLink>
      <Navigation></Navigation>
    </header>
  );

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route
          exact
          path={"/"}
          element={
            <header className="header">
              <HashLink to={{ pathname: "/", hash: "about-project" }}>
                <img className="header__logo" src={logo} alt="Логотип" />
              </HashLink>
              {isLoggedIn ? (
                <nav className="header__conteiner">
                  <Link to="/signup">
                    <button className="header__button">Регистрация</button>
                  </Link>
                  <Link to="/signin">
                    <button className="header__button header__button_type_login">
                      Войти
                    </button>
                  </Link>
                </nav>
              ) : (
                <nav className="header__conteiner header__conteiner_type_logged-in">
                  <div className="header__button-container">
                    <NavLink to="/movies" className={({isActive}) => (isActive ? "header__link_type_active" : "header__link")}>
                        Фильмы
                    </NavLink>
                    <NavLink to="/saved-movies" className={({isActive}) => (isActive ? "header__link_type_active" : "header__link")}>
                        Сохраненные фильмы
                    </NavLink>
                  </div>
                  <Link to={"/profile"} className="header__link">
                    <AccountButton name={"header__button"}></AccountButton>
                  </Link>
                </nav>
              )}
            </header>
          }
        ></Route>
      </Routes>

      <Routes>
        {pathname.map((path) => (
          <Route
            path={path}
            element={screenWidth > TABLET_BREAKEPOINT ? fullHeader : reducedHeader}
          ></Route>
        ))}
      </Routes>

      <Routes>
        <Route
          path="/signup"
          element={
            <header className="header header_type_auth">
              <div className="header__container header__container_type_auth">
                <HashLink to={{ pathname: "/", hash: "about-project" }}>
                  <img className="header__logo" src={logo} alt="Логотип" />
                </HashLink>
                <h2 className="header__welcome-text">{"Добро пожаловать!"}</h2>
              </div>
            </header>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <header className="header header_type_auth">
              <div className="header__container header__container_type_auth">
                <HashLink to={{ pathname: "/", hash: "about-project" }}>
                  <img className="header__logo" src={logo} alt="Логотип" />
                </HashLink>
                <h2 className="header__welcome-text">Рады видеть!</h2>
              </div>
            </header>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default Header;
