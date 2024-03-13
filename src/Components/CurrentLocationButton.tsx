import { currnetStoreState, mapState } from '@/atom';
import { useState } from 'react';
import { MdOutlineMyLocation } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import MapLoader from './MapLoader';

export default function CurrentLocationButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const [store, setStore] = useRecoilState(currnetStoreState);

  const map = useRecoilValue(mapState);
  const handleCurrentPosition = () => {
    setLoading(true);

    // geolocation(kakao map API)으로 현재 위치 가져오기

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        // 성공케이스
        position => {
          const currentPosition = new window.kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);

          // console.log(currentPosition);
          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            setStore(null);
            toast.success('현재 위치로 이동하였습니다.');
          }
          return currentPosition;
        },

        //실패케이스
        () => {
          setLoading(false);
          toast.error('다시 시도해주세요.');
        },
        options
      );
    }
  };
  return (
    <>
      {loading && <MapLoader />}
      <button
        type="button"
        onClick={handleCurrentPosition}
        className="fixed z-10 p-2 shadow right-10 bottom-20 bg-white rounded-md hover:shadow-lg hover:bg-blue-200 foucus:shadow-lg "
      >
        <MdOutlineMyLocation className="w-5 h-5" />
      </button>
    </>
  );
}
