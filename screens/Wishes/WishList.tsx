import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WishesStackParamList } from '../_common/_types.d';
import List from '../_common/List';

// type Props = {
//   navigation: StackNavigationProp<WishesStackParamList, ListScreen.WishList>;
//   route: RouteProp<WishesStackParamList, ListScreen.WishList>;
// };

type Props = {
  navigation: StackNavigationProp<WishesStackParamList, 'List'>;
  route: RouteProp<WishesStackParamList, 'List'>;
};

export default ({ navigation, route }: Props) => (
  <List
    navigation={navigation}
    route={route}
    canDelete
    deleteAlertMessage="Supprimer '$(itemName)' de votre liste ?"
  />
);
