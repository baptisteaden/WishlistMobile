import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  DefaultTheme,
  ActivityIndicator,
  Provider as PaperProvider,
} from 'react-native-paper';
import SignIn from './screens/SignIn';
import Navigation from './screens/Navigation';
import { UserContext, initApp } from './screens/_common/_helpers';
import { Theme } from './screens/_common/_types';

const theme: Theme = {
  ...DefaultTheme,
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 15,
    backgroundColor: DefaultTheme.colors.primary,
  },
  loading: {
    padding: 10,
  },
};

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    initApp(setUsername);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let screenContent: JSX.Element | null = null;
  switch (username) {
    case null:
      screenContent = <ActivityIndicator animating style={theme.loading} />;
      break;
    case '':
      screenContent = <SignIn />;
      break;
    default:
      screenContent = <Navigation />;
  }

  return (
    <UserContext.Provider value={username}>
      <PaperProvider theme={theme}>{screenContent}</PaperProvider>
    </UserContext.Provider>
  );
};

export default App;
