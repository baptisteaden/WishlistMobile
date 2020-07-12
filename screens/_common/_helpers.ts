import React from 'react';

let JWT = '';
const API_URL = 'http://192.168.1.11:5000';
// const API_URL = 'https://wishlist-server8485.herokuapp.com';
// get('/').then((res) => console.log(res));

function fetchApi(route, method = 'GET', body) {
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT}`,
    },
    method,
    body: JSON.stringify(body),
  };
  if (!body) {
    delete params.body;
  }

  return fetch(API_URL + route, params)
    .then((res) => res.json())
    .catch((err) => {
      alert(err);
      console.log('arrg:', err);
    });
}

export function setJWT(jwt) {
  JWT = jwt;
}

export function get(route) {
  return fetchApi(route, 'GET', null);
}

export function post(route, body) {
  return fetchApi(route, 'POST', body);
}

export function put(route, body) {
  return fetchApi(route, 'PUT', body);
}

export function destroy(route, body) {
  return fetchApi(route, 'DELETE', body);
}

export function withProps(component, props) {
  return (otherProps) => component({ ...otherProps, ...props });
}

export const UserContext = React.createContext();
