import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Navigation from "../Navigation/Navigation";
import AccountButton from "../AccountButton/AccountButton";

import logo from "../../images/logo.svg";

function Header({ isLoggedIn }) {
  const pathname = ["/movies", "/saved-movies", "profile"];

  const fullHeader = (
    <header className="header header_type_logged-in">
      <HashLink to={{ pathname: "/", hash: "about-project" }}>
        <img className="header__logo" src={logo} alt="Логотип" />
      </HashLink>
      <nav className="header__conteiner header__conteiner_type_logged-in">
        <div className="header__button-container">
          <Link to="/movies" className="header__link">
            <button className="header__button header__button_type_logged-in">
              Фильмы
            </button>
          </Link>
          <Link to="/saved-movies" className="header__link">
            <button className="header__button header__button_type_logged-in">
              Сохраненные фильмы
            </button>
          </Link>
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
  const breakpoint = 768;

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
                    <Link to="/movies" className="header__link">
                      <button className="header__button header__button_type_logged-in">
                        Фильмы
                      </button>
                    </Link>
                    <Link to="/saved-movies" className="header__link">
                      <button className="header__button header__button_type_logged-in">
                        Сохраненные фильмы
                      </button>
                    </Link>
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
            element={screenWidth > breakpoint ? fullHeader : reducedHeader}
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
