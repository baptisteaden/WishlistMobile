const db = require('../db');
const { handleErr, success } = require('../_helpers');

exports.get = (req, res) => {
  const query = `
    SELECT id, author, date, text FROM comment 
    WHERE wish_id = '${req.params.wish_id}';
  `;

  db.all(query, (err, comments) => {
    handleErr(res, err);

    // Format
    const formattedComments = comments.map(({ id, author, date, text }) => ({
      id,
      name: unescape(author),
      description: `${unescape(date)}\n\n${unescape(text)}`,
    }));

    res.json(success(formattedComments));
  });
};

exports.add = (req, res) => {
  function getAddedCommentId() {
    const query = 'SELECT last_insert_rowid() AS comment_id;';

    db.get(query, [], (err, commentId) => {
      handleErr(res, err);
      res.json(success(commentId));
    });
  }

  function addComment() {
    const query = `
    INSERT INTO comment (wish_id, author, text, date) 
    VALUES (
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
};

exports.destroy = (req, res) => {
  const query = `DELETE FROM comment WHERE id = ${req.params.comment_id};`;

  db.run(query, [], (err) => {
    handleErr(res, err);
    res.json(success());
  });
};
