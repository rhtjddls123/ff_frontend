import React from 'react';
import { useRouter } from 'next/navigation';
import XIcon from '@/components/icons/XIcon';

interface DetailHeaderProps {
  hasLeftIcon?: React.ReactNode;
  hasLeftText?: string;
  hasRightIcon?: React.ReactNode;
  hasRightText?: string;
  title?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  rightDisabled?: boolean;
}

const DetailHeader = ({
  hasLeftIcon = <XIcon />,
  hasLeftText,
  hasRightIcon,
  hasRightText,
  title,
  onLeftClick,
  onRightClick,
  rightDisabled,
}: DetailHeaderProps) => {
  const router = useRouter();

  const handleLeftClick = onLeftClick || (() => router.back());

  return (
    <>
      <header className='fixed top-0 left-1/2 z-50 flex h-11 w-full max-w-[1200px] -translate-x-1/2 items-center justify-between border-b border-gray-50 bg-white p-4 text-black md:h-[70px]'>
        <div className='flex items-center justify-start gap-0.5'>
          {hasLeftIcon && (
            <button
              onClick={handleLeftClick}
              className='flex items-center'
            >
              {hasLeftIcon}
            </button>
          )}
          {hasLeftText && <span className='text-14_B'>{hasLeftText}</span>}
        </div>
        <h1 className='text-center text-16_B'>{title}</h1>
        <div className='flex items-center justify-end gap-0.5'>
          {hasRightIcon && (
            <button
              onClick={onRightClick}
              className='flex items-center'
              disabled={rightDisabled}
            >
              {hasRightIcon}
            </button>
          )}
          {hasRightText && (
            <button
              onClick={onRightClick}
              className='text-14_B'
              disabled={rightDisabled}
            >
              {hasRightText}
            </button>
          )}
        </div>
      </header>
      <div className='h-11 md:h-0' />
    </>
  );
};

export default DetailHeader;
