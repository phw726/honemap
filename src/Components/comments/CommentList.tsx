/* eslint-disable @next/next/no-img-element */
import { CommentApiResponse } from '@/interface';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface CommentListProps {
  comments?: CommentApiResponse;
  displayStore?: boolean;
  // createdAt?: Date;
}

export default function CommentList({ comments, displayStore }: CommentListProps) {
  const { data: session } = useSession();

  const handleDeleteComment = async (id: number) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');

    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments?id=${id}`);
        if (result.status === 200) {
          toast.success('성공적으로 삭제했습니다.');
        } else {
          toast.error('다시 시도해주세요.');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="my-10">
      {comments?.data && comments?.data?.length > 0 ? (
        comments?.data?.map(comment => (
          <div key={comment.id} className="flex items-center border-b border-gray-200 space-x-4 text-sm text-gray-500">
            <div>
              <img
                src={comment?.user?.image || '/images/markers/default.png'}
                width={40}
                height={40}
                className="rounded-full bg-gray-10 h-10 w-10  items-center"
                alt="profile image"
              />
            </div>

            <div className="flex flex-col space-y-1 flex-1">
              <div>
                <div className="flex mt-5 ">
                  {comment?.user?.name ? (
                    <p className="mr-2">{comment.user.name}</p>
                  ) : (
                    <p className="mr-2">USER{comment?.user?.id}</p>
                  )}

                  {comment?.user?.email ? (
                    comment.user.email
                  ) : (
                    <p className="mr-2">USER{comment?.user?.id}@kakao.com</p>
                  )}

                  <div className="text-xs mt-1 ml-auto">
                    {comment?.createdAt &&
                      new Date(comment.createdAt).toLocaleDateString('ko', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                  </div>

                  <div className="block">
                    {comment.userId === session?.user.id && (
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteComment(comment.id);
                        }}
                        className="underline text-gray-400 hover:text-gray-300 ml-4"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-black justify-items-center mt-1 pb-4 text-base ">
                <p className="mb-2 mt-1">{comment.body}</p>

                {displayStore && comment.store && (
                  <div>
                    <Link
                      href={`/stores/${comment.store.id}`}
                      className="text-blue-700 hover:text-blue-500 underline text-sm mt-2 "
                    >
                      {comment.store.name}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">댓글이 없습니다.</div>
      )}
    </div>
  );
}
