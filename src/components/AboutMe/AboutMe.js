import React from "react";

import portrait from "../../images/auth_photo.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title section-title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__discription">
          <p className="about-me__subtitle">Анастасия</p>
          <p className="about-me__paragpaph-subtitle">
            Начинающий фронтенд разработчик, 30 лет
          </p>
          <p className="about-me__paragpaph">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
        </div>
        <img
          className="about-me__photo"
          src={portrait}
          alt="Фото автора страницы"
        />
      </div>
      <a
        className="about-me__link"
        href="https://github.com/anastasia-panuk"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </section>
  );
}

export default AboutMe;
