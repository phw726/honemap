import AddressSearch from '@/Components/AddressSearch';
import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from '@/data/store';
import { StoreType } from '@/interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function StoreNewPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StoreType>();

  return (
    <form
      className="px-4 md:max-w-4xl mx-auto py-8"
      onSubmit={handleSubmit(async data => {
        try {
          const result = await axios.post('/api/stores', data);

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
        <h2 className="text-base font-semibold leading-7 text-gray-900">맛집 등록</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">아래 내용을 입력해서 맛집을 등록해주세요.</p>

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
          제출하기
        </button>
      </div>
    </form>
  );
}
