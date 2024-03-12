import Map from '@/Components/Map';
import Markers from '@/Components/Markers';
import StoreBox from '@/Components/StoreBox';
import { StoreType } from '@/interface';
import axios from 'axios';
import { useState } from 'react';

export default function Home({ stores }: { stores: StoreType[] }) {
  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
    </>
  );
}

export async function getServerSideProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  return {
    props: { stores: stores.data },
  };
}
