import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

import { connect } from '@planetscale/database';

const config = {
  host: process.env.HOST,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD
};

const conn = connect(config);

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'asim@sheikh.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const result = await conn.execute(
          'select * from users where username=?',
          [credentials?.username]
        );
        if (
          result.rows.length > 0 &&
          result.rows[0].password == credentials?.password
        ) {
          return { id: 1, username: credentials?.username };
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.username = token.username;

        console.log('Callback session is', session);
      }
      return session;
    }
  },
  secret: 'test',
  jwt: {
    secret: 'test'
  }
});
