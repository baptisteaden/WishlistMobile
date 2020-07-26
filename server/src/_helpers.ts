import { Response } from 'express';
import { JsonResponse } from '../index.d';

export function success(data?: any): JsonResponse {
  return { status: 'success', data };
}

export function error(message: string): JsonResponse {
  return { status: 'error', message };
}

export function handleErr(res: Response, err: Error | null) {
  if (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Petit problème de serveur 😯 veuillez réessayer !',
      err,
    });
  }
}
