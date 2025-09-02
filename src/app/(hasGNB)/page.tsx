import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import MainBanner from '@/components/pages/main/MainBanner';
import MainNavigate from '@/components/pages/main/MainNavigate';
import MainRecentReviews from '@/components/pages/main/MainRecentReviews';
import MainTopFavoritesPerformances from '@/components/pages/main/MainTopFavoritesPerformances';
import MainTopGroupsPerformances from '@/components/pages/main/MainTopGroupsPerformances';
import { ScrollArea } from '@/components/ui/scroll-area';

const Home = async () => (
  <div className='flex flex-col bg-[#edeef2]'>
    <Header />
    <ScrollArea className='h-[calc(100dvh-124px)] md:h-[calc(100dvh-70px)]'>
      <div className='mx-auto mt-2.5 flex w-screen max-w-[1200px] flex-col gap-2.5 bg-[#edeef2]'>
        <MainBanner />
        <MainNavigate />
        <MainTopFavoritesPerformances />
        <MainTopGroupsPerformances />
        <MainRecentReviews />
      </div>
      <Footer />
    </ScrollArea>
  </div>
);

export default Home;
