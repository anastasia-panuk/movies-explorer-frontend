import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <main className="profile">
      <form className="profile__form">
        <h2 className="profile__form-title">Привет, Виталий!</h2>
        <div className="profile__form-container">
          <span className="profile__form-input-span">Имя</span>
          <input
            className="profile__form-input"
            name="name"
            type="text"
            placeholder="Ваше новое имя"
          ></input>
          <span className="profile__form-input-span">E-mail</span>
          <input
            className="profile__form-input"
            name="email"
            type="email"
            placeholder="Ваша новая почта"
          ></input>
        </div>
        <button className="profile__form-submit-button" type="submit">
          Редактировать
        </button>
        <Link to="/signin" className="profile__form-link">
          <p className="profile__form-link">Выйти из аккаунта</p>
        </Link>
      </form>
    </main>
  );
}

export default Profile;
