const fetcher = async (url: string, payload: any) => {
  console.log('In fetcher');
  console.log(url, payload);
  const request = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const response = await request.json();
  return response;
};

export default fetcher;
