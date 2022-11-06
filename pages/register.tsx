import { setDefaultResultOrder } from 'dns';
import { useRouter } from 'next/router';
import { useState } from 'react';

const send = async (username: string, password: string) => {
  const req = await fetch('/api/registerUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'REGISTER_USER',
      payload: { username: username, password: password }
    })
  });
  const response = await req.json();
  return response;
};

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const resp = await send(username, password);
          if (resp.ok === true) {
            setError(false);
            router.push('/api/auth/signin');
          } else {
            setError(true);
          }
        }}
      >
        <div>
          {error ? <div className='bg-red-300'>There was an error</div> : null}
          <label htmlFor='username'>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            name='username'
            id='username'
            className='border-2'
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            name='password'
            id='password'
            className='border-2'
          />

          <div>
            <input type='submit' value='Register' className='bg-blue-400 p-2' />
          </div>
        </div>
      </form>
    </div>
  );
}
