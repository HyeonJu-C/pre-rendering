import { useEffect, useState } from 'react';

/*
강의 내용)
1. page source에서 브라우저가 처음에 다운로드 하는 html 코드(initial code)를 볼 수 있다.
2. 여기에는 products 데이터가 포함되어 있지 않다.
  - 검색엔진은 page source 코드를 확인한다. => SEO 문제
  - 실제 백엔드로 부터 데이터를 받아와야만 한다. => 화면 로딩 지연  
*/
interface Product {
  id: string;
  title: string;
}

function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    fetch('/dummy-backend.json') //
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <ul>
      {products?.map(({ id, title }) => (
        <li key={`products-${id}`}>{title}</li>
      ))}
    </ul>
  );
}

export default Home;
