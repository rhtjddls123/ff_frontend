'use client';

import { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import WritableReviews from './WritableReviews';
import WrittenReviews from './WrittenReviews';

const tabs = ['작성 가능한 리뷰', '작성한 리뷰'];

const ReviewTabs = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div className='mx-auto h-[calc(100dvh-44px)] max-w-[1200px] md:h-[calc(100dvh-70px)]'>
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <ScrollArea className='h-[calc(100dvh-173px)] p-4 md:h-[calc(100dvh-119px)]'>
        <div className='max-w-[calc(100dvw-32px)]'>
          {selectedTab === '작성 가능한 리뷰' && <WritableReviews />}
          {selectedTab === '작성한 리뷰' && <WrittenReviews />}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ReviewTabs;
