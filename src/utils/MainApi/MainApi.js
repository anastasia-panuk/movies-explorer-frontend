const serverURL = "https://api.panuk.movie-explorer.nomoredomains.club";

const requestResult = ({ url, method, token, data }) => {
  return fetch(`${serverURL}${url}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (!res.ok) return Promise.reject(res.status);

    return res.json();
  });
};

export const register = (name, email, password) => {
  return requestResult({
    url: "/signup",
    method: "POST",
    data: { name, email, password },
  });
};

export const login = (email, password) => {
  return requestResult({
    url: "/signin",
    method: "POST",
    data: { email, password },
  });
};

export const getUserInfo = (token) => {
  return requestResult({
    url: "/users/me",
    method: "GET",
    token: token,
  });
};

export const updateUserData = (data, token) => {
  return requestResult({
    url: "/users/me",
    method: "PATCH",
    token: token,
    data: data,
  });
};

export const saveMovie = (movie, token) => {
  return requestResult({
    url: "/movies",
    method: "POST",
    token: token,
    data: {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    },
  });
};

export const getSavedMovies = (token) => {
  return requestResult({
    url: `/movies`,
    method: "GET",
    token: token,
  });
};

export const deleteMovie = (id, token) => {
  return requestResult({
    url: `/movies/${id}`,
    method: "DELETE",
    token: token,
  });
};
