import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Repo, repo } from '../../../repository/repo';
import { registerUser } from './registerUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean; usersId?: number }>
) {
  const { username, password } = req.body.payload;
  const result = await registerUser(repo, { username, password });

  if (result.ok === false) {
    res.status(200).json({ ok: false, usersId: 0 });
  } else {
    res.status(200).json({ ok: true, usersId: result.usersId });
  }
}
