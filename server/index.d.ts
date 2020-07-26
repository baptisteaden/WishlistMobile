export type JsonResponse = {
  status: string;
  data?: any;
  message?: string;
};

export interface IListItem {
  name: string;
  description?: string;
}

export interface ListItem extends IListItem {
  id: number;
}

export interface Wish extends ListItem {
  examples: string[];
  shoppers: string[];
}

export interface DbWish extends ListItem {
  examples: string; // Stored|as|string|pipe|separeted|in|db
  shoppers: string; // Stored|as|string|pipe|separeted|in|db
}

export interface Comment {
  id?: number;
  wish_id: id;
  author: string;
  text: string;
  date: string;
}

export type FriendMap = {
  id: number;
  user1: string;
  user2: string;
};
