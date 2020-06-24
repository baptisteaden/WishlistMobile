import 'react-native-gesture-handler';
import React, {useState} from 'react';
import SignIn from './screens/SignIn';
import Navigation from './screens/Navigation';

const App: () => React$Node = () => {
  const [username, setUsername] = useState('A');

  return username == null ? (
    <SignIn onSignIn={setUsername} />
  ) : (
    <Navigation username={username} />
  );
};

export default App;
