const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { error, success, handleErr } = require('../_helpers');

exports.signIn = (req, res) => {
  try {
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

      let resContent = null;
      if (row != null) {
        // Auth ok => create jwt + success response
        const token = jwt.sign(row, process.env.JWT_SECRET, {
          expiresIn: '60d',
        });
        resContent = success({ ...row, jwt: token });
      } else {
        res.status(500);
        resContent = error('Utilisateur ou mot de passe incorrect');
      }

      res.json(resContent);
    });
  } catch (e) {
    res.status(500).json(error("Problème d'authentification 😨"));
  }
};
