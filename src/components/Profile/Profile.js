import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onProfileSubmit, onLogout, isOk }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isSucsess, setIssucsess] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setIsDisabled(true);
  }, [currentUser]);

  function handleName(e) {
    setName(e.target.value);
    setIsNameValid(e.target.checkValidity());
    if (name === currentUser.name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    setIsEmailValid(e.target.checkValidity());
    if (email === currentUser.email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    onProfileSubmit({
      name: name,
      email: email,
    });
    setIssucsess(true);
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
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
            isDisabled
              ? "profile__form-submit-button_type_disabled"
              : "profile__form-submit-button"
          }
          type="submit"
          disabled={isDisabled}
        >
          Редактировать
        </button>
        <Link to="/signin" className="profile__form-link" onClick={onLogout}>
          <p className="profile__form-link">Выйти из аккаунта</p>
        </Link>
        {isSucsess ? (
          isOk ? (
            <span className="profile__ok-messege">
              Данные профиля успешно обновлены
            </span>
          ) : (
            <span className="profile__ok-messege_type_error">
              Что-то пошло не так...
            </span>
          )
        ) : (
          <span className="profile__ok-messege"></span>
        )}
      </form>
    </main>
  );
}

export default Profile;
