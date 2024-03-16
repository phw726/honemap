import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      name?: string;
      email: string;
      image?: string;
    };
  }
}

// like 기능추가 // [nextauth].ts에 callbacks으로 추가한 id값을 타입을 지정해서 사용해야함
