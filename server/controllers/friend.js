const db = require('../db');
const { handleErr, success } = require('../_helpers');

exports.get = (req, res) => {
  const query = `
    SELECT id, user1, user2 FROM friend 
    WHERE user1 = '${req.params.username}'
    OR user2 = '${req.params.username}';
  `;

  db.all(query, (err, friendsMap) => {
    handleErr(res, err);

    // Parse result as an array of friends
    const friends = friendsMap
      ? friendsMap.map(({ id, user1, user2 }) => ({
          id,
          name: user1 === req.params.username ? user2 : user1,
          //TODO: maybe description: number of gifts if the list
        }))
      : [];

    res.json(success(friends));
  });
};

exports.add = (req, res) => {
  //TODO
};

exports.remove = (req, res) => {
  //TODO
};
