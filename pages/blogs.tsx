import { getSession } from 'next-auth/react';
import { useState } from 'react';
import fetcher from '../utils/utils';

const addBlogPostAction = (date: string, blog: string, username: string) => {
  return {
    action: 'ADD_BLOG_POST',
    payload: { date: date, blog: blog, username: username }
  };
};

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
  const [selectedDate, setSelectedDate] = useState('');
  const [blog, setBlog] = useState('');

  return (
    <div>
      <h1 className='text-xl font-bold'>Blogs</h1>
      <p>Welcome back {session.username}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(blog, selectedDate);
          fetcher(
            '/api/usecases',
            addBlogPostAction(selectedDate, blog, session.username)
          );
          setSelectedDate('');
          setBlog('');
        }}
        className='flex flex-col w-1/2'
      >
        <input
          type='date'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <input
          value={blog}
          className='border-gray-200 border-2 p-2'
          onChange={(e) => setBlog(e.target.value)}
        />
        <button className=' text-gray-600 bg-green-300 border-2 border-green-300 p-2 mt-2'>
          {' '}
          Add Blog{' '}
        </button>
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
