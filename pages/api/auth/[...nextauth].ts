import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

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
      authorize: (credentials) => {
        if (
          credentials?.username === 'asim@sheikh.com' &&
          credentials?.password === 'test'
        ) {
          return {
            id: '2',
            name: 'Asim',
            email: 'asim.sardar.sheikh@gmail.com'
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        console.log('There is a user', user);
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        console.log('Callback token is', token);
        session.id = token.id;
        session.user.image = 'http://www.avatar.com/asim';

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
