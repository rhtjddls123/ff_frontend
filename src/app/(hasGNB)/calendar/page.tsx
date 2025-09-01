import Footer from '@/components/common/Footer/Footer';
import PerformanceCalendarPage from '@/components/pages/PerformanceCalendar/PerformanceCalendarPage';
import { ScrollArea } from '@/components/ui/scroll-area';
const CalendarPage = () => (
  <>
    <ScrollArea className='flex h-[calc(100dvh-80px)] items-start justify-center md:h-[calc(100dvh-70px)]'>
      <div className='mx-auto w-screen max-w-[1200px]'>
        <PerformanceCalendarPage />
      </div>
      <Footer />
    </ScrollArea>
  </>
);

export default CalendarPage;
