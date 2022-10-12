import { readFile } from 'fs/promises';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import path from 'path';
import { Product } from '../index';

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  // 1) fallback: true
  // - 페이지가 fallback 상태인지 확인하고, 그 때 반환할 컴포넌트를 지정해야 한다.
  // 2) fallback: 'blocking'
  // - fallback page를 반환하지 않고, 서버에서 full page가 생성되면 그 페이지를 반환한다.
  // - 따라서 아래의 조건문이 실행되지 않는다.
  const { isFallback } = useRouter();
  if (isFallback) return <p>loading...</p>;

  // segement에 해당하는 productId가 존재하지 않을 때
  if (!product) return <p>no product</p>;

  const { title, description } = product;
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}

/*
강의 내용)
1. Next.js는 동적 경로가 포함된 페이지는 기본적으로 pre-rendering 하지 않는다.  
    - [dynamic path]를 갖는 페이지의 경우에는, pre rendering에 포함되지 않는다. 
    - [dynamic path]는 엄밀히 말해 하나의 페이지가 아니라, 수 많은 페이지이기 때문이다. => /p1, /p2, /hello, /123, ...
    - 즉, next.js는 얼마나 많은 페이지를 사전에 생성해야 하는지 알 수 없다. 
2. 대신, request가 발생할 때 마다, 서버 측에서 페이지를 생성한다. 
3. 그래서 pre-rendering을 요청하는 getStaticProps 함수를 실행하면 에러가 발생한다.
    - getStatisProps에 정적으로 생성할 페이지의 segment를 list 형태로 제공해야 한다.
    - 또는 getStaticPaths 함수를 이용한다. 
*/

// 1. getStaticProps내부에서 useRouter를 호출할 수 없다.
//  - 이 함수는 Component 함수도 custom hook도 아니기 때문이다.
// 2. 대신 context parameter를 이용하면, dynamic params의 구체적인 값을 알 수 있다.

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const productId = params?.productId;

  const products: Product[] = await getProductsData();
  const product = products.find(
    ({ id }: Product) => id === productId
  );

  // product이 존재하지 않을 때, getStaticProps에서 notFound 페이지를 반환할 수 있다.
  // 이 때에는 page 컴포넌트에서 처리하고 있는 if(!product) 조건문이 실행되지 않는다.
  if (!product) return { notFound: true };

  return {
    props: {
      product: product,
    },
  };
}

/*
강의 내용)
1. getStaticPaths에서 정적으로 생성할 페이지를 지정한다.
2. 1번에서 지정된 페이지 각각에 대하여 getStaticProps 함수가 실행된다. 
3. context를 이용해 페이지의 params을 추출하고, 그 값을 이용할 수 있다. 
*/

export async function getStaticPaths() {
  // 객체를 반환한다
  // 이 객체는 "paths: [{}, {}, {}...]"를 프로퍼티로 갖는다.
  // next.js에게 pre-rendering 해야할 페이지를 알려준다.
  const products = await getProductsData();
  const paths = products.map(({ id }: Product) => ({
    params: { productId: id },
  }));
  return {
    paths,
    // fallback options: paths에서 지정하지 않은 url에 접근했을 때, 어떻게 동작할 것인지 지정
    // => false, true, 'blocking'
    fallback: true,
  };
}

async function getProductsData() {
  const filePath = path.join(
    process.cwd(),
    'data',
    'dummy-backend.json'
  );
  const jsonData = await readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data.products;
}
