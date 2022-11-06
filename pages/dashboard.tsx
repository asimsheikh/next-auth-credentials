import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      !session ? signIn() : setLoading(false);
    };
    securePage();
  }, []);

  if (loading) {
    return <h2>Loading ...</h2>;
  }

  return <h1>Dashboard page</h1>;
};

export default Dashboard;
