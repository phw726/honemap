import { StoreType } from '@/interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as StoreType;
  };

  const { data: store, refetch } = useQuery<StoreType>(`like-store-${storeId}`, fetchStore, {
    enabled: !!storeId,
    refetchOnWindowFocus: false,
  });

  const toggleLike = async () => {
    // 찜하기/찜취소 로직

    if (session?.user && store) {
      try {
        const like = await axios.post('/api/likes', {
          storeId: store.id,
        });

        if (like.status === 201) {
          toast.success('찜한가게 목록에 추가했습니다.');
        } else {
          toast.warn('찜한가게 목록에서 삭제했습니다.');
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {/* 로그인된 사용자가 좋아요를 눌렀을 경우 true면 fillheart */}

      {store?.likes?.length ? (
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-60" />
      )}
    </button>
  );
}
