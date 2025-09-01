'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useIsMobile } from '@/hooks';

const NAV_ITEMS = [
  { id: 1, label: '캘린더', link: '/calendar', icon: '/icons/calander.png' },
  {
    id: 2,
    label: '국내 공연',
    link: '/performances?visit=국내&isExpired=false',
    icon: '/icons/taegeukgi.png',
  },
  {
    id: 3,
    label: '내한 공연',
    link: '/performances?isExpired=false&visit=내한',
    icon: '/icons/airplane.png',
  },
  { id: 4, label: '페스티벌', link: '/performances', icon: '/icons/music.png' },
  { id: 5, label: '찜한 공연', link: '/favorite', icon: '/icons/heart.png' },
  {
    id: 6,
    label: '나의 모임',
    link: '/groups/managements',
    icon: '/icons/mygroup.png',
  },
];

const MainNavigate = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <ul className='flex justify-between bg-white px-4'>
      {NAV_ITEMS.map(({ id, label, link, icon }) => (
        <Link
          key={id}
          href={link}
          className='mr-6 flex h-[140px] basis-1/6 flex-col justify-between rounded-[20px] bg-gray-25 p-[30px] last:mr-0'
        >
          <Image
            src={icon}
            alt={label}
            width={24}
            height={24}
          />
          <span className='text-16_B'>{label}</span>
        </Link>
      ))}
    </ul>
  );
};

export default MainNavigate;
