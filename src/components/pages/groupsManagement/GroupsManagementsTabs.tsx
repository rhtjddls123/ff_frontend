'use client';

import React, { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import Applications from './Applications';
import AppliedGroups from './AppliedGroups';
import JoinedGroups from './JoinedGroups';

const tabs = ['참가 중인 모임', '신청한 모임', '받은 신청서'];

const GroupsManagementsTabs = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <>
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <div className='mt-4'>
        {selectedTab === '참가 중인 모임' && <JoinedGroups />}
        {selectedTab === '신청한 모임' && <AppliedGroups />}
        {selectedTab === '받은 신청서' && <Applications />}
      </div>
    </>
  );
};

export default GroupsManagementsTabs;
