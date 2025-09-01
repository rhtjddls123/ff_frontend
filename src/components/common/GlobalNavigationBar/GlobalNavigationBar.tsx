'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Notification, SearchInput } from '@/components/common';
import LogoIcon from '@/components/icons/LogoIcon';
import { useIsMobile } from '@/hooks';
import { useLogin } from '@/hooks/useAuth/useAuth';
import { useAuthStore } from '@/providers/AuthStoreProvider';

const GlobalNavigationBar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { onLogin } = useLogin();
  const isMobile = useIsMobile();
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (isMobile) {
    return null;
  }

  const handleSubmit = () => {
    router.push(`/performances?title=${searchRef.current?.value}`);
  };

  return (
    <nav className='h-[70px] w-full'>
      <div className='mx-auto flex h-full max-w-[1200px] items-center justify-between px-5'>
        <div className='flex gap-5'>
          <Link href={'/'}>
            <LogoIcon className='aspect-square size-9 shrink-0 cursor-pointer' />
          </Link>
          {!isMobile && (
            <SearchInput
              type='text'
              ref={searchRef}
              placeholder='검색어를 입력하세요'
              className='h-[32px] w-full grow bg-transparent text-16_M outline-none'
              onSubmit={handleSubmit}
            />
          )}
        </div>
        {isLoggedIn && <Notification />}
        {!isLoggedIn && (
          <button
            onClick={onLogin}
            className={
              'flex h-[22px] w-[43px] cursor-pointer items-center justify-center rounded-[8px] bg-[#FFCCCF] px-1.5 py-1 md:h-10 md:w-20 md:rounded-full'
            }
          >
            <span className='flex h-[14px] items-center justify-center text-12_M whitespace-nowrap text-gray-950 md:text-16_M'>
              로그인
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default GlobalNavigationBar;
