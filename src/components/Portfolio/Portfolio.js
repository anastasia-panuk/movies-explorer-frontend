import React from "react";
import portfolioLink from "../../images/portfolio_link.svg";

function Profile() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__container">
        <li className="portfolio__link-container">
          <p className="portfolio__link-name">Статичный сайт</p>
          <a
            href="https://github.com/anastasia-panuk/how-to-learn"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="portfolio__link-icon"
              src={portfolioLink}
              alt="Стрелка"
            />
          </a>
        </li>
        <li className="portfolio__link-container">
          <p className="portfolio__link-name">Адаптивный сайт</p>
          <a
            href="https://github.com/anastasia-panuk/russian-travel"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="portfolio__link-icon"
              src={portfolioLink}
              alt="Стрелка"
            />
          </a>
        </li>
        <li className="portfolio__link-container">
          <p className="portfolio__link-name">Одностраничное приложение</p>
          <a
            href="https://github.com/anastasia-panuk/react-mesto-api-full"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="portfolio__link-icon"
              src={portfolioLink}
              alt="Стрелка"
            />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Profile;
