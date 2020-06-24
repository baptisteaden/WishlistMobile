import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import {post} from './_helpers';

const SignIn: () => React$Node = ({onSignIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  return (
    <SafeAreaView>
      <Title style={{textAlign: 'center'}}>Wishlist mobile</Title>
      <TextInput
        label="Nom d'utilisateur"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        label="Mot de passe"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button
        disabled={!username || !password}
        onPress={() => {
          setError();
          post('/user', {username, password}).then(res => {
            if (res.status === 'error') {
              setError(res.message);
            } else {
              onSignIn(res.data.username);
            }
          });
        }}>
        Se connecter
      </Button>
      {!error ? null : <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    color: 'red',
  },
});

export default SignIn;
