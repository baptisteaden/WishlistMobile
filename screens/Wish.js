import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Linking} from 'react-native';
import {TextInput, Chip, Button, Surface} from 'react-native-paper';
import {
  List,
  ActivityIndicator,
  FAB,
  Appbar,
  HelperText,
} from 'react-native-paper';
import {get, put, post} from './_helpers';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Wish: () => React$Node = ({
  navigation,
  route,
  theme,
  username,
  title,
  onValidate,
}) => {
  // ----- States ----- //
  const data = route.params ? route.params.data : null;
  const [name, setName] = useState(data ? data.name : '');
  const [description, setDescription] = useState(data ? data.description : '');
  const [examples, setExamples] = useState(data ? data.examples : []);
  const [exampleInput, setExampleInput] = useState('');
  const [error, setError] = useState(false);

  // ----- Handlers ----- //
  const handleExampleAdd = () => {
    setExamples([...examples, exampleInput]);
    setExampleInput('');
  };

  const handleExampleRemove = index => () => {
    const newExamples = [...examples];
    newExamples.splice(index, 1);
    setExamples(newExamples);
  };

  const handleValidate = () => {
    if (!name) {
      return setError(true);
    }

    const newWish = {name, description, examples};
    const callback = res => {
      if (res.status === 'error') {
        return console.log(res.message);
      }
      onValidate(newWish, route.params ? route.params.index : null);
      navigation.goBack();
    };

    if (data) {
      // Update a wish
      console.log('lol', data);
      newWish.id = data.id;
      put(`/wish/${username}/${data.id}`, newWish).then(callback);
    } else {
      // Add a wish
      post('/wish/' + username, newWish).then(callback);
    }
  };

  // Set title depending on update or addition
  navigation.setOptions({title});

  return (
    <View style={styles.form}>
      <TextInput
        label="Nom du cadeau"
        value={name}
        onChangeText={setName}
        maxLength={50}
        style={error ? styles.input : {...styles.input, ...styles.marginBottom}}
      />
      {!error ? null : (
        <HelperText type="error" style={styles.marginBottom}>
          Nommez votre cadeau !
        </HelperText>
      )}
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        maxLength={300}
        style={{...styles.input, ...styles.marginBottom}}
      />
      <View style={styles.examples}>
        <TextInput
          label="Exemples"
          value={exampleInput}
          onChangeText={setExampleInput}
          placeholder="https://adresse-cadeau-cool.com"
          maxLength={200}
          style={{
            ...styles.input,
            ...styles.examplesInput,
            ...styles.marginBottom,
          }}
        />
        <Button
          contentStyle={styles.addExample}
          icon="plus"
          onPress={exampleInput ? handleExampleAdd : null}
        />
      </View>
      <View style={styles.chips}>
        {examples.map((ex, i) => (
          <Chip
            key={i}
            icon="launch"
            onPress={() => Linking.openURL(examples[i])}
            onClose={handleExampleRemove(i)}
            textStyle={{...styles.chip, color: theme.colors.primary}}>
            {ex}
          </Chip>
        ))}
      </View>
      <Button onPress={handleValidate}>Valider</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
  input: {
    height: 50,
  },
  marginBottom: {
    marginBottom: 5,
  },
  examples: {
    flexDirection: 'row',
  },
  examplesInput: {
    flexGrow: 1,
    height: 50,
  },
  addExample: {
    height: 50,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    textDecorationLine: 'underline',
  },
});

export default Wish;
