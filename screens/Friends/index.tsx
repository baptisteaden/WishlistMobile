import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
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
          initialParams={{
            fetchUrl: '/friend/',
            itemFetchUrl: username,
            itemScreen: 'FriendWishList',
            itemPropInUrl: 'name',
            navTitle: 'Liste de ', // Completes param 'title' onClick on a listItem
          }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FriendWishList"
          component={List}
          initialParams={{
            fetchUrl: '/wish/',
            itemFetchUrl: '', // Set by navigate from FriendList
            itemScreen: 'WishConsult',
            itemPropInUrl: 'id',
          }}
        />
        <Stack.Screen
          name="WishConsult"
          component={WishConsult}
          options={({ route, navigation }) => ({
            title: route.params.title,
            headerLeft: () => (
              <HeaderBackButton
                onPress={() =>
                  navigation.navigate('FriendWishList', {
                    update: {
                      itemData: route.params.data,
                      itemIndex: route.params.index,
                    },
                  })
                }
              />
            ),
          })}
          initialParams={{
            fetchUrl: '/comment/',
            itemFetchUrl: '', // Set by navigate from FriendWishList
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Friends;
