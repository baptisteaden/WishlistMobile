const crypto = require('crypto');
const db = require('../db');
const {error, success, handleErr} = require('../_helpers');

exports.signIn = (req, res) => {
  const md5Pass = crypto
    .createHash('md5')
    .update(req.body.password)
    .digest('hex');

  const query = `
    SELECT username FROM user 
    WHERE username = '${req.body.username}' 
    AND md5_password = '${md5Pass}';
  `;

  db.get(query, (err, row) => {
    handleErr(res, err);
    res.json(
      row != null
        ? success(row)
        : error('Utilisateur ou mot de passe incorrect'),
    );
  });
};
