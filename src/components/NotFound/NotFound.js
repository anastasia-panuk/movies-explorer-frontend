import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__code">404</h2>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <Link onClick={() => navigate(-2)} className="not-found__link">
        Назад
      </Link>
    </main>
  );
}

export default NotFound;
