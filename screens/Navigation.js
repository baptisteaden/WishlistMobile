import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import {Appbar, BottomNavigation} from 'react-native-paper';
import Home from './Home';
import MyWishlist from './MyWishlist';
import Friends from './Friends';

const Navigation: () => React$Node = ({username}) => {
  const [navigationState, setNavigationState] = useState({
    index: 0,
    routes: [
      {key: 'Home', title: 'Accueil', icon: 'home'},
      {key: 'MyWishlist', title: 'Ma liste', icon: 'format-list-bulleted'},
      {key: 'Friends', title: 'Amis', icon: 'account-group'},
    ],
  });

  const _renderScene = BottomNavigation.SceneMap({
    Home,
    MyWishlist: () => <MyWishlist username={username} />,
    Friends,
  });

  const _handleIndexChange = index =>
    setNavigationState({...navigationState, index});

  return (
    <BottomNavigation
      navigationState={navigationState}
      onIndexChange={_handleIndexChange}
      renderScene={_renderScene}
    />
  );
};

export default Navigation;
