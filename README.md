# [Pre-rendering](https://hyeonju-frontend-study.tistory.com/192)

## 목차

### 1. [Data Fetching의 문제점 ↔️ Next.js의 Pre-rendering](https://github.com/HyeonJu-C/pre-rendering/commit/4ddd245973c7e6adaf8e7b747c6bbdf226910647)

### 2. Two forms of Pre-rendering

```
1) Static Site Generation(recommended)
2) Server Side Rendering
```

### 3. Static Site Generation(SSG)

### 3-1) [getStaticProps](https://github.com/HyeonJu-C/pre-rendering/blob/main/pages/index.tsx)

```
1) data 필요한 페이지를 pre-rendering 하는 방법

2) revalidate 옵션
    - incremental static regeneraion 설정하기

3) notFound, redirect 옵션
    - data fetching 실패 케이스 다루기

4) dynamic page에서 getStaticProps을 사용하면 에러가 발생하는 이유
```

### 3-2) [getStaticPaths](https://github.com/HyeonJu-C/pre-rendering/blob/main/pages/[productId]/index.tsx)

```
1) dynamic page를 static page로 사전 생성하기

2) paths 옵션
    - 사전 생성할 페이지의 구체적인 instance 지정하기

3) fallback 옵션
    - false, true, 'blocking' 옵션 비교
```

### 4. Server Side Rendering(SSR)

### 4-1) [getServerSideProps](https://github.com/HyeonJu-C/pre-rendering/blob/main/pages/user-profile/index.tsx)

```
1) getStaticProps와 차이점
    - revalidate, paths 옵션 지정할 필요❌

2) dtnamic page를 server side rendering 하기
```
