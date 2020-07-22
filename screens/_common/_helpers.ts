import React, { useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

let JWT = '';
let setUsername = null;
// const API_URL = 'http://192.168.1.11:5000';
const API_URL = 'https://wishlist-server8485.herokuapp.com';
// get('/').then((res) => console.log(res));

export async function initApp(onDisconnect) {
  setUsername = onDisconnect;
  try {
    JWT = await AsyncStorage.getItem('jwt');
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

async function fetchAPI(route, method = 'GET', body) {
  let ret = Promise.resolve();
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
    ret = await fetch(API_URL + route, params);

    // Error cases
    if (ret.status !== 200) {
      let message = ret.statusText;
      if (ret.status === 401) {
        // Token absent/invalid/expired => redirect to login page
        await storeUser();
        message = 'Votre session a expirée. 😨\nVeuillez vous reconnecter !';
      }
      throw new Error(message);
    }

    // OK cases
    else {
      ret = await ret.json();
    }
  } catch (err) {
    Alert.alert('Oops', err.message);
    console.warn('[fetchAPI] ', err);
  }

  return ret;
}

export function get(route) {
  return fetchAPI(route, 'GET', null);
}

export function post(route, body) {
  return fetchAPI(route, 'POST', body);
}

export function put(route, body) {
  return fetchAPI(route, 'PUT', body);
}

export function destroy(route, body) {
  return fetchAPI(route, 'DELETE', body);
}

export const UserContext = React.createContext();

export const useUserContext = () => useContext(UserContext);
