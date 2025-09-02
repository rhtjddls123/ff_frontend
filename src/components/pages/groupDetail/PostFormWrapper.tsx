'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toast } from '@/components/common';
import DetailHeader from '@/components/common/DetailHeader/DetailHeader';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { useImageUploader } from '@/hooks';
import { useCreatePost } from '@/hooks/postHooks/postHook';
import { useUploadMultipleFiles } from '@/hooks/useGetPresignedUrl/useGetPresignedUrl';
import { hasProfanity } from '@/lib/utils';
import PinCheckbox from './PinCheckbox/PinCheckbox';
import PostImageUploader from './PostImageUploader/PostImageUploader';

const MAX_TEXTAREA_ROWS = 33;
const MAX_TEXTAREA_LENGTH = 500;

const PostFormWrapper = () => {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isValidText, setIsValidText] = useState(true);
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: uploadMultipleFiles } = useUploadMultipleFiles();
  const groupId = params?.groupId as string;
  const [isPinned, setIsPinned] = useState(false);
  const { upload, images: uploadedImages, remove } = useImageUploader('multi');
  const [message, setMessage] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => content.length > 0 && isValidText,
    [content, isValidText]
  );

  const handleChange = (value: string) => {
    setContent(value);
    setIsValidText(!hasProfanity(value));
  };

  const handleToastClose = () => {
    setMessage(null);
  };

  const handleSubmit = async () => {
    try {
      let imageUrls: string[] = [];

      if (uploadedImages.length > 0) {
        const files = uploadedImages.map((img) => img.file);
        imageUrls = await uploadMultipleFiles(files);
      }

      const imageObjects = uploadedImages.map((img, idx) => ({
        alt: img.file.name,
        src: imageUrls[idx],
      }));

      const res = await createPost({
        groupId,
        content,
        isPinned,
        images: imageObjects,
      });

      if ((res.data as { result: boolean }).result === true) {
        router.push(`/groups/${groupId}`);
      }
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setMessage((error as { message: string }).message);
      } else {
        setMessage('게시글 작성 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePinClick = () => {
    setIsPinned((prev) => !prev);
  };

  return (
    <div className='mx-auto h-dvh max-w-[1200px] md:h-[calc(100dvh-70px)]'>
      <DetailHeader
        title='게시글 작성'
        hasRightText='등록'
        onRightClick={handleSubmit}
        rightDisabled={!canSubmit}
      />

      <div className='relative flex h-[calc(100%-61.6px)] flex-col'>
        <PinCheckbox
          isPinned={isPinned}
          onClick={handlePinClick}
        />
        <TextareaInput
          value={content}
          onChange={handleChange}
          maxLength={MAX_TEXTAREA_LENGTH}
          rows={MAX_TEXTAREA_ROWS}
          className='border-none px-4 py-5 text-16_M placeholder:text-gray-400'
          hasBorder={false}
          isValidText={isValidText}
          showLength={false}
          placeholder='내용을 입력해 주세요'
          showToast={true}
          showWarning={false}
        />
      </div>

      <div className='fixed bottom-0 left-1/2 w-full max-w-[1200px] -translate-x-1/2'>
        <PostImageUploader
          images={uploadedImages}
          onImageUpload={upload}
          onImageRemove={remove}
        />
      </div>

      {message && (
        <Toast
          message={message}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default PostFormWrapper;
