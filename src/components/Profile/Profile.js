import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onProfileSubmit, onLogout, isOk }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isSucsess, setIssucsess] = React.useState(false);
  const [isInputDisabled, setIsInputDisabled] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setIsDisabled(true);
  }, [currentUser]);

  function handleName(e) {
    setName(e.target.value);
    if (name === currentUser.name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    if (e.target.value !== currentUser.email) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsInputDisabled(true);
    setIsDisabled(true);
    const form = evt.target;
    onProfileSubmit({
      name: name,
      email: email,
    });
    setIssucsess(true);
    setIsInputDisabled(false);
    form.reset();
  }

  function handleClick() {
    setIsEdit(true);
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
            disabled={!isEdit || isInputDisabled}
          />
          <span className="profile__form-input-span">E-mail</span>
          <input
            className="profile__form-input"
            name="email"
            placeholder="Ваша новая почта"
            onChange={handleEmail}
            value={email}
            disabled={!isEdit || isInputDisabled}
          />
        </div>

        {!isEdit ? (
          <>
            <button
              onClick={handleClick}
              className={"profile__form-submit-button"}
              type="button"
            >
              Редактировать
            </button>
            <Link
              to="/signin"
              className="profile__form-link"
              onClick={onLogout}
            >
              <p className="profile__form-link">Выйти из аккаунта</p>
            </Link>
          </>
        ) : (
          <button
            className={
              isDisabled
                ? "form__submit-button form__submit-button_type_disabled"
                : "form__submit-button"
            }
            type="submit"
            disabled={isDisabled}
          >
            Сохранить
          </button>
        )}

        {isSucsess ? (
          isOk ? (
            <span className="profile__ok-messege">
              Данные профиля успешно обновлены
            </span>
          ) : (
            <span className="profile__ok-messege_type_error">
              Что-то пошло не так!
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
