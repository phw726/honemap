import Layout from '@/Component/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>HONEMAP</h1>
      <ul>
        <li>
          <Link href="/stores">맛집 목록</Link>
        </li>
        <li>
          <Link href="/stores/new">맛집 생성</Link>
        </li>
        <li>
          <Link href="/stores/1">맛집 상세페이지</Link>
        </li>
        <li>
          <Link href="/stores/1/edit">맛집 수정페이지</Link>
        </li>
        <li>
          <Link href="/users/login">로그인 페이지</Link>
        </li>
        <li>
          <Link href="/users/mypage">마이페이지</Link>
        </li>
        <li>
          <Link href="/users/likes">찜한 맛집</Link>
        </li>
      </ul>
    </>
  );
}
