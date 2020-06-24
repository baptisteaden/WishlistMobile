import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Alert, Text} from 'react-native';
import {
  withTheme,
  List,
  ActivityIndicator,
  FAB,
  Appbar,
} from 'react-native-paper';
import {get, destroy, withProps} from './_helpers';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Wish from './Wish';

const Stack = createStackNavigator();

const MyWishlist: () => React$Node = ({theme, username}) => {
  const [listData, setListData] = useState(null);

  useEffect(() => {
    get('/wish/' + username).then(res => {
      setListData(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWishAdd = wish => {
    setListData([...listData, wish]);
  };

  const handleWishUpdate = (wish, index) => {
    const newListData = [...listData];
    newListData[index] = wish;
    setListData(newListData);
  };

  const handleWishDelete = index => () => {
    console.log('pafsff');
    destroy(`/wish/${username}/${listData[index].id}`).then(res => {
      if (res.status === 'error') {
        console.log(res.message);
        return alert(res.message);
      }
      console.log('euh..lol', res);
      const newListData = [...listData];
      newListData.splice(index, 1);
      setListData(newListData);
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={withProps(_renderList, {
            theme,
            username,
            listData,
            onWishDelete: handleWishDelete,
          })}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WishAdd"
          component={withProps(Wish, {
            theme,
            username,
            title: 'Ajouter un cadeau',
            onValidate: handleWishAdd,
          })}
        />
        <Stack.Screen
          name="WishUpdate"
          component={withProps(Wish, {
            theme,
            username,
            title: 'Modifier un cadeau',
            onValidate: handleWishUpdate,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function _renderList({
  navigation,
  route,
  theme,
  username,
  listData,
  onWishDelete,
}) {
  const deleteAlert = index => () => {
    Alert.alert('Supprimer un cadeau', `Supprimer ${listData[index].name} ?`, [
      {text: 'Annuler'},
      {text: 'OK', onPress: onWishDelete(index)},
    ]);
  };

  let listComponent = null;

  if (listData == null) {
    listComponent = <ActivityIndicator animating={true} />;
  } else if (listData.length === 0) {
    listComponent = (
      <Text style={styles.p}>Votre liste d'envies est vide pour le moment</Text>
    );
  } else {
    listComponent = listData.map((wish, index) => (
      <List.Item
        key={index}
        title={wish.name}
        description={wish.description}
        onLongPress={deleteAlert(index)}
        onPress={() => {
          navigation.navigate('WishUpdate', {
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
        style={{...styles.fab, backgroundColor: theme.colors.primary}}
        icon="plus"
        onPress={() => {
          navigation.navigate('WishAdd');
        }}
      />
    </>
  );
}

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

export default withTheme(MyWishlist);
