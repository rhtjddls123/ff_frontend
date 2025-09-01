'use client';

import { useIsMobile } from '@/hooks';

const Footer = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <footer className='w-full py-4 text-center text-sm text-gray-500'>
      copyright ⓒ 2025. <span className='font-semibold'>Team FF</span> All
      rights reserved.
    </footer>
  );
};

export default Footer;
