# Pre-rendering

## 목차

### 1. [기존의 Data Fetching의 문제점](https://github.com/HyeonJu-C/pre-rendering/commit/4ddd245973c7e6adaf8e7b747c6bbdf226910647)

### 2. Two forms of Pre-rendering

```
1. Static Generation(recommended)
2. Server Side Rendering
```

### 3. [getStaticProps](https://github.com/HyeonJu-C/pre-rendering/blob/main/pages/index.tsx)

- static page 구축하기
- revalidate 옵션 & incremental static regeneraion 설정하기
- notFound, redirect 옵션 & data fetching 실패 케이스 다루기
- dynamic page에서 getStaticProps을 사용하면 에러가 발생하는 이유
