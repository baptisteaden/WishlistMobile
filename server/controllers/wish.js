const db = require('../db');
const { handleErr, success } = require('../_helpers');

exports.get = (req, res) => {
  const query = `
    SELECT id, name, description, examples, shoppers FROM wish 
    WHERE username = '${req.params.username}';
  `;

  db.all(query, (err, wishes) => {
    handleErr(res, err);

    // Parse examples and shoppers from string|pipe|separated to array
    if (wishes) {
      wishes.forEach((wish) => {
        wish.examples = wish.examples ? wish.examples.split('|') : [];
        wish.shoppers = wish.shoppers ? wish.shoppers.split('|') : [];
      });
    }

    res.json(success(wishes || []));
  });
};

exports.add = (req, res) => {
  function getAddedWishId() {
    const query = 'SELECT last_insert_rowid() AS wish_id';

    db.get(query, [], (err, wishId) => {
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
};

exports.update = (req, res) => {
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
};

exports.destroy = (req, res) => {
  const query = `DELETE FROM wish WHERE id = ${req.params.wish_id};`;

  db.run(query, [], (err) => {
    handleErr(res, err);
    res.json(success());
  });
};

exports.shop = (req, res) => {
  const query = `
    UPDATE wish SET 
      shoppers = '${req.body.shoppers.join('|')}' 
    WHERE id = ${req.params.wish_id};
  `;

  db.run(query, [], (err) => {
    handleErr(res, err);
    res.json(success());
  });
};
