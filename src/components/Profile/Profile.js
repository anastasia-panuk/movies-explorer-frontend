import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onProfileSubmit, onLogout }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleName(e) {
    setName(e.target.value);
    setIsNameValid(e.target.checkValidity());
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    setIsEmailValid(e.target.checkValidity());
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    onProfileSubmit({
      name: name,
      email: email,
    });
    form.reset();
  }

  return (
    <main className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h2 className="profile__form-title">Привет, {currentUser.name}!</h2>
        <div className="profile__form-container">
          <span className="profile__form-input-span">Имя</span>
          <input
            className="profile__form-input"
            name="name"
            type="text"
            placeholder="Ваше новое имя"
            onChange={handleName}
            value={name}
            minLength="2"
            maxLength="30"
            required
          />
          <span className="profile__error-text">
            {isNameValid ? "" : "Введите свое имя"}
          </span>
          <span className="profile__form-input-span">E-mail</span>
          <input
            className="profile__form-input"
            name="email"
            type="email"
            placeholder="Ваша новая почта"
            onChange={handleEmail}
            value={email}
            required
          />
          <span className="profile__error-text">
            {isEmailValid ? "" : "Введен некорректный адрес электронной почты"}
          </span>
        </div>
        <button
          className={
            !isNameValid || !isEmailValid
              ? "profile__form-submit-button profile__form-submit-button_type_disabled"
              : "profile__form-submit-button"
          }
          type="submit"
          disabled={!isNameValid || !isEmailValid}
        >
          Редактировать
        </button>
        <Link to="/signin" className="profile__form-link" onClick={onLogout}>
          <p className="profile__form-link">Выйти из аккаунта</p>
        </Link>
      </form>
    </main>
  );
}

export default Profile;
