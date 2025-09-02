'use client';

import {
  FormEvent,
  InputHTMLAttributes,
  PropsWithChildren,
  Ref,
  useState,
} from 'react';
import { DeleteIcon } from '@/components/icons';
import SearchIcon from '@/components/icons/SearchIcon';
import { cn } from '@/lib/utils';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement | null>;
  onSubmit: () => void;
  onDelete?: () => void;
}

const SearchInput = ({
  onSubmit,
  children,
  ref,
  onDelete,
  ...props
}: PropsWithChildren<SearchInputProps>) => {
  const [focused, setFocused] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex w-full items-center gap-2 rounded-[100px] bg-gray-25 px-3 py-1.5 focus-within:border focus-within:border-gray-700 focus:border focus:border-gray-700'
    >
      <button
        type='submit'
        className='cursor-pointer'
        onClick={() => {
          onSubmit();
        }}
      >
        <SearchIcon className='text-gray-500' />
      </button>
      <input
        ref={ref}
        aria-label='검색어 입력'
        role='searchbox'
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <button
        type='button'
        onClick={onDelete}
      >
        <DeleteIcon className={cn('size-5', !focused && 'opacity-0')} />
      </button>
      {children && <button type='submit'>{children}</button>}
    </form>
  );
};

export default SearchInput;
