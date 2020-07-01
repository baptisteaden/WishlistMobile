import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../_common/_helpers';
import List from '../_common/List';
import WishConsult from './WishConsult';

const Stack = createStackNavigator();

const Friends: () => React$Node = () => {
  const username = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FriendList"
          component={List}
          initialParams={{ fetchUrl: `/friend/${username}` }}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="FriendWishList" component={List} />
        <Stack.Screen name="WishConsult" component={WishConsult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Friends;
