import { getSession } from 'next-auth/react';

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

  return {
    props: {
      session,
      blogPosts: [
        { id: 1, title: 'Welcome to the house' },
        { id: 2, title: 'Make it home people' }
      ]
    }
  };
}

const Blogs = ({ blogPosts, session }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <p>{session.username} blog posts</p>
      <ul>
        {blogPosts.map((post) => (
          <div key={post.id}>
            {post.id} - {post.title}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
