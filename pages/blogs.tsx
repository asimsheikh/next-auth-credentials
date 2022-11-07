import { getSession } from 'next-auth/react';
import { useState } from 'react';

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
  const [blogTitle, setBlogTitle] = useState('');

  return (
    <div>
      <h1 className='text-xl font-bold'>Blogs</h1>
      <p>Welcome back {session.username}</p>
      <form>
        <label htmlFor='blogTitle'>Blog Title</label>
        <input
          className='border-2 ml-2 my-2'
          type='text'
          name='blogTitle'
          id='blogTitle'
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
      </form>
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
