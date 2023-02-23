import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";

function Login({ onLoginSubmit }) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    })
  }

    function handleSubmit(evt) {
      evt.preventDefault();
      const { email, password } = state;
      onLoginSubmit(email, password);
    }

  return (
    <main className="login">
      <Form
        name="login"
        submitButton={
            <button className="form__submit-button" type="submit">
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

export default Login;
