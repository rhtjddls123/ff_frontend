import Header from '@/components/common/Header/Header';
import GroupWrapper from '@/components/pages/groupDetail/GroupWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';

type GroupDetailPageProps = {
  params: Promise<{ groupId: string }>;
};

const GroupDetailPage = async ({ params }: GroupDetailPageProps) => {
  const { groupId } = await params;

  return (
    <div>
      <Header />
      <ScrollArea className='h-[calc(100dvh-124px)] md:h-[calc(100dvh-70px)]'>
        <div className='mx-auto w-screen max-w-[1200px]'>
          <GroupWrapper groupId={groupId} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default GroupDetailPage;
