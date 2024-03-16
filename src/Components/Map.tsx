'use client';

/* global kakao */

import { locationState, mapState } from '@/atom';
import Script from 'next/script';
import { useRecoilValue, useSetRecoilState } from 'recoil';

declare global {
  interface Window {
    kakao: any;
  }
}

// const DEFAULT_LAT = 37.497946;
// const DEFAULT_LNG = 127.027622;
// const DEFAULT_ZOOM = 3;

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function Map({ lat, lng, zoom }: MapProps) {
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    // kakao map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat ?? location.lat, lng ?? location.lng), // 강남역  기준 //
        level: zoom ?? location.zoom,
      };

      // map 객체 형성
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
