import React, { useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import { JsonResponse } from './_types.d';

const API_URL = 'https://wishlist-server8485.herokuapp.com';
// const API_URL = 'http://192.168.1.11:5000';
let JWT: string = '';
let setUsername = (username: string) => {
  console.warn(`
    Unable to set username '${username}': the app has not been initialized
  `);
};

export async function initApp(onDisconnect: (username: string) => void) {
  setUsername = onDisconnect;
  try {
    JWT = (await AsyncStorage.getItem('jwt')) ?? '';
    const username = await AsyncStorage.getItem('username');
    setUsername(username ?? '');
  } catch (e) {
    console.warn('Error while trying to get stored user data', e);
  }
}

export async function storeUser(username = '', jwt = '') {
  try {
    JWT = jwt;
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('jwt', jwt);
    setUsername(username);
  } catch (e) {
    console.warn('Error while trying to store user data', e);
  }
}

async function fetchAPI(
  route: string,
  method: string = 'GET',
  body: object | null,
): Promise<JsonResponse> {
  let ret: Promise<JsonResponse> = Promise.resolve({
    status: 'error',
    message: "Problème lors d'une communication serveur",
  });

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

  try {
    console.log(`
      [fetchAPI] Sending request:
      route: ${route}
      params: ${JSON.stringify(params)}
    `);
    const jsonRes = await fetch(API_URL + route, params);

    // Error cases
    if (jsonRes.status !== 200 && route !== '/user') {
      let message = jsonRes.statusText;
      console.log('meeec', jsonRes, route);
      if (jsonRes.status === 401) {
        // Token absent/invalid/expired => redirect to login page
        await storeUser();
        message = 'Votre session a expirée. 😨\nVeuillez vous reconnecter !';
      }
      throw new Error(message);
    }

    // OK cases
    else {
      ret = await jsonRes.json();
    }
  } catch (err) {
    Alert.alert('Oops', err.message);
    console.warn('[fetchAPI] ', err);
  }

  return ret;
}

export function get(route: string) {
  return fetchAPI(route, 'GET', null);
}

export function post(route: string, body: object) {
  return fetchAPI(route, 'POST', body);
}

export function put(route: string, body: object) {
  return fetchAPI(route, 'PUT', body);
}

export function destroy(route: string) {
  return fetchAPI(route, 'DELETE', null);
}

export const UserContext = React.createContext('');

export const useUserContext = () => useContext(UserContext);
