import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { UserContext, put, post } from '../_common/_helpers';
import UrlList from '../_common/UrlList';

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
});

type Props = {
  navigation: Navigation;
  route;
  onListItemUpdate;
};

const WishUpdate: () => React$Node = ({ navigation, route }: Props) => {
  // ----- States ----- //

  const initData = route.params
    ? route.params.data
    : { name: '', description: '', examples: [] };
  const [name, setName] = useState(initData.name);
  const [description, setDescription] = useState(initData.description);
  const [examples, setExamples] = useState(initData.examples);
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
        update: {
          itemIndex: route.params ? route.params.index : null,
          itemData: newWish,
        },
      });
    };

    if (initData) {
      // Update a wish
      newWish.id = initData.id;
      put(`/wish/${username}/${initData.id}`, newWish).then(callback);
    } else {
      // Add a wish
      post(`/wish/${username}`, newWish).then(callback);
    }
  };

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
      <UrlList urls={examples} onRemove={handleExampleRemove} />
      <Button onPress={handleValidate}>Valider</Button>
    </View>
  );
};

export default WishUpdate;
