import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useUserContext, put, post } from '../_common/_helpers';
import { WishesStackParamList, NewListItem } from '../_common/_types.d';
import { JsonResponse } from '../../server/index.d';
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

interface NewWish extends NewListItem {
  examples: string[];
}

type Props = {
  navigation: StackNavigationProp<WishesStackParamList, 'WishUpdate'>;
  route: RouteProp<WishesStackParamList, 'WishUpdate'>;
};

const WishUpdate: React.FC<Props> = ({ navigation, route }) => {
  // ----- States ----- //
  const { fetchUrl, itemFetchUrl, index, data } = route.params;
  const [name, setName] = useState<string>(data?.name ?? '');
  const [description, setDescription] = useState<string>(
    data?.description ?? '',
  );
  const [examples, setExamples] = useState<string[]>(data?.examples ?? []);
  const [exampleInput, setExampleInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const username = useUserContext();

  // ----- Handlers ----- //

  const handleExampleAdd = () => {
    setExamples([...examples, exampleInput]);
    setExampleInput('');
  };

  const handleExampleRemove = (exIndex: number) => () => {
    const newExamples = [...examples];
    newExamples.splice(exIndex, 1);
    setExamples(newExamples);
  };

  const handleValidate = () => {
    if (!name) {
      return setError(true);
    }

    const newWish: NewWish = { name, description, examples };
    const callback = (res: JsonResponse) => {
      if (res.status === 'error') {
        return console.log(res.message);
      }
      newWish.id = newWish.id || res.data.wish_id;
      navigation.navigate('WishList', {
        fetchUrl,
        itemFetchUrl,
        update: {
          itemIndex: index,
          itemData: newWish,
        },
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
          onPress={exampleInput ? handleExampleAdd : undefined}>
          {/* Typescript wants that comment xd */}
        </Button>
      </View>
      <UrlList urls={examples} onRemove={handleExampleRemove} />
      <Button onPress={handleValidate}>Valider</Button>
    </View>
  );
};

export default WishUpdate;
