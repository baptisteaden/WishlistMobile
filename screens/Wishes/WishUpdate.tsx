import React, { useState, useContext } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import {
  withTheme,
  TextInput,
  Chip,
  Button,
  HelperText,
} from 'react-native-paper';
import { UserContext, put, post } from '../_common/_helpers';

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

type Props = {
  navigation: Navigation;
  route;
  theme;
  onListItemUpdate;
};

const WishUpdate: () => React$Node = ({ navigation, route, theme }: Props) => {
  // ----- States ----- //

  const { data, index, title } = route.params;
  const [name, setName] = useState(data ? data.name : '');
  const [description, setDescription] = useState(data ? data.description : '');
  const [examples, setExamples] = useState(data ? data.examples : []);
  const [exampleInput, setExampleInput] = useState('');
  const [error, setError] = useState(false);

  const username = useContext(UserContext);

  // ----- Handlers ----- //

  const handleExampleAdd = () => {
    setExamples([...examples, exampleInput]);
    setExampleInput('');
  };

  const handleExampleRemove = (exIndex) => () => {
    const newExamples = [...examples];
    newExamples.splice(exIndex, 1);
    setExamples(newExamples);
  };

  const handleValidate = () => {
    if (!name) {
      return setError(true);
    }

    const newWish = { name, description, examples };
    const callback = (res) => {
      if (res.status === 'error') {
        return console.log(res.message);
      }
      newWish.id = newWish.id || res.data.wish_id;
      navigation.navigate('WishList', {
        update: { itemIndex: index, itemData: newWish },
      });
    };

    if (data) {
      // Update a wish
      newWish.id = data.id;
      put(`/wish/${username}/${data.id}`, newWish).then(callback);
    } else {
      // Add a wish
      post(`/wish/${username}`, newWish).then(callback);
    }
  };

  // Set title depending on update or addition
  navigation.setOptions({ title });

  return (
    <View style={styles.form}>
      <TextInput
        label="Nom du cadeau"
        value={name}
        onChangeText={setName}
        maxLength={50}
        style={
          error ? styles.input : { ...styles.input, ...styles.marginBottom }
        }
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
        multiline
        maxLength={300}
        style={{ ...styles.input, ...styles.marginBottom }}
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
            key={ex + i}
            icon="launch"
            onPress={() => Linking.openURL(examples[i])}
            onClose={handleExampleRemove(i)}
            textStyle={{ ...styles.chip, color: theme.colors.primary }}>
            {ex}
          </Chip>
        ))}
      </View>
      <Button onPress={handleValidate}>Valider</Button>
    </View>
  );
};

export default withTheme(WishUpdate);
