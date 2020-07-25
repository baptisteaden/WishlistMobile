import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, Text } from 'react-native';
import {
  withTheme,
  List as PaperList,
  Divider,
  ActivityIndicator,
  FAB,
} from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Theme, ListItem, IListStack } from './_types.d';
import { get, destroy } from './_helpers';

const styles = StyleSheet.create({
  p: {
    textAlign: 'center',
  },
  a: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

// ---------- Typing ---------- //

export interface Props {
  navigation: StackNavigationProp<IListStack, 'List'>;
  route: RouteProp<IListStack, 'List'>;
  theme: Theme;
  canDelete: boolean | ((li: ListItem) => boolean);
  deleteAlertMessage: string;
  itemDescriptionNumberOfLines?: number;
}

// Typing function List + props = 'params' not defined on 'route'.
// RouteProp is probably not made to support dynamic typing.
// So to use <List /> component, we need to type the route and navigation with
// 'List', no matter what screen of the stack is being displayed.
//
// export interface Props<
//   StackParamList extends StackWithListComponent,
//   ScreenName extends ListScreen
// > {
//   navigation: StackNavigationProp<StackParamList, ListScreen>;
//   route: RouteProp<StackParamList, ScreenName>;
//   theme: Theme;
//   canDelete: boolean | ((li: ListItem) => boolean);
//   deleteAlertMessage: string;
//   itemDescriptionNumberOfLines?: number;
// }

// ---------- COMPONENT ---------- //

const List: React.FC<Props> = ({
  navigation,
  route,
  theme,
  canDelete,
  deleteAlertMessage,
  itemDescriptionNumberOfLines,
}) => {
  // ---------- States ---------- //

  const [listData, setListData] = useState<ListItem[] | null>(null);
  const {
    fetchUrl,
    itemFetchUrl,
    itemScreen,
    itemPropInUrl,
    addItemScreen,
    update,
    navTitle,
    title,
  } = route.params;

  // ---------- Effects ---------- //

  useEffect(() => {
    get(fetchUrl + itemFetchUrl).then((res) => {
      setListData(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (update) {
      const { itemIndex, itemData } = update;
      const newListData: ListItem[] = listData === null ? [] : [...listData];
      if (itemIndex != null) {
        // Handle item update
        newListData[itemIndex] = itemData;
        setListData(newListData);
      } else {
        // Handle item addition
        setListData(newListData.concat(itemData));
      }
      navigation.setParams({ update: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  // ---------- Handlers ---------- //

  const handleItemPress = (index: number, listItem: ListItem) => () => {
    if (!itemScreen) {
      return;
    }

    navigation.navigate(itemScreen, {
      index,
      data: listItem,
      itemFetchUrl: itemPropInUrl ? listItem[itemPropInUrl] : undefined,
      title: navTitle ? navTitle + listItem.name : title,
    });
  };

  const handleItemDelete = (index: number, itemId: string) => () => {
    destroy(`${fetchUrl}/${itemId}`).then((res) => {
      if (res.status === 'error') {
        console.log(res.message);
        return Alert.alert('Oops', res.message);
      }
      const newListData = [...listData!];
      newListData.splice(index, 1);
      setListData(newListData);
    });
  };

  const deleteAlert = (index: number, listItem: ListItem) => () => {
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

  if (title) {
    navigation.setOptions({ title });
  }

  let listComponent = null;

  if (listData == null) {
    listComponent = <ActivityIndicator animating style={theme.loading} />;
  } else if (listData.length === 0) {
    listComponent = <Text style={styles.p}>Liste vide, pour le moment !</Text>;
  } else {
    listComponent = listData.map((listItem: ListItem, index: number) => {
      const _canDelete =
        typeof canDelete === 'function' ? canDelete(listItem) : !!canDelete;

      return (
        <React.Fragment key={`listItem_${listItem.id}`}>
          <PaperList.Item
            title={listItem.name}
            description={listItem.description}
            onLongPress={_canDelete ? deleteAlert(index, listItem) : undefined}
            onPress={handleItemPress(index, listItem)}
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
          style={theme.fab}
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
