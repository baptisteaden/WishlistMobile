import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from './Home';
import Wishes from './Wishes';
import Friends from './Friends';

const Navigation: React.FC = () => {
  const [navigationState, setNavigationState] = useState({
    index: 0,
    routes: [
      { key: 'Home', title: 'Accueil', icon: 'home' },
      { key: 'Wishes', title: 'Ma liste', icon: 'format-list-bulleted' },
      { key: 'Friends', title: 'Amis', icon: 'account-group' },
    ],
  });

  const renderScene = BottomNavigation.SceneMap({
    Home,
    Wishes,
    Friends,
  });

  const handleIndexChange = (index: number) =>
    setNavigationState({ ...navigationState, index });

  return (
    <BottomNavigation
      navigationState={navigationState}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
    />
  );
};

export default Navigation;
