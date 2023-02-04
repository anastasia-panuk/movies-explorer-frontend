import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";

function Login() {
  return (
    <main className="login">
      <Form
        name="login"
        submitButton={
          <Link to="/movies">
            <button className="form__submit-button" type="submit">
              Войти
            </button>
          </Link>
        }
        linkBlock={
          <p className="form__text">
            Еще не зарегистрированы?
            <Link to="/signup" className="form__link">
              {" "}
              Регистрация
            </Link>
          </p>
        }
      >
        {
          <>
            <span className="form__input-span">E-mail</span>
            <input
              className="form__input"
              name="email"
              type="email"
              placeholder="Адрес Вашей электоронной почты"
              required
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

export default Login;
