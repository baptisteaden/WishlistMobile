import React, { useState, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import {
  withTheme,
  Title,
  Paragraph,
  Surface,
  TextInput,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import { post, UserContext } from '../_common/_helpers';
import UrlList from '../_common/UrlList';
import CommentList from './CommentList';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  surface: {
    marginTop: 10,
    marginBottom: 20,
  },
  newComment: {
    flexDirection: 'row',
    backgroundColor: 'rgb(231, 231, 231)',
  },
  input: {
    width: '100%',
    paddingRight: 30,
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
  fetching: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
    opacity: 0.5,
  },
});

const WishConsult: () => React$Node = ({ route, navigation, theme }) => {
  const [comment, setComment] = useState();
  const [fetching, setFetching] = useState(false);
  const { id, name, description, examples, shoppers } = route.params.data;
  const username = useContext(UserContext);

  const handleSendComment = async () => {
    let date = new Date().toISOString().replace('T', ' ');
    date = date.slice(0, date.lastIndexOf(':'));

    const newComment = {
      wish_id: id,
      author: username,
      text: comment,
      date,
    };

    setFetching(true);
    const res = await post(`/comment/${id}`, newComment);
    setFetching(false);

    if (res.status === 'error') {
      return console.log(res.message);
    }
    // Update List params to provoke an item addition
    navigation.setParams({
      update: {
        itemData: {
          id: res.data.comment_id,
          name: username,
          description: `${date}\n\n${comment}`,
        },
      },
    });
    // Empty input
    setComment('');
  };

  let status = "Ce cadeau n'a pas encore été offert";
  if (shoppers.length > 0) {
    // Format 'shopped by' sentence
    status = `${shoppers.join(', ')} participent pour ce cadeau !`;
    const lastCommaIndex = status.lastIndexOf(',');
    status =
      status.slice(0, lastCommaIndex) +
      ' et' +
      status.slice(lastCommaIndex + 1);

    // Change sentence if username shopped this
    const usernameRegex = new RegExp(`(, )?(${username})(, )?`);
    if (usernameRegex.test(status)) {
      status = status
        .replace(usernameRegex, '$1vous$3')
        .replace('participent', 'participez');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Title>{name}</Title>
      <Paragraph>{description}</Paragraph>
      <UrlList urls={examples} />

      <Surface style={styles.surface}>
        <Text>{status}</Text>
        <IconButton icon="cart" />
        <CommentList
          route={route}
          navigation={navigation}
          fetchUrl={`/wish/${id}`}
        />
        <View style={styles.newComment}>
          <TextInput
            placeholder="Ajouter un commentaire"
            value={comment}
            onChangeText={setComment}
            maxLength={100}
            multiline
            theme={{ roundness: 0 }}
            style={styles.input}
          />
          {fetching ? (
            <ActivityIndicator animating style={styles.fetching} />
          ) : (
            <IconButton
              icon="send"
              style={styles.button}
              onPress={handleSendComment}
              disabled={!comment}
              color={theme.colors.primary}
            />
          )}
        </View>
      </Surface>
    </ScrollView>
  );
};

export default withTheme(WishConsult);
