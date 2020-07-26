import { Request, Response } from 'express';
import { handleErr, success } from '../_helpers';
import db from '../db';
import { ListItem, FriendMap } from '../../index.d';

export function get(req: Request, res: Response) {
  const query = `
    SELECT id, user1, user2 FROM friend 
    WHERE user1 = '${req.params.username}'
    OR user2 = '${req.params.username}';
  `;

  db.all(query, (err, friendsMap: FriendMap[]) => {
    handleErr(res, err);

    // Parse result as an array of friends
    const friends: ListItem[] = friendsMap
      ? friendsMap.map(({ id, user1, user2 }) => ({
          id,
          name: user1 === req.params.username ? user2 : user1,
          // TODO: maybe description: number of gifts in the list
        }))
      : [];

    res.json(success(friends));
  });
}

export function add() {
  // TODO
}

export function destroy() {
  // TODO
}
