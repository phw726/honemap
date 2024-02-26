import Map from '@/Components/Map';
import Markers from '@/Components/Markers';
import StoreBox from '@/Components/StoreBox';
import * as stores from '@/mapdata/store_data.json';
import { useState } from 'react';

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores['DATA'];

  console.log(currentStore);
  return (
    <>
      <Map setMap={setMap} />
      <Markers storeDatas={storeDatas} map={map} setCurrentStore={setCurrentStore} />

      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}
