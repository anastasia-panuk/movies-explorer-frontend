import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

import NotFound from "../NotFound/NotFound";

import Register from "../Register/Register";

import { CurrentUserContext } from "../../context/CurrentUserContext";

import {
  register,
  login,
  getUserInfo,
  updateUserData
} from "../../utils/MainApi/MainApi";

import { getMoviesFromServer } from "../../utils/MoviesApi/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = React.useState("");

  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");

  function handleRegisterSubmit(name, email, password) {
    return register(name, email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginSubmit(email, password) {
    return login(email, password)
      .then(({ token }) => {
        if (!token) throw new Error("Нет токена!");
        localStorage.setItem("jwt", token);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (!jwt) return;
    Promise.resolve(getUserInfo(jwt))
      .then((user) => {
        if (user && user.email) {
          setCurrentUser(user);
          navigate("/movies");
        } else {
          console.log(user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleProfileSubmit(data) {
    return updateUserData(data, jwt)
    .then((data) => {
      setCurrentUser({
        name: data.name,
        email: data.email,
      });
    })
    .catch((err) => console.log(err));
  }

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    Promise.resolve(getMoviesFromServer())
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header></Header>

        <Routes>
          <Route exact path={"*"} element={<NotFound />}></Route>

          <Route
            path={"/signup"}
            element={
              <Register onRegisterSubmit={handleRegisterSubmit}></Register>
            }
          ></Route>
          <Route
            path={"/signin"}
            element={<Login onLoginSubmit={handleLoginSubmit}></Login>}
          ></Route>
          <Route path={"/profile"} element={<Profile onProfileSubmit={handleProfileSubmit}></Profile>}></Route>

          <Route exact path={"/"} element={<Main />}></Route>
          <Route
            path={"/movies"}
            element={<Movies movies={movies}></Movies>}
          ></Route>
          <Route path={"/saved-movies"} element={<SavedMovies />}></Route>
        </Routes>

        <Footer></Footer>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
