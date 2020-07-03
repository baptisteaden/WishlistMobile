import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../_common/_helpers';
import WishList from './WishList';
import WishUpdate from './WishUpdate';

const Stack = createStackNavigator();

const Wishes: () => React$Node = () => {
  const username = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WishList"
          component={WishList}
          initialParams={{
            fetchUrl: '/wish/',
            itemFetchUrl: username,
            itemScreen: 'WishUpdate',
            addItemScreen: 'WishAdd',
          }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WishAdd"
          component={WishUpdate}
          options={{ title: 'Ajouter un cadeau' }}
        />
        <Stack.Screen
          name="WishUpdate"
          component={WishUpdate}
          options={{ title: 'Modifier un cadeau' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Wishes;
