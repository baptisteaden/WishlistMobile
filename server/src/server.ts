import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import userRouter from './routes/user';
import wishRouter from './routes/wish';
import friendRouter from './routes/friend';
import commentRouter from './routes/comment';

const app = express();

// ---------- Middlewares ---------- //

// TODELETE?
app.use(express.static('public'));

// JSON body
app.use(bodyParser.json());

// JWT authorization
app.use(
  jwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
  }).unless({ path: ['/', '/user'] }),
);

// JSON Error handler
app.use(
  (
    err: { status: number },
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (err) {
      res.status(err.status).json(err);
      console.log(err);
    } else {
      next();
    }
  },
);

// TMP body params escaping (GraphQL incoming)
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.body) {
    Object.entries(req.body).forEach(([key, value]) => {
      if (typeof value === 'string') {
        req.body[key] = escape(value);
      }
    });
  }
  next();
});

// ---------- Routes ---------- //

app.get('/', (_req: Request, res: Response) => {
  res.json({
    hey: 'Welcome to my wishlist API :)',
    mode: process.env.NODE_ENV,
  });
});
userRouter.use('/:username/friend', friendRouter);
userRouter.use('/:username/wish', wishRouter);
wishRouter.use('/:wish_id/comment', commentRouter);
app.use('/user', userRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port ', process.env.PORT || 5000);
});
