import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
}

export default function Carts() {
  const [data, setData] = useState<null | Product[]>(null);
  const [isLoading, setIsLoading] = useState<null | boolean>(null);
  useEffect(() => {
    const getAllCarts = async () => {
      const response = await fetch('https://dummyjson.com/carts/1');
      const data = await response.json();
      setData(data.products);
    };
    setIsLoading(true);
    getAllCarts() //
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>loading...</p>;

  // useEffect는 초기 렌더링 이후에 실행되므로, 아래 반환되는 p 태그가 SEO에 반영된다.
  if (!data) return <p>no data</p>;

  return (
    <>
      <h1>Carts</h1>
      <ul>
        {data.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
}
