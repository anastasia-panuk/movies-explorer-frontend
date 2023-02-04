import React from "react";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title section-title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__card">
          <p className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__card">
          <p className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline-container">
        <p className="about-project__timeline about-project__timeline_type_backend">
          1 неделя
        </p>
        <p className="about-project__timeline">4 недели</p>
        <p className="about-project__direction-of-development">Back-end</p>
        <p className="about-project__direction-of-development">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
