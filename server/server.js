require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const userRouter = require('./routes/user');
const wishRouter = require('./routes/wish');
const friendRouter = require('./routes/friend');
const commentRouter = require('./routes/comment');

const app = express();

//middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
  expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }).unless({ path: ['/', '/user'] }),
);

//routes
app.get('/', (req, res) => res.json({ Hey: 'Welcome to my wishlist API' }));
app.use('/user', userRouter);
app.use('/wish', wishRouter);
app.use('/friend', friendRouter);
app.use('/comment', commentRouter);

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port ', process.env.PORT || 3000);
});
