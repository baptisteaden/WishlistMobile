const db = require('../db');
const {handleErr, success} = require('../_helpers');

exports.get = (req, res) => {
  const query = `
    SELECT id, name, description, examples FROM wish 
    WHERE username = '${req.params.username}';
  `;

  db.all(query, (err, wishes) => {
    handleErr(res, err);

    // Parse examples from string|pipe|separated to array
    if (wishes) {
      wishes.forEach(wish => {
        wish.examples = wish.examples ? wish.examples.split('|') : [];
      });
    }

    res.json(success(wishes ? wishes : []));
  });
};

exports.add = (req, res) => {
  const query = `
    INSERT INTO wish (username, name, description, examples) 
    VALUES (
      '${req.params.username}', 
      '${req.body.name}', 
      '${req.body.description}', 
      '${req.body.examples.join('|')}'
    );
  `;

  db.run(query, [], err => {
    handleErr(res, err);
    res.json(success());
  });
};

exports.update = (req, res) => {
  const query = `
    UPDATE wish SET 
      name = '${req.body.name}', 
      description = '${req.body.description}', 
      examples = '${req.body.examples.join('|')}' 
    WHERE id = ${req.params.wish_id};
  `;

  db.run(query, [], err => {
    handleErr(res, err);
    res.json(success());
  });
};

exports.destroy = (req, res) => {
  db.run(`DELETE FROM wish WHERE id = ${req.params.wish_id};`, [], err => {
    handleErr(res, err);
    res.json(success());
  });
};
