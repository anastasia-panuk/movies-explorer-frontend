const serverURL = "https://api.nomoreparties.co/beatfilm-movies";

const requestResult = ({ method, token, data }) => {
  return fetch(`${serverURL}`, {
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

export const getMoviesFromServer = () => {
  return requestResult({
    method: "GET",
  });
};
