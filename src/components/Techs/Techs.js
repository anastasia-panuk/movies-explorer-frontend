import React from "react";

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title section-title section-title_type_techs">
        Технологии
      </h2>
      <div className="techs__container">
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <ul className="techs__icons">
        <li className="techs__icon">HTML</li>
        <li className="techs__icon">CSS</li>
        <li className="techs__icon">JS</li>
        <li className="techs__icon">React</li>
        <li className="techs__icon">Git</li>
        <li className="techs__icon">Express.js</li>
        <li className="techs__icon">MongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
