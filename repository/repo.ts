import { connect, Connection } from '@planetscale/database';

type Config = {
  username?: string;
  host?: string;
  password?: string;
};

type Post = {
  date: string;
  blog: string;
  users_id: number;
};

export type User = {
  username: string;
  password: string;
};

const config: Config = {
  host: process.env.HOST,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD
};

export class Repo {
  conn: Connection;
  constructor(connect: any, config: Config) {
    this.conn = connect(config);
  }

  async addPost(post: Post) {
    const { date, blog, users_id } = post;
    let result = await this.conn.execute(
      'insert into microblog (date, blog, users_id) values(?,?,?)',
      [date, blog, users_id]
    );
    if (result.insertId !== '') {
      return { ok: true, insertId: result.insertId };
    } else {
      return { ok: false };
    }
  }

  async registerUser(user: User) {
    const { username, password } = user;
    let result = await this.conn.execute(
      'insert into users (username, password) values(?,?)',
      [username, password]
    );
    return { ok: true, usersId: result.insertId };
  }

  async getPosts(usersId: number) {
    const results = await this.conn.execute(
      'select * from microblog where users_id=?',
      [usersId]
    );
    return results.rows;
  }
}

export const repo = new Repo(connect, config);
