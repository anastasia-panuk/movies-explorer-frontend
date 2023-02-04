import React from "react";
import { Routes, Route } from "react-router-dom";

const date = new Date();

function getDate() {
  return date.getFullYear();
}

function Footer() {
  const pathname = ["/", "/movies", "/saved-movies"];

  const hiddenFoooterPathname = ["/signup", "/signin", "/profile"];

  return (
    <>
      <Routes>
        {pathname.map((path) => {
          return (
            <Route
              path={path}
              element={
                <footer className="footer">
                  <h2 className="footer__title">
                    Учебный проект Яндекс.Практикум х BeatFilm.
                  </h2>
                  <div className="footer__container">
                    <ul className="footer__links-container">
                      <li className="footer__link-container">
                        <a
                          className="footer__link"
                          href="https://practicum.yandex.ru/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Яндекс.Практикум
                        </a>
                      </li>
                      <li className="footer__link-container">
                        <a
                          className="footer__link"
                          href="https://github.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Github
                        </a>
                      </li>
                    </ul>
                    <p className="footer__date">&#169; {getDate()}</p>
                  </div>
                </footer>
              }
            />
          );
        })}
      </Routes>
      <Routes>
        {hiddenFoooterPathname.map((path) => (
          <Route path={path} element={<></>}></Route>
        ))}
      </Routes>
    </>
  );
}

export default Footer;
