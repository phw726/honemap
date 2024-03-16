'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Loading from '@/Components/Loading';
import { StoreType } from '@/interface';
import axios from 'axios';

import { useInfiniteQuery } from 'react-query';
import useIntersectionObverser from '@/hooks/useIntersecionObserver';
import Loader from '@/Components/Loader';
import SearchFilter from '@/Components/SearchFilter';
import { useRecoilValue } from 'recoil';
import { searchState } from '@/atom';
import StoreMyList from '@/Components/StoreMyList';

export default function StoreListPage() {
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
                <StoreMyList store={store} i={i} key={i} />
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
