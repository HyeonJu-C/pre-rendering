import { GetServerSidePropsContext } from 'next';

interface Props {
  userName: string;
}

export default function UserProfile({ userName }: Props) {
  return <h1>{`name: ${userName}`}</h1>;
}

/*
강의 내용) getStaticProps 함수와 차이점
1. build time이 아니라 실제 요청이 발생할 때마다 서버에서 페이지를 pre-rendering 한다. 
2. context parameter를 통해 req, res와 같은 객체에 접근할 수 있다. 
*/

export async function getServerSideProps(
  context: GetServerSidePropsContext
) {
  // 요청에 따라 서버에서 페이지를 pre rendering 하기 때문에,
  // req, res 객체에 접근할 수 있다.
  // => 요청을 보낸 사용자를 식별하고, 그 사용자에 대한 데이터를 db에서 받아올 수 있다.
  const { params, req, res } = context;

  // getServerSideProps는 server에서 실행되는 함수이기 때문에,
  // 브라우저 콘솔이 아니라, 개발 서버를 실행 중인 콘솔에서 아래 req를 확인할 수 있다.
  console.log(req);

  // 객체를 반환한다.
  // getStaticProps와 동일한 구조를 갖는다.
  // revalidate key의 값을 설정할 필요는 없다. => 매 request 마다 페이지를 pre-rendering 하기 때문
  return {
    props: {
      // 쿠키 등을 이용해 사용자를 식별하고, 데이터를 받아온다.
      userName: 'carolina',
    },
  };
}
