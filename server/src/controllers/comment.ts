import { Request, Response } from 'express';
import { handleErr, success } from '../_helpers';
import { Comment, ListItem } from '../../index.d';
import db from '../db';

export function get(req: Request, res: Response) {
  const query = `
    SELECT id, author, date, text FROM comment 
    WHERE wish_id = '${req.params.wish_id}';
  `;

  db.all(query, (err, comments: Comment[]) => {
    handleErr(res, err);

    // Format
    const formattedComments: ListItem[] = comments.map(
      ({ id, author, date, text }) => ({
        id: id!,
        name: unescape(author),
        description: `${unescape(date)}\n\n${unescape(text)}`,
      }),
    );

    res.json(success(formattedComments));
  });
}

export function add(req: Request, res: Response) {
  function getAddedCommentId() {
    const query = 'SELECT last_insert_rowid() AS comment_id;';

    db.get(query, [], (err, commentId: number) => {
      handleErr(res, err);
      res.json(success(commentId));
    });
  }

  function addComment() {
    const query = `
      INSERT INTO comment (wish_id, author, text, date) 
      VALUES(
        ${req.params.wish_id}, 
        '${req.body.author}', 
        '${req.body.text}', 
        '${req.body.date}'
      );
    `;

    db.run(query, [], (err) => {
      handleErr(res, err);
      getAddedCommentId();
    });
  }

  addComment();
}

export function destroy(req: Request, res: Response) {
  const query = `DELETE FROM comment WHERE id = ${req.params.comment_id};`;

  db.run(query, [], (err) => {
    handleErr(res, err);
    res.json(success());
  });
}
