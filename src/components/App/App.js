import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

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
  getSavedMovies,
  updateUserData,
  saveMovie,
  deleteMovie,
} from "../../utils/MainApi/MainApi";
import { getMoviesFromServer } from "../../utils/MoviesApi/MoviesApi";

function App() {
  const [currentUser, setCurrentUser] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isMovieFiltred, setIsMovieFiltred] = React.useState(false);
  const [isSavedMovieFiltred, setIsSavedMovieFiltred] = React.useState(false);

  const [movies, setMovies] = React.useState([]);
  const [filtredMovies, setFiltredMovies] = React.useState([]);
  const [filtredMoviesByDuration, setFiltredMoviesByDuration] = React.useState(
    []
  );

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedFiltredMovies, setSavedFiltredMovies] = React.useState([]);
  const [savedMoviesFiltredByDuration, setSavedMoviesFiltredByDuration] =
    React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [errorMessege, setErrorMessege] = React.useState("");
  const [isServerError, setIsServerError] = React.useState(false);

  const [isOk, setIsOk] = React.useState(false);
  const [isSucsessLogin, setIsSucsessLogin] = React.useState(false);
  const [isSucsessRegister, setIsSucsessRegister] = React.useState(false);
  const pathname = useLocation();
  const navigate = useNavigate();

  const isLocationMovies = pathname.pathname === "/movies";
  const isLocationSavedMovies = pathname.pathname === "/saved-movies";

  const jwt = localStorage.getItem("jwt");

  function changeDurationFilter() {
    isLocationMovies
      ? setIsMovieFiltred(!isMovieFiltred)
      : setIsSavedMovieFiltred(!isSavedMovieFiltred);
  }

  //регистрация, авторизация пользователя
  function handleRegisterSubmit(name, email, password) {
    return register(name, email, password)
      .then(() => {
        handleLoginSubmit(email, password);
      })
      .catch((err) => {
        if (err === 409) {
          setIsSucsessRegister(true);
        }
        console.log(err);
      });
  }

  function handleLoginSubmit(email, password) {
    return login(email, password)
      .then(({ token }) => {
        if (!token) throw new Error("Нет токена!");
        localStorage.setItem("jwt", token);
        setLoggedIn(true);
        navigate(pathname.pathname);
      })
      .catch((err) => {
        if (err === 401) {
          setIsSucsessLogin(true);
        }
        console.log(err);
      });
  }

  //смена данных профиля
  function handleProfileSubmit(data) {
    return updateUserData(data, jwt)
      .then((data) => {
        setCurrentUser({
          name: data.name,
          email: data.email,
        });
        setIsOk(true);
      })
      .catch((err) => {
        setIsOk(false);
        console.log(err);
      });
  }

  //поиск по фильмам
  function handleSearchMovieSubmit(request, array) {
    const movieArray = array.filter((movie) =>
      movie.nameRU.toLowerCase().includes(request.toLowerCase())
    );
    return movieArray;
  }

  function handleSearchSavedMovieSubmit(request, array) {
    const movieArray = array.filter((movie) =>
      movie.nameRU.toLowerCase().includes(request.toLowerCase())
    );
    return movieArray;
  }

  async function searchMovie(request) {
    setIsNotFound(false);
    setIsLoading(true);
    let promise = new Promise((resolve, reject) => {
      setIsNotFound(false);
      setFiltredMovies([]);
      setFiltredMoviesByDuration([]);
      setTimeout(() => resolve(setIsLoading(false)), 1000);
    });
    await promise;
    if (movies.length > 0) {
      const movieArray = handleSearchMovieSubmit(request, movies);
      if (movieArray.length > 0) {
        setIsNotFound(false);
        setIsServerError(true);
        setFiltredMovies(movieArray);
        localStorage.setItem("searchMovieList", JSON.stringify(movieArray));
      } else {
        setIsNotFound(true);
      }
    } else {
      const movieArray = handleSearchMovieSubmit(request, movies);
      if (movieArray.length > 0) {
        setIsNotFound(false);
        setIsServerError(true);
        setFiltredMovies(movieArray);
      } else {
        setIsNotFound(true);
      }
    }
  }

  async function searchSavedMovie(request) {
    setIsNotFound(false);
    setIsLoading(true);
    let promise = new Promise((resolve, reject) => {
      setIsNotFound(false);
      setSavedFiltredMovies([]);
      setSavedMoviesFiltredByDuration([]);
      setTimeout(() => resolve(setIsLoading(false)), 1000);
    });
    await promise;
    if (savedMovies.length > 0) {
      const movieArray = handleSearchSavedMovieSubmit(request, savedMovies);
      if (movieArray.length > 0) {
        if (isSavedMovieFiltred) {
          setSavedMoviesFiltredByDuration(checkMovieDuration(movieArray));
        }
        setIsNotFound(false);
        setIsServerError(true);
        setSavedFiltredMovies(movieArray);
        localStorage.setItem(
          "searchSavedMovieList",
          JSON.stringify(movieArray)
        );
      } else {
        setIsNotFound(true);
      }
    }
  }

  //фильтрация фильмов по длительности
  function checkMovieDuration(array) {
    let shortMovieArray = [];
    array.forEach((movie) => {
      if (movie.duration <= 40) {
        shortMovieArray.push(movie);
      }
    });
    return shortMovieArray;
  }

  function handleSavedMoviesList() {
    changeDurationFilter();
    if (isLocationSavedMovies) {
      if (!isSavedMovieFiltred) {
        localStorage.setItem("isSavedCheckedByDuretion", isSavedMovieFiltred);
        if (movies.length > 0) {
          const movieArray = checkMovieDuration(savedFiltredMovies);
          if (movieArray.length > 0) {
            setIsNotFound(false);
          } else {
            setIsNotFound(true);
          }
          setSavedMoviesFiltredByDuration(movieArray);
          localStorage.setItem(
            "filtredSavedMoviesByDurationList",
            JSON.stringify(movieArray)
          );
        }
      }
    }
  }

  React.useEffect(() => {
    if (!isLocationSavedMovies) {
      setIsSavedMovieFiltred(false);
      setSavedFiltredMovies(savedMovies);
    }
    setIsNotFound(false);
    if (isLocationMovies) {
      if (isMovieFiltred) {
        localStorage.setItem("isCheckedByDuretion", isMovieFiltred);
        if (movies.length > 0) {
          setIsNotFound(false);
          const movieArray = checkMovieDuration(filtredMovies);
          if (movieArray.length > 0) {
            setIsNotFound(false);
          } else {
            setIsNotFound(true);
          }
          localStorage.setItem(
            "filtredMoviesByDuration",
            JSON.stringify(movieArray)
          );
          setFiltredMoviesByDuration(movieArray);
        }
      }
    }
  }, [
    filtredMoviesByDuration,
    isLocationMovies,
    isMovieFiltred,
    movies.length,
    savedMovies,
    isLocationSavedMovies,
    filtredMovies,
  ]);

  //добавление фильмов в сохраненные
  function addMovieToSavedMoviesList(movie) {
    saveMovie(movie, jwt)
      .then((res) => {
        savedMovies.push(res);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        setSavedFiltredMovies(savedMovies);
      })
      .catch((err) => console.log(err));
  }

  //удаление фильмов из сохраненных
  function filterMovies(array, id) {
    return array.filter((movie) => {
      return movie._id !== id;
    });
  }

  function removeMovieFromSavedMoviesList(id) {
    deleteMovie(id, jwt).then(() => {
      const res = filterMovies(savedMovies, id);
      setSavedMovies(res);
      localStorage.setItem("savedMovies", JSON.stringify(res));
      if (isSavedMovieFiltred) {
        setSavedMoviesFiltredByDuration(
          filterMovies(savedMoviesFiltredByDuration, id)
        );
        setSavedFiltredMovies(filterMovies(savedFiltredMovies, id));
      } else {
        setSavedFiltredMovies(filterMovies(savedFiltredMovies, id));
      }
    });
  }

  //получение списков фильмов с сервера
  React.useEffect(() => {
    Promise.resolve(getMoviesFromServer())
      .then((movies) => {
        localStorage.setItem("moviesList", JSON.stringify(movies));
        setMovies(movies);
        if (!isMovieFiltred) {
          localStorage.setItem("isCheckedByDuretion", isMovieFiltred);
          const movieArrayCheckedByDuration = checkMovieDuration(movies);
          if (movieArrayCheckedByDuration.length > 0) {
            setIsNotFound(false);
            setIsServerError(true);
          } else {
            setIsNotFound(true);
          }
          setFiltredMoviesByDuration(movieArrayCheckedByDuration);
        }
      })
      .catch((err) => {
        setErrorMessege(err.messege);
      });
  }, [isMovieFiltred, loggedIn]);

  React.useEffect(() => {
    Promise.resolve(getSavedMovies(jwt))
      .then((movies) => {
        setSavedMovies(movies);
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        setSavedFiltredMovies(movies);
      })
      .catch((err) => {
        setErrorMessege(err.messege);
      });
  }, [jwt, loggedIn]);

  //получение данных о пользователе с сервера
  React.useEffect(() => {
    if (!jwt) return;
    Promise.resolve(getUserInfo(jwt))
      .then((user) => {
        if (user && user.email) {
          setCurrentUser(user);
          setLoggedIn(true);
          navigate(pathname.pathname);
        } else {
          console.log(user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jwt, loggedIn]);

  //данные с локального хранилища
  React.useEffect(() => {
    const moviesList = localStorage.getItem("moviesList");
    if (moviesList) {
      setMovies(JSON.parse(moviesList));
    }

    const searchMovieList = localStorage.getItem("searchMovieList");
    if (searchMovieList) {
      setFiltredMovies(JSON.parse(searchMovieList));
    }

    const searchSavedMovieList = localStorage.getItem("searchSavedMovieList");
    if (searchSavedMovieList) {
      setSavedFiltredMovies(JSON.parse(searchSavedMovieList));
    }

    const isCheckedByDuretion = localStorage.getItem("isCheckedByDuretion");
    if (isCheckedByDuretion) {
      setIsMovieFiltred(JSON.parse(isCheckedByDuretion));
    }

    const isSavedCheckedByDuretion = localStorage.getItem(
      "isSavedCheckedByDuretion"
    );
    if (isSavedCheckedByDuretion) {
      setIsSavedMovieFiltred(JSON.parse(isSavedCheckedByDuretion));
    }

    const filtredMoviesByDuration = localStorage.getItem(
      "filtredMoviesByDurationList"
    );
    if (filtredMoviesByDuration) {
      setFiltredMoviesByDuration(JSON.parse(filtredMoviesByDuration));
    }

    const filtredSavedMoviesByDuration = localStorage.getItem(
      "filtredSavedMoviesByDurationList"
    );
    if (filtredSavedMoviesByDuration) {
      setSavedMoviesFiltredByDuration(JSON.parse(filtredSavedMoviesByDuration));
    }
  }, [loggedIn]);

  //выход из аккаунта
  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("moviesList");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("savedMoviesList");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("savedFilteredMovies");
    localStorage.removeItem("searchSavedMovieList");
    localStorage.removeItem("isCheckedByDirection");
    localStorage.removeItem("isSavedCheckedByDirection");
    localStorage.removeItem("filtredMoviesByDurationList");
    localStorage.removeItem("filtredSavedMoviesByDurationList");
    setIsMovieFiltred(false);
    setIsSavedMovieFiltred(false);
    setMovies([]);
    setSavedMovies([]);
    setFiltredMovies([]);
    setFiltredMoviesByDuration([]);
    setSavedMovies([]);
    setSavedFiltredMovies([]);
    setSavedMoviesFiltredByDuration([]);
    setLoggedIn(false);
    navigate("/signin");
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={!loggedIn}></Header>

        <Routes>
          <Route exact path={"*"} element={<NotFound />}></Route>
          <Route exact path={"/"} element={<Main />}></Route>
          <Route
            path={"/signup"}
            element={
              !loggedIn ? (
                <Register
                  onRegisterSubmit={handleRegisterSubmit}
                  isSucsess={isSucsessRegister}
                ></Register>
              ) : (
                <Navigate to={"/"} />
              )
            }
          ></Route>
          <Route
            path={"/signin"}
            element={
              !loggedIn ? (
                <Login
                  onLoginSubmit={handleLoginSubmit}
                  isSucsess={isSucsessLogin}
                ></Login>
              ) : (
                <Navigate to={"/movies"} />
              )
            }
          ></Route>
          <Route
            path={"/profile"}
            element={
              loggedIn ? (
                <Profile
                  onProfileSubmit={handleProfileSubmit}
                  onLogout={handleLogout}
                  isOk={isOk}
                ></Profile>
              ) : (
                <Navigate to={"/"} />
              )
            }
          ></Route>
          <Route
            path={"/movies"}
            element={
              loggedIn ? (
                <Movies
                  movies={
                    isMovieFiltred ? filtredMoviesByDuration : filtredMovies
                  }
                  isMovieFiltred={isMovieFiltred}
                  onMovieSearchRequest={searchMovie}
                  onSavedMovieSearchRequest={searchSavedMovie}
                  onMovieLike={addMovieToSavedMoviesList}
                  onDeleteMovie={removeMovieFromSavedMoviesList}
                  changeDurationFilter={changeDurationFilter}
                  savedMovies={savedMovies}
                  isLaoding={isLoading}
                  isNotFound={isNotFound}
                  isChecked={isMovieFiltred}
                  error={errorMessege}
                  isServerError={isServerError}
                ></Movies>
              ) : (
                <Navigate to={"/"} />
              )
            }
          ></Route>
          <Route
            path={"/saved-movies"}
            element={
              loggedIn ? (
                <SavedMovies
                  movies={
                    isSavedMovieFiltred
                      ? savedMoviesFiltredByDuration
                      : savedFiltredMovies
                  }
                  isSavedMovieFiltred={isSavedMovieFiltred}
                  onMovieSearchRequest={searchMovie}
                  onSavedMovieSearchRequest={searchSavedMovie}
                  onDeleteMovie={removeMovieFromSavedMoviesList}
                  changeDurationFilter={handleSavedMoviesList}
                  savedMovies={savedMovies}
                  isLaoding={isLoading}
                  isNotFound={isNotFound}
                  isChecked={isSavedMovieFiltred}
                  error={errorMessege}
                  isServerError={isServerError}
                />
              ) : (
                <Navigate to={"/"} />
              )
            }
          ></Route>
        </Routes>

        <Footer></Footer>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
