import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, Text } from 'react-native';
import { withTheme, List, ActivityIndicator, FAB } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { get, destroy, withProps } from '../_common/_helpers';

const styles = StyleSheet.create({
  p: {
    textAlign: 'center',
  },
  a: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 15,
  },
});

const FriendList: () => React$Node = ({
  navigation,
  theme,
  listData,
  onWishDelete,
}) => {
  const deleteAlert = (index) => () => {
    Alert.alert('Supprimer un cadeau', `Supprimer ${listData[index].name} ?`, [
      { text: 'Annuler' },
      { text: 'OK', onPress: onWishDelete(index) },
    ]);
  };

  let listComponent = null;

  if (listData == null) {
    listComponent = <ActivityIndicator animating />;
  } else if (listData.length === 0) {
    listComponent = (
      <Text style={styles.p}>
        Votre liste d&apos;amis est vide pour le moment
      </Text>
    );
  } else {
    listComponent = listData.map((friend, index) => (
      <List.Item
        key={friend.id}
        title={friend.name}
        description={friend.description}
        onLongPress={deleteAlert(index)}
        onPress={() => {
          navigation.navigate('WishList', {
            index,
            data: listData[index],
          });
        }}
      />
    ));
  }

  return (
    <>
      <ScrollView>{listComponent}</ScrollView>
      <FAB
        style={{ ...styles.fab, backgroundColor: theme.colors.primary }}
        icon="plus"
        onPress={() => {
          navigation.navigate('WishAdd');
        }}
      />
    </>
  );
};

export default withTheme(FriendList);
