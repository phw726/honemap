// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client';

// import GoogleProvider from 'next-auth/providers/google';
// import NaverProvider from 'next-auth/providers/naver';
// import KakaoProvider from 'next-auth/providers/kakao';

// const prisma = new PrismaClient();

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     // ...add more providers here

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//     NaverProvider({
//       clientId: process.env.NAVER_CLIENT_ID || '',
//       clientSecret: process.env.NAVER_CLIENT_SECRET || '',
//     }),
//     KakaoProvider({
//       clientId: process.env.KAKAO_CLIENT_ID || '',
//       clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
//     }),
//   ],

//   pages: {
//     signIn: '/users/login',
//   },
// };

// export default NextAuth(authOptions);

import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import prisma from '@/db';

export const authOptions = {
  session: {
    strategy: 'jwt' as const,
    maxAge: 24 * 60 * 60, //3days
    updateAge: 2 * 60 * 60, // 24hours
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    // Add more providers as needed
  ],
  pages: {
    signIn: '/users/login',
  },
};
export default NextAuth(authOptions);
