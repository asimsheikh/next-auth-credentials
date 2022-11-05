import type { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '@planetscale/database';

const config = {
  host: process.env.HOST,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD
};

const conn = connect(config);

const checkNotExistingUser = async (username: string): Promise<boolean> => {
  const results = await conn.execute('select * from users where username=?', [
    username
  ]);
  return results.rows.length === 0 ? true : false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean }>
) {
  console.log(process.env.USER);
  if (req.body.action === 'REGISTER_USER') {
    const { username, password } = req.body.payload;

    const notExistingUser = await checkNotExistingUser(username);

    if (notExistingUser) {
      const result = await conn.execute(
        'insert into users (username, password) values (?, ?)',
        [username, password]
      );
      res.status(200).json({ ok: true });
    } else {
      res.status(200).json({ ok: false });
    }
  }
}
