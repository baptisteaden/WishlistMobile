require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const userRouter = require('./routes/user');
const wishRouter = require('./routes/wish');
const friendRouter = require('./routes/friend');
const commentRouter = require('./routes/comment');
const { error } = require('./_helpers');

const app = express();

// middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
  expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }).unless({ path: ['/', '/user'] }),
);
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status).json(err);
  } else {
    next();
  }
});

// routes
app.get('/', (req, res) => {
  res.json({
    hey: 'Welcome to my wishlist API :)',
    mode: process.env.NODE_ENV,
  });
});
app.use('/user', userRouter);
app.use('/wish', wishRouter);
app.use('/friend', friendRouter);
app.use('/comment', commentRouter);

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port ', process.env.PORT || 5000);
});
