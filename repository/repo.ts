import { connect, Connection } from '@planetscale/database';

interface Config {
  username?: string;
  host?: string;
  password?: string;
}

interface Post {
  date: string;
  blog: string;
}

export interface User {
  username: string;
  password: string;
}

const config: Config = {
  host: process.env.HOST,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD
};

export class Repo {
  conn: Connection;
  constructor(connect: Connection, config: Config) {
    this.conn = connect(config);
  }

  async addPost(post: Post, username: string) {
    const { date, blog } = post;
    let result = await this.conn.execute(
      'insert into microblog (date, blog, users_id) values(?,?, (select id from users where username=?))',
      [date, blog, username]
    );
    if (result.insertId !== '') {
      return { ok: true, insertId: result.insertId };
    } else {
      return { ok: false };
    }
  }

  async registerUser(user: User) {
    const { username, password } = user;

    const checkUser = await this.conn.execute(
      'select * from users where username=?',
      [username]
    );
    console.log(checkUser);

    if (checkUser.rows.length > 0) {
      return { ok: false, usersId: 0 };
    }

    let result = await this.conn.execute(
      'insert into users (username, password) values(?,?)',
      [username, password]
    );
    return { ok: true, usersId: Number(result.insertId) };
  }

  async findUserId(username: string) {
    let result = await this.conn.execute(
      'select id from users where username=?',
      [username]
    );
    return result.rows[0].id;
  }

  async getPosts(username: string) {
    const results = await this.conn.execute(
      'select * from microblog where users_id in ( select id from users where username=?)',
      [username]
    );
    return results.rows;
  }
}

export const repo = new Repo(connect, config);
