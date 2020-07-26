import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { error, success, handleErr } from '../_helpers';
import db from '../db';

// eslint-disable-next-line import/prefer-default-export
export function signIn(req: Request, res: Response) {
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

    db.get(query, (err: Error, row: { username: string }) => {
      handleErr(res, err);

      let resContent = error('Utilisateur ou mot de passe incorrect');
      if (row != null) {
        // Auth ok => create jwt + success response
        const token = jwt.sign(row, process.env.JWT_SECRET!, {
          expiresIn: '60d',
        });
        resContent = success({ ...row, jwt: token });
      } else {
        res.status(401);
      }

      res.json(resContent);
    });
  } catch (e) {
    res.status(500).json(error("Problème d'authentification 😨"));
    console.error(e);
  }
}
