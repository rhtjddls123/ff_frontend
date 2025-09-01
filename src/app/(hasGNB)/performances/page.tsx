import { Header } from '@/components/common';
import Footer from '@/components/common/Footer/Footer';
import {
  PerformanceListContainer,
  DraggableSortOptions,
} from '@/components/pages/performances';
import { ScrollArea } from '@/components/ui/scroll-area';

const PerformancesPage = () => (
  <div className='flex flex-col'>
    <>
      <Header title='공연 목록' />
      <DraggableSortOptions />
    </>
    <ScrollArea className='h-[calc(100dvh-202.6px)] md:h-[calc(100dvh-148.6px)]'>
      <div className='mx-auto w-screen max-w-[1200px] pb-4'>
        <PerformanceListContainer />
      </div>
      <Footer />
    </ScrollArea>
  </div>
);

export default PerformancesPage;
