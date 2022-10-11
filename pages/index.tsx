// 1. import file system module from node.js
//    - client side(브라우저)의 js 코드에서는 프로젝트의 파일 시스템에 접근할 수 없다.
//    - 즉, 어플리케이션의 방문자는 프로젝트의 파일 구조를 알 수 없다.
//    - getStaticProps 함수 내에서는 fs에 접근할 수 있다.
// 2. client side 코드에는 아래의 import 구문이 포함되지 않는다.
import fs from 'fs/promises'; // fs/promise 모듈의 함수는 promise를 반환한다.
import path from 'path';

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

interface Props {
  products: Product[];
}

// getStaticProps의 반환값이 props으로 전달된다
function Home({ products }: Props) {
  return (
    <ul>
      {/* pre rendered page에 li가 포함된다 */}
      {products?.map(({ id, title }) => (
        <li key={`products-${id}`}>{title}</li>
      ))}
    </ul>
  );
}

// 1. 이 함수 내부에는 server side code를 작성한다.
//    - client side에 절대 노출되지 않는다.
//    - client side 코드가 아니라, credential, file system 접근 등 브라우저에서 실행하지 않거나, 실행되지 않는 코드를 작성한다.
//    - server 뿐만 아니라, app build 시 local machine에서도 동작한다.
// 2. build time 때 함수를 실행하고, Page 컴포넌트의 props으로 데이터를 전달해 준다.

export async function getStaticProps() {
  // 1. dummy-backend.json 파일 경로 찾기
  //    - cwd === current working directory
  //    - cwd 함수가 실행될 때, 현재 작업 중인 파일이 속한 폴더의 위치를 반환한다.
  //    - 우리 프로젝트에서는 next.js에 의해 이 함수가 실행되는데,
  //      next.js는 모든 파일이 root directory에 있는 것으로 취급한다.
  //    - 따라서 아래의 cwd는 프로젝트 root directory를 반환한다.
  const filePath = path.join(
    process.cwd(),
    'data',
    'dummy-backend.json'
  );

  // 2. json 데이터를 js object으로 변환하기
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  // 3. return
  //    - 항상 객체를 return 한다.
  //    - 객체의 형태는 { props: {...} }와 같다.
  return {
    props: {
      products: data.products,
    },
  };
}

export default Home;
