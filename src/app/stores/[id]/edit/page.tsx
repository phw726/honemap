'use client';

import AddressSearch from '@/Components/AddressSearch';
import Loader from '@/Components/Loader';
import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from '@/data/store';
import { StoreType } from '@/interface';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

export default function StoreEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params?.id;

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreType;
  };
  const {
    data: store,
    isFetching,
    isSuccess,
    isError,
  } = useQuery(`store-${id}`, fetchStore, {
    onSuccess: data => {
      setValue('id', data.id);
      setValue('name', data.name);
      setValue('phone', data.phone);
      setValue('lat', data.lat);
      setValue('lng', data.lng);
      setValue('address', data.address);
      setValue('foodCertifyName', data.foodCertifyName);
      setValue('storeType', data.storeType);
      setValue('category', data.category);
    },
    refetchOnWindowFocus: false,
  });

  // console.log(store);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StoreType>();

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

  if (isFetching) {
    return <Loader className="mt-[20%]" />;
  }

  return (
    <form
      className="px-4 md:max-w-4xl mx-auto py-8"
      onSubmit={handleSubmit(async data => {
        try {
          const result = await axios.put('/api/stores', data);

          if (result.status === 200) {
            //성공케이스
            toast.success('성공적으로 등록되었습니다.');
            router.replace(`/stores/${result?.data?.id}`);
          } else {
            //실패케이스
            toast.error('다시 시도해주세요.');
          }
        } catch (e) {
          console.log(e);
          toast.error('다시 시도해주세요.');
        }
      })}
    >
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">맛집 정보 수정</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">아래 내용을 입력해서 맛집을 수정해주세요.</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              가게명{' '}
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('name', { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none px-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.name?.type === 'required' && (
                <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
              카테고리
            </label>
            <div className="mt-2">
              <select
                {...register('category', { required: true })}
                className="outline-none px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">카테고리 선택</option>
                {CATEGORY_ARR?.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors?.category?.type === 'required' && (
                <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
              )}
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              전화번호
            </label>
            <div className="mt-2">
              <input
                {...register('phone', { required: true })}
                className="outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.phone?.type === 'required' && (
                <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
              )}
            </div>
          </div>

          <div className="col-span-full">
            <AddressSearch setValue={setValue} register={register} errors={errors} />
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor="foodCertifyName" className="block text-sm font-medium leading-6 text-gray-900">
              식품인증구분
            </label>
            <div className="mt-2">
              <select
                {...register('foodCertifyName', { required: true })}
                className="outline-none px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">식품인증구분 선택</option>
                {FOOD_CERTIFY_ARR?.map(data => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {errors?.foodCertifyName?.type === 'required' && (
                <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="storeType" className="block text-sm font-medium leading-6 text-gray-900">
              업종구분
            </label>
            <div className="mt-2">
              <select
                {...register('storeType', { required: true })}
                className="outline-none px-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">업종구분 선택</option>
                {STORE_TYPE_ARR?.map(data => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {errors?.storeType?.type === 'required' && (
                <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 "
        >
          뒤로가기
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          수정하기
        </button>
      </div>
    </form>
  );
}
