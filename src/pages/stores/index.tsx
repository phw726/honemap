import React, { useCallback, useEffect, useRef, useState } from 'react';

import Loading from '@/Components/Loading';
import { StoreType } from '@/interface';
import axios from 'axios';
import Image from 'next/image';

import { useInfiniteQuery, useQuery } from 'react-query';
import useIntersectionObverser from '@/hooks/useIntersecionObserver';
import Loader from '@/Components/Loader';
import SearchFilter from '@/Components/SearchFilter';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { searchState } from '@/atom';

export default function StoreListPage() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObverser(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const searchValue = useRecoilValue(searchState);

  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
  };

  // const {
  //   isLoading,
  //   isError,
  //   data: stores,
  // } = useQuery(`stores-${page}`, async () => {
  //   const { data } = await axios(`/api/stores?page=${page}`);
  //   return data as StoreApiResponse;
  // });

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/stores?page=' + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });

    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(['stores', searchParams], fetchStores, {
    getNextPageParam: (lastPage: any) => (lastPage.data?.length > 0 ? lastPage.page + 1 : undefined),
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, fetchNextPage, hasNextPage, isPageEnd]);

  if (isError) {
    return (
      <div
        className="
      w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold"
      >
        다시 시도해주세요.
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreType, i: number) => (
                <li
                  className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-50"
                  key={i}
                  onClick={() => router.push(`/stores/${store.id}`)}
                >
                  <div className="flex gap-x-4">
                    <Image
                      src={store?.category ? `/images/markers/${store?.category}.png` : `/images/markers/default.png`}
                      width={48}
                      height={48}
                      alt="아이콘이미지"
                    />
                    <div>
                      <div className="text-sm font-semibold leading-9 text-gray-900">{store?.name}</div>
                      <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                        {store?.storeType}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm font-semibold leading-9 text-gray-900">{store?.address}</div>
                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                      {store?.phone || '번호없음'} | {store?.foodCertifyName} | {''}
                      {store?.category === 'default' ? '기타' : store?.category}
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>

      {/* {stores?.totalPage && <Pagination total={stores?.totalPage} page={page} />} */}

      {/* <button type="button" onClick={() => fetchNextPage()}>
        Next Page
      </button> */}

      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}
