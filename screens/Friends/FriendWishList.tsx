import React from 'react';
import List from '../_common/List';

export default ({ navigation, route }) => (
  <List
    navigation={navigation}
    route={route}
    itemScreen="WishConsult"
    itemFetchUrl="/comment/"
    itemPropInUrl="id"
  />
);
