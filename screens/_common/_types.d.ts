import { Theme as PaperTheme } from 'react-native-paper';

export interface Theme extends PaperTheme {
  fab: object;
  loading: object;
}

export type JsonResponse = {
  status: string;
  data?: any;
  message?: string;
};

// Should be an import from react-native-paper
export interface PaperRoute {
  route: {
    key: string;
    title?: string;
    icon?: IconSource;
    badge?: string | number | boolean;
    color?: string;
    accessibilityLabel?: string;
    testID?: string;
  };
  jumpTo: (key: string) => void;
}

export enum ListItemKey {
  id = 'id',
  name = 'name',
  description = 'description',
}

interface IListItem {
  name: string;
  description: string;
}

export interface ListItem extends IListItem {
  id: string;
}

export interface NewListItem extends IListItem {
  id?: string;
}

// Screens that return or use the <List /> component
// export enum ListScreen {
//   WishList = 'WishList',
//   FriendList = 'FriendList',
//   FriendWishList = 'FriendWishList',
//   WishConsult = 'WishConsult',
// }

type ListParams = {
  fetchUrl: string;
  itemFetchUrl: string;
  itemScreen?: keyof IListStack;
  addItemScreen?: keyof IListStack;
  itemPropInUrl?: keyof ListItem;
  navTitle?: string;
  title?: string;
  update?: {
    itemIndex?: number;
    itemData: any;
  };
  data?: any;
  index?: number;
};

// A fake stack param list to be able to use RouteProp in <List /> component.
// More info there...
export interface IListStack extends Record<string, object | undefined> {
  List: ListParams;
}

export interface FriendsStackParamList extends IListStack {
  FriendList: ListParams;
  FriendWishList: ListParams;
  WishConsult: ListParams;
}

export interface WishesStackParamList extends IListStack {
  WishList: ListParams;
  WishAdd: ListParams;
  WishUpdate: ListParams;
}
