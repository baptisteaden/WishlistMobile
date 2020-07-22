import React from 'react';
import { Text } from 'react-native';
import { withTheme, FAB } from 'react-native-paper';
import { storeUser } from '../_common/_helpers';

const Home: () => React$Node = ({ theme }) => {
  const logout = () => storeUser();

  return (
    <>
      <Text>
        That&apos;s gonna be the main feed with news, notifications, things
        friends did, etc
      </Text>
      <FAB style={theme.fab} icon="logout" onPress={logout} />
    </>
  );
};

export default withTheme(Home);
