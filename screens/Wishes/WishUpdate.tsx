import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { put, post } from '../_common/_helpers';
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
  const { fetchUrl, index, data } = route.params;
  const [name, setName] = useState<string>(data?.name ?? '');
  const [description, setDescription] = useState<string>(
    data?.description ?? '',
  );
  const [examples, setExamples] = useState<string[]>(data?.examples ?? []);
  const [exampleInput, setExampleInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

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

  const handleValidate = async () => {
    if (!name) {
      return setError(true);
    }

    const newWish: NewWish = { name, description, examples };
    let res: JsonResponse | null = null;

    if (data) {
      // Update a wish
      newWish.id = data.id;
      res = await put(`${fetchUrl}/${data.id}`, newWish);
    } else {
      // Add a wish
      res = await post(fetchUrl, newWish);
    }

    if (res.status === 'error') {
      console.log(res.message);
    } else {
      newWish.id = newWish.id ?? res.data.wish_id;
      navigation.navigate('WishList', {
        fetchUrl,
        update: {
          itemIndex: index,
          itemData: newWish,
        },
      });
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
