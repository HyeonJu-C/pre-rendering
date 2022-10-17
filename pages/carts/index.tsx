import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
}

interface Props {
  cartData: Product[];
}

export default function Carts({ cartData }: Props) {
  // 1. getStaticProps 에서 넘겨준 데이터를 초기 값으로 설정한다.
  // 2. cartData가 SEO에 반영된다.
  const [data, setData] = useState<Product[]>(cartData);
  const [isLoading, setIsLoading] = useState<null | boolean>(null);

  // 1. cartData를 새로 받아온 데이터로 대체한다.
  // 2. 새로 받아온 데이터는 SEO에 반영되지 않는다.
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
  //if (!data && isLoading) return <p>loading...</p>
  //     => getStaticProps에 의해 data가 항상 truthy 하기 때문에, 이 코드는 실행되지 않는다.

  // getStaticProps에 의해 cartData가 초기 값으로 설정되었으므로 아래 코드는 실행되지 않는다.
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

// 1. hook 사용 불가능
// 2. next.js에 의해 => getStaticProps 내부에서 fetch api 사용 가능
export async function getStaticProps() {
  const response = await fetch('https://dummyjson.com/carts/1');
  const data = await response.json();
  const cartData = data.products;

  return {
    props: { cartData },
  };
}
