import Header from '@/components/common/Header/Header';
import GroupsManagementsTabs from '@/components/pages/groupsManagement/GroupsManagementsTabs';
import { ScrollArea } from '@/components/ui/scroll-area';

const GroupsManagementsPage = () => (
  <>
    <Header title='나의 모임' />
    <ScrollArea className='h-[calc(100dvh-124px)] md:h-[calc(100dvh-70px)]'>
      <div className='mx-auto w-screen max-w-[1200px]'>
        <GroupsManagementsTabs />
      </div>
    </ScrollArea>
  </>
);

export default GroupsManagementsPage;
