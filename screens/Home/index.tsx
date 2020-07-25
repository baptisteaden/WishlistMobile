import React from 'react';
import { Text } from 'react-native';
import { withTheme, FAB } from 'react-native-paper';
import { storeUser } from '../_common/_helpers';
import { PaperRoute, Theme } from '../_common/_types.d';

interface Props extends PaperRoute {
  theme: Theme;
}

const Home: React.FC<Props> = ({ theme }) => {
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
