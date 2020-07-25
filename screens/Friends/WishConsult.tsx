import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  withTheme,
  Title,
  Paragraph,
  Surface,
  Subheading,
  TextInput,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { FriendsStackParamList, Theme } from '../_common/_types.d';
import { post, useUserContext } from '../_common/_helpers';
import UrlList from '../_common/UrlList';
import List from '../_common/List';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  surface: {
    marginTop: 10,
    marginBottom: 20,
  },
  shopBar: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  shopStatus: {
    width: '80%',
    alignSelf: 'center',
  },
  shopToggle: {},
  newComment: {
    flexDirection: 'row',
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

type Props = {
  navigation: StackNavigationProp<FriendsStackParamList, 'List'>;
  route: RouteProp<FriendsStackParamList, 'List'>;
  theme: Theme;
};

const WishConsult: React.FC<Props> = ({ route, navigation, theme }) => {
  // ---------- States / Contexts / Params ---------- //

  const username = useUserContext();
  const { id, name, description, examples, shoppers } = route.params.data;

  const [comment, setComment] = useState('');
  const [fetching, setFetching] = useState(false);
  const [shopped, setShopped] = useState(shoppers.includes(username));

  // ---------- Handlers ---------- //

  const handleShop = async () => {
    // Shop / unshop
    const newShoppers = [...shoppers];
    if (shopped) {
      newShoppers.splice(newShoppers.indexOf(username), 1);
    } else {
      newShoppers.push(username);
    }

    // Immediate visual changes: cart + shopping status
    setShopped(!shopped);
    navigation.setParams({
      data: { ...route.params.data, shoppers: newShoppers },
    });

    // Then post
    const res = await post(`/wish/${id}/shop`, { shoppers: newShoppers });
    if (res.status === 'error') {
      console.log(res.message);
    }
  };

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
    // Update params for 'List' to provoke an item addition
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

  // ---------- Render ---------- //

  // Format shop status message according to 'shoppers'
  let status = "Ce cadeau n'a pas encore été offert";
  if (shoppers.length > 0) {
    // Verb conjugation...
    let conjug = 'participent';
    if (shopped) {
      conjug = 'participez';
    } else if (shoppers.length === 1) {
      conjug = 'participe';
    }

    status = `${shoppers.join(', ')} ${conjug} pour ce cadeau !`;

    // Replace last comma by 'and'
    if (shoppers.length > 1) {
      const lastCommaIndex = status.lastIndexOf(',');
      status =
        status.slice(0, lastCommaIndex) +
        ' et' +
        status.slice(lastCommaIndex + 1);
    }

    // Change if username is among shoppers
    if (shopped) {
      status = status.replace(
        new RegExp(`(, )?(${username})(, )?`),
        '$1vous$3',
      );
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Title>{name}</Title>
      <Paragraph>{description}</Paragraph>
      <UrlList urls={examples} />

      <Surface style={styles.surface}>
        <View
          style={{
            ...styles.shopBar,
            backgroundColor: `${theme.colors.primary}20`,
          }}>
          <Subheading
            style={{
              ...styles.shopStatus,
              color: shoppers.length > 0 ? 'green' : theme.colors.text,
            }}>
            {status}
          </Subheading>
          <IconButton
            icon={shopped ? 'cart-off' : 'cart'}
            onPress={handleShop}
            color={theme.colors.primary}
            style={styles.shopToggle}
          />
        </View>

        <List
          route={route}
          navigation={navigation}
          itemDescriptionNumberOfLines={5}
          canDelete={(listItem) => listItem.name === username}
          deleteAlertMessage="Supprimer ce commentaire ?"
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
