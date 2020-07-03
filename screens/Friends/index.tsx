import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../_common/_helpers';
import FriendList from './FriendList';
import FriendWishList from './FriendWishList';
import WishConsult from './WishConsult';

const Stack = createStackNavigator();

const Friends: () => React$Node = () => {
  const username = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FriendList"
          component={FriendList}
          initialParams={{
            fetchUrl: `/friend/${username}`,
            navTitle: 'Liste de ',
          }}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="FriendWishList" component={FriendWishList} />
        <Stack.Screen
          name="WishConsult"
          component={WishConsult}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Friends;
