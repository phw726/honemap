import { StoreType } from '@/interface';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useState } from 'react';

interface AddressProps {
  setValue: UseFormSetValue<StoreType>;
  register: UseFormRegister<StoreType>;
  errors: FieldErrors<StoreType>;
}

export default function AddressSearch({ register, errors, setValue }: AddressProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    setValue('address', fullAddress);
    setIsOpen(false);
  };
  return (
    <>
      <div>
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
          주소
        </label>
        <div className="mt-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <input
              disabled
              placeholder="주소를 검색해주세요."
              {...register('address', { required: true })}
              className="col-span-2 outline-none px-2 block w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              className="font-semibold bg-indigo-600 hover:bg-indigo-500 py-1.5 px-2 rounded text-white"
              onClick={() => setIsOpen(val => !val)}
            >
              주소검색
            </button>
          </div>

          {errors?.address?.type === 'required' && (
            <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="border border-gray-300 w-full col-span-full md:col-span-3 rounded-md p-2 ">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}
