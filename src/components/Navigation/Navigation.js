import { Link } from "react-router-dom";
import icon from "../../images/login_icon.svg";

function Navigation() {
  return (
    <div className="navigation">
      <input
        className="navigation__toggle"
        id="navigation__toggle"
        type="checkbox"
      />
      <label className="navigation__button" for="navigation__toggle">
        <span></span>
      </label>
      <ul className="navigation__burger-menu">
        <li className="navigation__burger-menu-item-container">
          <Link to="/" className="navigation__burger-menu-item">
            Главная
          </Link>
        </li>
        <li className="navigation__burger-menu-item-container">
          <Link to="/movies" className="navigation__burger-menu-item" href="#">
            Фильмы
          </Link>
        </li>
        <li className="navigation__burger-menu-item-container">
          <Link
            to="/saved-movies"
            className="navigation__burger-menu-item"
            href="#"
          >
            Сохраненный фильмы
          </Link>
        </li>
        <li className="navigation__burger-menu-item-container">
          <Link
            to="/profile"
            className="navigation__burger-menu-item header__button_type_account"
            href="#"
          >
            Аккаунт
            <div className="header__button-square">
              <img className="header__button-icon" src={icon} alt="Иконка" />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
