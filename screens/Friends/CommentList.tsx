import React, { useContext } from 'react';
import { UserContext } from '../_common/_helpers';
import List from '../_common/List';

export default ({ route, navigation }) => {
  const username = useContext(UserContext);
  return (
    <List
      route={route}
      navigation={navigation}
      itemDescriptionNumberOfLines={5}
      canDelete={(listItem) => listItem.name === username}
      deleteAlertMessage="Supprimer ce commentaire ?"
    />
  );
};
