import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";

function Register({ onRegisterSubmit }) {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = state;
    onRegisterSubmit(name, email, password);
}

  return (
    <main className="register">
      <Form
        name="register"
        submitButton={
            <button className="form__submit-button" type="submit">
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
              minLength="2"
              onChange={handleChange}
            ></input>
            <span className="form__input-span">E-mail</span>
            <input
              className="form__input"
              name="email"
              type="email"
              placeholder="Адрес Вашей электоронной почты"
              onChange={handleChange}
              required
            ></input>
            <span className="form__input-span">Пароль</span>
            <input
              className="form__input"
              name="password"
              type="password"
              placeholder="Ваш надежный пароль"
              minLength="8"
              onChange={handleChange}
              required
            ></input>
          </>
        }
      </Form>
    </main>
  );
}

export default Register;
