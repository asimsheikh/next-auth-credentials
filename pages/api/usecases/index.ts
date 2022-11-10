import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Repo, repo } from '../../../repository/repo';
import { addBlogPost } from './addBlogPost';
import { registerUser } from './registerUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean; usersId?: number }>
) {
  if (req.body.action === 'REGISTER_USER') {
    const { username, password } = req.body.payload;
    const result = await registerUser(repo, { username, password });

    if (result.ok === false) {
      res.status(200).json({ ok: false, usersId: 0 });
    } else {
      res.status(200).json({ ok: true, usersId: result.usersId });
    }
  } else if (req.body.action === 'ADD_BLOG_POST') {
    const { date, blog, username } = req.body.payload;
    const result = await addBlogPost(repo, { date, blog, username });

    if (result.ok === true) {
      res.status(200).json({ ...result, ok: true });
    } else {
      res.status(200).json({ ...result, ok: false });
    }
  }
}
