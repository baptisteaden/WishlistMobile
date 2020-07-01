import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import SignIn from './screens/SignIn';
import Navigation from './screens/Navigation';
import { UserContext } from './screens/_common/_helpers';

const App: () => React$Node = () => {
  const [username, setUsername] = useState('A');

  return (
    <UserContext.Provider value={username}>
      <PaperProvider>
        {username == null ? <SignIn onSignIn={setUsername} /> : <Navigation />}
      </PaperProvider>
    </UserContext.Provider>
  );
};

export default App;
