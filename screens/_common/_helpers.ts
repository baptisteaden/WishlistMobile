import React from 'react';

function fetchApi(route, method = 'GET', body) {
  const params = {
    headers: { 'Content-Type': 'application/json' },
    method,
    body: JSON.stringify(body),
  };
  if (!body) {
    delete params.body;
  }

  return fetch(`http://192.168.1.11:4000${route}`, params)
    .then((res) => res.json())
    .catch((err) => {
      alert(err);
      console.log('arrg:', err);
    });
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
