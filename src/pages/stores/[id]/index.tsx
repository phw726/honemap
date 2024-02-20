import { useRouter } from 'next/router';

export default function StorePage() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Store Detail Page : {id} </h1>;
}
