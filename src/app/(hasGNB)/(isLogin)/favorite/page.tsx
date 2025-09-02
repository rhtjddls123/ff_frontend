import React from 'react';
import { Header } from '@/components/common';
import Footer from '@/components/common/Footer/Footer';
import { FavoriteTabContainer } from '@/components/pages/favorite';
import { ScrollArea } from '@/components/ui/scroll-area';
const FavoritePage = () => (
  <>
    <Header title='위시리스트' />
    <ScrollArea className='h-[calc(100dvh-124px)] md:h-[calc(100dvh-70px)]'>
      <div className='mx-auto min-h-[calc(100dvh-124px)] w-screen max-w-[1200px] md:min-h-[calc(100dvh-119px)]'>
        <FavoriteTabContainer />
      </div>
      <Footer />
    </ScrollArea>
  </>
);

export default FavoritePage;
