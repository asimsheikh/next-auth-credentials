import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import fetcher from '../utils/utils';

const addBlogPostAction = (date: string, blog: string, username: string) => {
  return {
    action: 'ADD_BLOG_POST',
    payload: { date: date, blog: blog, username: username }
  };
};

const getBlogPostsAction = (username: string) => {
  return {
    action: 'GET_BLOG_POSTS',
    payload: { username: username }
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

  const blogPosts = await fetcher(
    'http://localhost:3000/api/usecases',
    getBlogPostsAction(session.username)
  );

  return {
    props: {
      session,
      blogPosts: blogPosts.result
    }
  };
}

const Blogs = ({ blogPosts, session }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [blog, setBlog] = useState('');
  const router = useRouter();

  return (
    <div>
      <h1 className='text-4xl font-bold m-2'>Blogs</h1>
      <p className='m-2'>Welcome back {session.username}</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(blog, selectedDate);
          const result = await fetcher(
            '/api/usecases',
            addBlogPostAction(selectedDate, blog, session.username)
          );
          setSelectedDate('');
          setBlog('');
          if (result.ok) {
            router.push('/blogs');
          }
        }}
        className='flex flex-col w-1/2'
      >
        <input
          type='date'
          className='m-2'
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <input
          value={blog}
          className='border-gray-200 border-2 p-2 m-2'
          onChange={(e) => setBlog(e.target.value)}
        />
        <button className=' text-gray-600 bg-green-300 border-2 border-green-300 p-2 m-2'>
          {' '}
          Add Blog{' '}
        </button>
      </form>
      <ul className='m-2'>
        {blogPosts.map((post) => (
          <div className='mb-2' key={post.id}>
            <div>{post.date}</div>
            <div>{post.blog}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
