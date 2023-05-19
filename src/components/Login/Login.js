import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import { useFormWithValidation } from "../../hooks/validationHook";

function Login({ onLoginSubmit }) {
  const { values, handleChange, errors, isValid } =
    useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLoginSubmit(values.email, values.password);
  }

  return (
    <main className="login">
      <Form
        name="login"
        submitButton={
          <button
            className={
              !isValid
                ? "form__submit-button form__submit-button_type_disabled"
                : "form__submit-button"
            }
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
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
        onSubmit={handleSubmit}
      >
        {
          <>
            <label htmlFor="login-email" className="form__input-span">
              E-mail
            </label>
            <input
              className="form__input"
              id="login-email"
              name="email"
              type="email"
              value={values.email || ""}
              placeholder="Адрес Вашей электоронной почты"
              onChange={handleChange}
              required
            ></input>
            <span className="form__input_error-text">{errors.email}</span>
            <label htmlFor="login-password" className="form__input-span">
              Пароль
            </label>
            <input
              className="form__input"
              id="login-password"
              name="password"
              type="password"
              value={values.password || ""}
              placeholder="Ваш надежный пароль"
              minLength="8"
              onChange={handleChange}
              required
            ></input>
            <span className="form__input_error-text">{errors.password}</span>
          </>
        }
      </Form>
    </main>
  );
}

export default Login;
