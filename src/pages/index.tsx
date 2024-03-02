import Map from '@/Components/Map';
import Markers from '@/Components/Markers';
import StoreBox from '@/Components/StoreBox';
import { StoreType } from '@/interface';
import axios from 'axios';
import { useState } from 'react';

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  // const storeDatas = stores['DATA'];

  // console.log(currentStore);

  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  return {
    props: { stores: stores.data },
    revalidate: 60 * 60,
  };
}
