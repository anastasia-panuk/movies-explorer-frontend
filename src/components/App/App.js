import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

import NotFound from "../NotFound/NotFound";

import Register from "../Register/Register";

function App() {
  return (
    <div className="app">
      <Header></Header>

      <Routes>
        <Route exact path={"*"} element={<NotFound />}></Route>

        <Route path={"/signup"} element={<Register />}></Route>
        <Route path={"/signin"} element={<Login />}></Route>
        <Route path={"/profile"} element={<Profile />}></Route>

        <Route exact path={"/"} element={<Main />}></Route>
        <Route path={"/movies"} element={<Movies />}></Route>
        <Route path={"/saved-movies"} element={<SavedMovies />}></Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
