import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({ onProfileSubmit }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
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
          />
          <span className="profile__form-input-span">E-mail</span>
          <input
            className="profile__form-input"
            name="email"
            type="email"
            placeholder="Ваша новая почта"
            onChange={handleEmail}
            value={email}
          />
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
