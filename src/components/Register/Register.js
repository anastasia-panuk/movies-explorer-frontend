import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";

function Register() {
  return (
    <main className="register">
      <Form
        name="register"
        submitButton={
          <Link to="/signin">
            <button className="form__submit-button" type="submit">
              Зарегистрироваться
            </button>
          </Link>
        }
        linkBlock={
          <p className="form__text">
            Уже зарегистрированы?
            <Link to="/signin" className="form__link">
              {" "}
              Войти
            </Link>
          </p>
        }
      >
        {
          <>
            <span className="form__input-span">Имя</span>
            <input
              className="form__input"
              name="name"
              type="text"
              placeholder="Как Вас зовут?"
              required
            ></input>
            <span className="form__input-span">E-mail</span>
            <input
              className="form__input"
              name="email"
              type="email"
              placeholder="Адрес Вашей электоронной почты"

            ></input>
            <span className="form__input-span">Пароль</span>
            <input
              className="form__input"
              name="password"
              type="password"
              placeholder="Ваш надежный пароль"
              required
            ></input>
          </>
        }
      </Form>
    </main>
  );
}

export default Register;
