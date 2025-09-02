'use client';

import React, { useEffect, useRef } from 'react';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { LogOutIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Notification, SearchInput } from '@/components/common';
import { GroupIcon, LikeIcon, UserIcon } from '@/components/icons';
import LogoIcon from '@/components/icons/LogoIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks';
import { useLogin, useLogout } from '@/hooks/useAuth/useAuth';
import { getMyProfileQueryOptions } from '@/hooks/useMyProfile/useMyProfile';
import { useAuthStore } from '@/providers/AuthStoreProvider';

const PROFILE_NAV_ITEMS = [
  { label: '마이페이지', link: '/mypage', Icon: UserIcon },
  { label: '찜', link: '/favorite', Icon: LikeIcon },
  { label: '나의 모임', link: '/groups/managements', Icon: GroupIcon },
  { label: '리뷰 관리', link: '/reviews/managements', Icon: StarIcon },
  { label: '로그아웃', Icon: LogOutIcon },
];

const NavigationProfile = () => {
  const { mutateAsync, isPending } = useLogout();

  const handleLogout = async () => {
    if (isPending) return;
    await mutateAsync();
  };

  return (
    <div className='flex items-center gap-10'>
      <Notification />
      <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
        <Suspense fallback={<Skeleton className='h-[30px] w-[101px]' />}>
          <SuspenseQuery {...getMyProfileQueryOptions()}>
            {({ data }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <button className='flex items-center gap-2.5'>
                    <Avatar className='size-[30px]'>
                      <AvatarImage
                        src={data.profileImage?.src}
                        alt={data.profileImage?.alt}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='text-16_M'>{data.name}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='flex w-fit flex-col p-1'>
                  {PROFILE_NAV_ITEMS.map(({ label, link, Icon }) =>
                    link ? (
                      <Link
                        className='flex items-center gap-2 px-1.5 py-2'
                        href={link}
                        key={label}
                      >
                        <Icon className='size-4' />
                        {label}
                      </Link>
                    ) : (
                      <button
                        key={label}
                        onClick={handleLogout}
                        className='flex w-full cursor-pointer items-center gap-2 px-1.5 py-2 text-left'
                      >
                        <Icon className='size-4' />
                        {label}
                      </button>
                    )
                  )}
                </PopoverContent>
              </Popover>
            )}
          </SuspenseQuery>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const GlobalNavigationBar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { onLogin } = useLogin();
  const isMobile = useIsMobile();
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  const handleDelete = () => {
    if (searchRef.current) searchRef.current.value = '';
  };

  const handleSubmit = () => {
    router.push(`/performances?title=${searchRef.current?.value}`);
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = title || '';
    }
  }, [title]);

  if (isMobile) {
    return null;
  }

  return (
    <nav className='h-[70px] w-full'>
      <div className='mx-auto flex h-full max-w-[1200px] items-center justify-between px-5'>
        <div className='flex gap-5'>
          <Link href={'/'}>
            <LogoIcon className='aspect-square size-9 shrink-0 cursor-pointer' />
          </Link>
          <SearchInput
            ref={searchRef}
            placeholder='검색어를 입력하세요'
            className='h-[32px] w-full grow bg-transparent text-16_M outline-none'
            onSubmit={handleSubmit}
            onDelete={handleDelete}
          />
        </div>
        {isLoggedIn && <NavigationProfile />}
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
