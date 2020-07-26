import { Request, Response } from 'express';
import { handleErr, success } from '../_helpers';
import { Wish, DbWish } from '../../index.d';
import db from '../db';

export function get(req: Request, res: Response) {
  const query = `
    SELECT id, name, description, examples, shoppers FROM wish 
    WHERE username = '${req.params.username}';
  `;

  db.all(query, (err, wishes: DbWish[]) => {
    handleErr(res, err);

    // Parse examples and shoppers from string|pipe|separated to array
    let ret: Wish[] = [];
    if (wishes) {
      ret = wishes.map(({ id, name, description, examples, shoppers }) => ({
        id,
        name: unescape(name),
        description: description ? unescape(description) : undefined,
        examples: examples ? examples.split('|') : [],
        shoppers: shoppers ? shoppers.split('|') : [],
      }));
    }

    res.json(success(ret));
  });
}

export function add(req: Request, res: Response) {
  function getAddedWishId() {
    const query = 'SELECT last_insert_rowid() AS wish_id';

    db.get(query, [], (err, wishId: number) => {
      handleErr(res, err);
      res.json(success(wishId));
    });
  }

  function addWish() {
    const query = `
      INSERT INTO wish (username, name, description, examples) 
      VALUES (
        '${req.params.username}', 
        '${req.body.name}', 
        '${req.body.description}', 
        '${req.body.examples.join('|')}'
      );
    `;

    db.run(query, [], (err) => {
      handleErr(res, err);
      getAddedWishId();
    });
  }

  addWish();
}

export function update(req: Request, res: Response) {
  const query = `
    UPDATE wish SET 
      name = '${req.body.name}', 
      description = '${req.body.description}', 
      examples = '${req.body.examples.join('|')}' 
    WHERE id = ${req.params.wish_id};
  `;
  db.run(query, [], (err) => {
    handleErr(res, err);
    res.json(success());
  });
}

export function destroy(req: Request, res: Response) {
  const query = `DELETE FROM wish WHERE id = ${req.params.wish_id};`;

  db.run(query, [], (err) => {
    handleErr(res, err);
    res.json(success());
  });
}

export function shop(req: Request, res: Response) {
  const query = `
    UPDATE wish SET 
      shoppers = '${req.body.shoppers.join('|')}' 
    WHERE id = ${req.params.wish_id};
  `;

  db.run(query, [], (err) => {
    handleErr(res, err);
    res.json(success());
  });
}
