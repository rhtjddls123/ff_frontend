import { Header } from '@/components/common';
import MyPageMain from '@/components/pages/myPage/myPageMain';
import { ScrollArea } from '@/components/ui/scroll-area';

const MyProfilePage = () => (
  <>
    <Header title='마이페이지' />
    <ScrollArea className='h-[calc(100dvh-124px)] md:h-[calc(100dvh-70px)]'>
      <div className='mx-auto w-screen max-w-[1200px]'>
        <MyPageMain />
      </div>
    </ScrollArea>
  </>
);

export default MyProfilePage;
