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

// export const setToken = (token) => {
//   return requestResult({
//     url: "",
//     headers: { token }
//   })
// }

// class Api {
//   constructor(data) {
//     this._serverUrl = data.serverUrl;
//     this._headers = data.headers;
//   }

//   _requestResult(res) {
//     if (res.ok) {
//       return res.json();
//     } else {
//       return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`);
//     }
//   }

//   getUserInfoFromServer() {
//     return fetch(`${this._serverUrl}/users/me`, {
//       headers: this._headers,
//     }).then((res) => this._requestResult(res));
//   }

//   getCardsFromServer() {
//     return fetch(`${this._serverUrl}/cards`, {
//       headers: this._headers,
//     }).then((res) => this._requestResult(res));
//   }

//   editUserInfo(data) {
//     return fetch(`${this._serverUrl}/users/me`, {
//       method: "PATCH",
//       headers: this._headers,

//       body: JSON.stringify({
//         name: data.name,
//         about: data.about,
//       }),
//     }).then((res) => this._requestResult(res));
//   }

//   editUserAvatar(data) {
//     return fetch(`${this._serverUrl}/users/me/avatar`, {
//       method: "PATCH",
//       headers: this._headers,

//       body: JSON.stringify({
//         avatar: data.avatar,
//       }),
//     }).then((res) => this._requestResult(res));
//   }

//   addNewCard(data) {
//     return fetch(`${this._serverUrl}/cards`, {
//       method: "POST",
//       headers: this._headers,

//       body: JSON.stringify({
//         name: data.name,
//         link: data.link,
//       }),
//     }).then((res) => this._requestResult(res));
//   }

//   changeLikeCardStatus(_id, likeCardStatus) {
//     if (likeCardStatus) {
//       return fetch(`${this._serverUrl}/cards/${_id}/likes`, {
//         method: "PUT",
//         headers: this._headers,
//       }).then((res) => this._requestResult(res));
//     } else {
//       return fetch(`${this._serverUrl}/cards/${_id}/likes`, {
//         method: "DELETE",
//         headers: this._headers,
//       }).then((res) => this._requestResult(res));
//     }
//   }

//   deleteCard(_id) {
//     return fetch(`${this._serverUrl}/cards/${_id}`, {
//       method: "DELETE",
//       headers: this._headers,
//     }).then((res) => this._requestResult(res));
//   }

//   setToken(token) {
//     this._headers.authorization = token;
//   }
// }

// const api = new Api({
//   serverUrl: "https://api.panuk.students.nomoredomains.club",
//   headers: {
//     authorization: "",
//     "Content-Type": "application/json",
//   },
// });

// export default api;

// const serverUrl = "https://api.panuk.students.nomoredomains.club";

// export const requestResult = ({
//   url,
//   method = 'POST',
//   token,
//   data
// }) => {
//   return fetch(`${serverUrl}${url}`, {
//     method,
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       ...!!token && { 'Authorization': `Bearer ${token}` }
//     },
//     ...!!data && { body: JSON.stringify(data) }
//   })
//   .then((res) => {
//     if (!res.ok) return Promise.reject(res.status);

//     return res.json();
//   });
// }

// export const userAutentification = (password, email) => {
//   return requestResult({
//     url: "/signup",
//     data: { password, email },
//   });
// };

// export const userAuthorization = (password, email) => {
//   return requestResult({
//     url: "/signin",
//     data: { password, email },
//   });
// };
