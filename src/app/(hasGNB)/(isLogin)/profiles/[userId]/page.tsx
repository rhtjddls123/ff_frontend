import Header from '@/components/common/Header/Header';
import ClientProfileWrapper from '@/components/pages/profiles/ClientProfileWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PageProps {
  params: Promise<{ userId: string }>;
}

const OtherProfilePage = async ({ params }: PageProps) => {
  const { userId } = await params;
  return (
    <>
      <Header />
      <ScrollArea className='h-[calc(100dvh-124px)] md:h-[calc(100dvh-70px)]'>
        <div className='mx-auto w-screen max-w-[1200px]'>
          <ClientProfileWrapper userId={userId} />
        </div>
      </ScrollArea>
    </>
  );
};

export default OtherProfilePage;
