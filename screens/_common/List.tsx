import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, Text } from 'react-native';
import {
  withTheme,
  List as PaperList,
  ActivityIndicator,
  FAB,
} from 'react-native-paper';
import { get, destroy } from './_helpers';

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

const List: () => React$Node = ({
  navigation,
  route,
  theme,
  updateItemScreen,
  addItemScreen,
  showAddButton,
}) => {
  // ---------- States ---------- //

  const [listData, setListData] = useState(null);
  const { fetchUrl } = route.params;

  // ---------- Effects ---------- //

  useEffect(() => {
    get(fetchUrl).then((res) => {
      setListData(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('useEffect', route.params.update);
    if (route.params.update) {
      const { itemIndex, itemData } = route.params.update;
      if (itemIndex) {
        // Handle item update
        const newListData = [...listData];
        newListData[itemIndex] = itemData;
        setListData(newListData);
        console.log('item updated!');
      } else {
        // Handle item addition
        setListData([...listData, itemData]);
        console.log('item added!');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  // ---------- Handlers ---------- //

  const handleItemDelete = (index) => () => {
    destroy(`${fetchUrl}/${listData[index].id}`).then((res) => {
      if (res.status === 'error') {
        console.log(res.message);
        return Alert.alert('Oops', res.message);
      }
      const newListData = [...listData];
      newListData.splice(index, 1);
      setListData(newListData);
    });
  };

  const deleteAlert = (index) => () => {
    Alert.alert('Suppression', `Supprimer ${listData[index].name} ?`, [
      { text: 'Annuler' },
      { text: 'OK', onPress: handleItemDelete(index) },
    ]);
  };

  // ---------- Render ---------- //

  let listComponent = null;

  if (listData == null) {
    listComponent = <ActivityIndicator animating />;
  } else if (listData.length === 0) {
    listComponent = (
      <Text style={styles.p}>Votre liste est vide pour le moment</Text>
    );
  } else {
    listComponent = listData.map((listItem, index) => (
      <PaperList.Item
        key={listItem.id}
        title={listItem.name}
        description={listItem.description}
        onLongPress={deleteAlert(index)}
        onPress={() => {
          navigation.navigate(updateItemScreen, {
            index,
            data: listItem,
          });
        }}
      />
    ));
  }

  return (
    <>
      <ScrollView>{listComponent}</ScrollView>
      {!showAddButton ? null : (
        <FAB
          style={{ ...styles.fab, backgroundColor: theme.colors.primary }}
          icon="plus"
          onPress={() => {
            navigation.navigate(addItemScreen);
          }}
        />
      )}
    </>
  );
};

export default withTheme(List);
