import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { post, storeUser } from './_common/_helpers';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleConnect = async () => {
    setError('');
    const res = await post('/user', { username, password });

    if (res.status === 'error') {
      setError(res.message!);
    } else {
      storeUser(username, res.data.jwt);
    }
  };

  return (
    <SafeAreaView>
      <Title style={styles.title}>Wishlist mobile</Title>
      <TextInput
        label="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button disabled={!username || !password} onPress={handleConnect}>
        Se connecter
      </Button>
      {!error ? null : <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
};

export default SignIn;
