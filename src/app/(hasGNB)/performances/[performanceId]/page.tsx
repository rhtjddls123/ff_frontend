import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import { Wrapper } from '@/components/pages/performanceDetail';
import { ScrollArea } from '@/components/ui/scroll-area';

type PerformanceDetailPageProps = {
  params: Promise<{ performanceId: string }>;
};

const PerformanceDetailPage = async ({
  params,
}: PerformanceDetailPageProps) => {
  const { performanceId } = await params;

  return (
    <div>
      <Header title='공연 정보' />
      <ScrollArea className='h-[calc(100dvh-124px)] md:h-[calc(100dvh-70px)]'>
        <div className='mx-auto w-screen max-w-[1200px]'>
          <Wrapper performanceId={performanceId} />
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
};

export default PerformanceDetailPage;
