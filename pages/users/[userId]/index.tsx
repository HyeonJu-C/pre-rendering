import { GetServerSidePropsContext } from 'next';

interface Props {
  userId: string;
}

export default function UserId({ userId }: Props) {
  return <h1>{`user - ${userId}`}</h1>;
}

// getStaticProps와 달리,
// 어떤 동적 경로를 pre rendering 할 것인지 정할 필요가 없다.
export async function getServerSideProps(
  context: GetServerSidePropsContext
) {
  const { params } = context;
  const userId = params?.userId;

  return {
    props: {
      userId,
    },
  };
}
