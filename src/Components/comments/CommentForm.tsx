import { event } from '@/lib/gtag';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CommentFormProps {
  storeId: number;
  refetch: () => void;
}

export default function CommentForm({ storeId, refetch }: CommentFormProps) {
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  return (
    <form
      className="flex flex-col space-y-2"
      onSubmit={handleSubmit(async data => {
        const result = await axios.post('/api/comments', {
          ...data,
          storeId,
        });

        if (result.status === 200) {
          toast.success('댓글을 등록했습니다.');
          resetField('body');
          refetch?.();
        } else {
          toast.error('다시 시도해주세요.');
        }
        event({
          action: 'comment',
          category: 'comment',
          label: result.status === 20 ? 'comment_create' : 'error',
          value: storeId,
        });
      })}
    >
      <textarea
        rows={3}
        placeholder="댓글을 작성해주세요."
        {...register('body', { required: true })}
        className="block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm leading-6 focus:border-blue-600 focus:border-2 outline-none"
      />
      <div className="flex">
        {errors?.body?.type === 'required' && (
          <div className="px-2 text-xs text-red-600 mt-2">필수 입력사항입니다.</div>
        )}
        <button
          type="submit"
          className=" bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm rounded-md mt-2 ml-auto"
        >
          작성하기
        </button>
      </div>
    </form>
  );
}
