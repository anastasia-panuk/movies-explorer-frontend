import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import { useFormWithValidation } from "../../hooks/validationHook";

function Register({ onRegisterSubmit }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterSubmit(values.name, values.email, values.password);
  }

  return (
    <main className="register">
      <Form
        name="register"
        submitButton={
          <button
            className={!isValid
              ? "form__submit-button form__submit-button_type_disabled"
              : "form__submit-button"}
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
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
        onSubmit={handleSubmit}
        isValid={isValid}
      >
        {
          <>
            <label htmlFor="register-name" className="form__input-span">
              Имя
            </label>
            <input
              className="form__input"
              id="register-name"
              name="name"
              value={values.name || ""}
              type="text"
              placeholder="Как Вас зовут?"
              required
              minLength="2"
              maxLength="30"
              onChange={handleChange}
            ></input>
            <span className="form__input_error-text">{errors.name}</span>
            <label htmlFor="register-email" className="form__input-span">
              E-mail
            </label>
            <input
              className="form__input"
              id="register-email"
              name="email"
              value={values.email || ""}
              type="email"
              placeholder="Адрес Вашей электоронной почты"
              onChange={handleChange}
              required
            ></input>
            <span className="form__input_error-text">{errors.email}</span>
            <label htmlFor="register-password" className="form__input-span">
              Пароль
            </label>
            <input
              className="form__input"
              id="register-password"
              name="password"
              type="password"
              placeholder="Ваш надежный пароль"
              minLength="8"
              value={values.password || ""}
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

export default Register;
