import { AiOutlineGoogle } from 'react-icons/ai';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginPage() {
  const { status, data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh]">
      <div className="mx-auto w-full max-w-sm">
        <div className="text-blue-800 text-center text-2xl font-semibold italic mb-10 mt-5">HONEMAP</div>
        <div className="text-center mt-6 text-2xl font-bold text-gray-600">SNS 계정으로 간편하게 로그인</div>
        <p className="mt-2 text-center text-sm text-gray-600">계정이 없을 경우 자동으로 회원가입이 진행됩니다.</p>
      </div>

      <div className="mt-10 mx-auto w-full max-w-sm">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="text-white flex gap-4 bg-[#4285f4] hover:bg-[#4285f4]/80 font-bold 
            rounded-lg w-full px-5 py-4 text-center justify-center items-center"
          >
            <AiOutlineGoogle className="w-6 h-6" />
            SignIn With Google
          </button>
          <button
            type="button"
            onClick={() => signIn('naver', { callbackUrl: '/' })}
            className="text-white flex gap-5 bg-[#2db400] hover:bg-[#2db400]/80 font-bold 
            rounded-lg w-full px-5 py-4 text-center justify-center items-center"
          >
            <SiNaver className="w-4 h-4" />
            SignIn With Naver
          </button>
          <button
            type="button"
            onClick={() => signIn('kakao', { callbackUrl: '/' })}
            className="text-black flex gap-4 bg-[#fef01b] hover:bg-[#fef01b]/80 font-bold 
            rounded-lg w-full px-5 py-4 text-center justify-center items-center"
          >
            <RiKakaoTalkFill className="w-6 h-6" />
            SignIn With Kakao
          </button>
        </div>
      </div>
    </div>
  );
}
