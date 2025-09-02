'use client';

import { FileTextIcon, HelpCircleIcon, Star, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProfileCard } from '@/components/common';
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalTrigger,
} from '@/components/common/Modal';
import { UserIcon } from '@/components/icons';
import EditIcon from '@/components/icons/EditIcon';
import NoteIcon from '@/components/icons/NoteIcon';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks';
import { useLogout, useWithdraw } from '@/hooks/useAuth/useAuth';
import { useMyProfile } from '@/hooks/useMyProfile/useMyProfile';
import PrivacyPolicyContent from './legal/PrivacyPolicyContent';
import TermsContent from './legal/TermsContent';
import MyPageButtonGroup from './MyPageButtonGroup';
import MyPageMenuList from './MyPageMenuList';

const MyPageMain = () => {
  const { data: profile } = useMyProfile();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { mutateAsync: withdraw, isPending: isWithdrawing } = useWithdraw();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const handleWithdraw = async () => {
    if (isWithdrawing) return;
    await withdraw();
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    await logout();
  };

  if (!profile) return null;

  const genderLabel =
    profile.gender === 'FEMALE'
      ? '여성'
      : profile.gender === 'MALE'
        ? '남성'
        : '';

  if (isMobile)
    return (
      <main className='flex flex-col items-center px-[16px] pt-[20px]'>
        <div className='w-full max-w-md'>
          <ProfileCard
            profile={profile}
            onEditClick={() => {
              router.push('/profiles/me/edit');
            }}
            me
          />
        </div>

        <MyPageButtonGroup />

        <MyPageMenuList />
      </main>
    );

  if (!isMobile)
    return (
      <main className='flex justify-center gap-4 p-4'>
        <div className='flex w-60 flex-col items-center gap-4 p-4'>
          <Link
            href={`/profiles/me`}
            className='shrink-0'
          >
            <Avatar className='size-16'>
              <AvatarImage
                src={profile.profileImage?.src}
                alt={profile.profileImage?.alt}
                className='h-full w-full object-cover'
              />
            </Avatar>{' '}
          </Link>

          <div className='flex flex-col items-center gap-3'>
            <div className='flex items-end gap-1'>
              <Link
                href={`/profiles/me`}
                className='h-[19.2px]'
              >
                <span className='text-16_B text-gray-950 hover:underline'>
                  {profile.name}
                </span>
              </Link>

              <Link href='/profiles/me/edit'>
                <EditIcon className='h-4 w-4 text-gray-600 hover:text-gray-400' />
              </Link>
            </div>

            <span className='flex items-center gap-[1px] text-12_M text-gray-700'>
              <Star
                className='h-[12px] w-[12px] text-yellow-500'
                fill='currentColor'
              />
              {profile.rating.toFixed(1)}
            </span>

            <p className='text-13_M text-gray-700'>
              {genderLabel} | {profile.age}세
            </p>
          </div>

          <div className='mt-2 flex flex-col gap-3'>
            <button
              onClick={handleWithdraw}
              className='cursor-pointer rounded-[8px] border border-gray-50 px-4 py-2 hover:bg-gray-100/40'
            >
              회원 탈퇴
            </button>
            <button
              onClick={handleLogout}
              className='cursor-pointer rounded-[8px] border border-gray-50 px-4 py-2 hover:bg-gray-100/40'
            >
              로그아웃
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-4 p-4'>
          <h2 className='text-24_B'>마이페이지</h2>

          <div className='grid grid-cols-3 gap-4'>
            <Link
              href='/favorite?tab=찜한 유저'
              className='flex h-[86px] flex-col items-center justify-center rounded-[12px] bg-gray-25 px-[30px] py-[20px] hover:bg-gray-50/80'
            >
              <UserIcon className='text-gray-400' />
              <span className='mt-[8px] text-14_B font-medium text-gray-950'>
                찜한 유저
              </span>
            </Link>

            <Link
              href='/favorite?tab=찜한 공연'
              className='flex h-[86px] flex-col items-center justify-center rounded-[12px] bg-gray-25 px-[30px] py-[20px] hover:bg-gray-50/80'
            >
              <NoteIcon className='text-gray-400' />
              <span className='mt-[8px] text-14_B font-medium text-gray-950'>
                찜한 공연
              </span>
            </Link>

            <Link
              href='https://pf.kakao.com/_zkjan/chat'
              target='_blank'
              rel='noopener noreferrer'
              className='flex h-[86px] flex-col items-center justify-center rounded-[12px] bg-gray-25 px-[30px] py-[20px] hover:bg-gray-50/80'
            >
              <HelpCircleIcon className='text-gray-400' />
              <span className='mt-[8px] text-14_B font-medium text-gray-950'>
                1:1 문의
              </span>
            </Link>

            <Modal>
              <ModalTrigger>
                <button className='flex h-[86px] cursor-pointer flex-col items-center justify-center rounded-[12px] bg-gray-25 px-[30px] py-[20px] hover:bg-gray-50/80'>
                  <FileTextIcon className='text-gray-400' />
                  <span className='mt-[8px] text-14_B font-medium text-gray-950'>
                    약관 및 정책
                  </span>
                </button>
              </ModalTrigger>
              <ModalContent className='max-h-[80vh] w-[90vw] max-w-2xl overflow-y-auto rounded-xl bg-white p-6 text-sm leading-relaxed shadow-xl'>
                <ModalClose />
                <TermsContent />
                <div className='my-6 border-t' />
                <PrivacyPolicyContent />
                <p className='text-10_M mt-6 text-gray-500'>
                  본 정책은 2025년 6월 1일부터 적용됩니다.
                </p>
              </ModalContent>
            </Modal>

            <Link
              href='/reviews/managements'
              className='flex h-[86px] flex-col items-center justify-center rounded-[12px] bg-gray-25 px-[30px] py-[20px] hover:bg-gray-50/80'
            >
              <StarIcon className='text-gray-400' />
              <span className='mt-[8px] text-14_B font-medium text-gray-950'>
                리뷰 관리
              </span>
            </Link>
          </div>
        </div>
      </main>
    );
};

export default MyPageMain;
