import React from 'react';
import List from '../_common/List';

export default ({ navigation, route }) => (
  <List
    navigation={navigation}
    route={route}
    itemScreen="WishUpdate"
    addItemScreen="WishAdd"
    showAddButton
    canDelete
    deleteAlertMessage="Supprimer '$(itemName)' de votre liste ?"
  />
);
