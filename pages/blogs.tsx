import { signIn, getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=%2Fblogs',
        permanent: false
      }
    };
  }

  return { props: { session } };
}

const Blogs = () => {
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>
    </div>
  );
};

export default Blogs;
