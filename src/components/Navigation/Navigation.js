import { Link } from "react-router-dom";
import AccountButton from "../AccountButton/AccountButton";

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
          <Link to="/movies" className="navigation__burger-menu-item">
            Фильмы
          </Link>
        </li>
        <li className="navigation__burger-menu-item-container">
          <Link to="/saved-movies" className="navigation__burger-menu-item">
            Сохраненный фильмы
          </Link>
        </li>
        <li className="navigation__burger-menu-item-container">
          <Link to="/profile" className="navigation__burger-menu-item">
            <AccountButton name="navigation__burger-menu-item_type_account"></AccountButton>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
