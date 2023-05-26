import { HashLink } from "react-router-hash-link";

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links">
        <li className="nav-tab__link">
          <HashLink to="#about-project" className="nav-tab__link">
            О проекте
          </HashLink>
        </li>
        <li className="nav-tab__link">
          <HashLink to="#techs" className="nav-tab__link">
            Технологии
          </HashLink>
        </li>
        <li className="nav-tab__link">
          <HashLink to="#about-me" className="nav-tab__link">
            Студент
          </HashLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
