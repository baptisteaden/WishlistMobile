import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, Text } from 'react-native';
import {
  withTheme,
  List as PaperList,
  Divider,
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
  fetching: {
    padding: 10,
  },
});

const List: () => React$Node = ({
  navigation,
  route,
  theme,
  canDelete,
  deleteAlertMessage,
  itemDescriptionNumberOfLines,
}) => {
  // ---------- States ---------- //

  const [listData, setListData] = useState(null);
  const {
    fetchUrl,
    itemFetchUrl,
    itemScreen,
    itemPropInUrl,
    addItemScreen,
  } = route.params;

  // ---------- Effects ---------- //

  useEffect(() => {
    get(fetchUrl + itemFetchUrl).then((res) => {
      setListData(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (route.params.update) {
      const { itemIndex, itemData } = route.params.update;
      if (itemIndex != null) {
        // Handle item update
        const newListData = [...listData];
        newListData[itemIndex] = itemData;
        setListData(newListData);
      } else {
        // Handle item addition
        setListData([...listData, itemData]);
      }
      navigation.setParams({ update: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  // ---------- Handlers ---------- //

  const handleItemPress = (disabled, index, listItem) => () => {
    if (disabled) {
      return;
    }

    navigation.navigate(itemScreen, {
      index,
      data: listItem,
      itemFetchUrl: listItem[itemPropInUrl],
      title: route.params.navTitle
        ? route.params.navTitle + listItem.name
        : route.params.title,
    });
  };

  const handleItemDelete = (index, itemId) => () => {
    destroy(`${fetchUrl}/${itemId}`).then((res) => {
      if (res.status === 'error') {
        console.log(res.message);
        return Alert.alert('Oops', res.message);
      }
      const newListData = [...listData];
      newListData.splice(index, 1);
      setListData(newListData);
    });
  };

  const deleteAlert = (index, listItem) => () => {
    Alert.alert(
      'Suppression',
      deleteAlertMessage.replace('$(itemName)', listItem.name),
      [
        { text: 'Annuler' },
        { text: 'OK', onPress: handleItemDelete(index, listItem.id) },
      ],
    );
  };

  // ---------- Render ---------- //

  if (route.params.title) {
    navigation.setOptions({ title: route.params.title });
  }

  let listComponent = null;

  if (listData == null) {
    listComponent = <ActivityIndicator animating style={styles.fetching} />;
  } else if (listData.length === 0) {
    listComponent = <Text style={styles.p}>Liste vide, pour le moment !</Text>;
  } else {
    listComponent = listData.map((listItem, index) => {
      const _canDelete =
        typeof canDelete === 'function' ? canDelete(listItem) : !!canDelete;

      return (
        <React.Fragment key={`listItem_${listItem.id}`}>
          <PaperList.Item
            title={listItem.name}
            description={listItem.description}
            onLongPress={_canDelete ? deleteAlert(index, listItem) : null}
            onPress={handleItemPress(!itemScreen, index, listItem)}
            descriptionNumberOfLines={itemDescriptionNumberOfLines || 2}
          />
          <Divider />
        </React.Fragment>
      );
    });
  }

  return (
    <>
      <ScrollView>{listComponent}</ScrollView>
      {!addItemScreen ? null : (
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
