import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperRoute, WishesStackParamList } from '../_common/_types.d';
import { useUserContext } from '../_common/_helpers';
import WishList from './WishList';
import WishUpdate from './WishUpdate';

const Stack = createStackNavigator<WishesStackParamList>();

const Wishes: React.FC<PaperRoute> = () => {
  const username = useUserContext();

  // In WishAdd and WishUpdate, only used to pass data back to WishList, because
  // typescript doesn't care about the 'initialParams' shallow merge, apparently.
  const initialParams = {
    fetchUrl: '/wish/',
    itemFetchUrl: username,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WishList"
          component={WishList}
          initialParams={{
            ...initialParams,
            itemScreen: 'WishUpdate',
            addItemScreen: 'WishAdd',
          }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WishAdd"
          component={WishUpdate}
          options={{ title: 'Ajouter un cadeau' }}
          initialParams={initialParams}
        />
        <Stack.Screen
          name="WishUpdate"
          component={WishUpdate}
          options={{ title: 'Modifier un cadeau' }}
          initialParams={initialParams}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Wishes;
