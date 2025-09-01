'use client';

import { PerformanceCard } from '@/components/common';
import { Performance } from '@/types/performance';

interface Props {
  performances: Performance[];
}

const PerformanceList = ({ performances }: Props) => (
  <>
    <div className='mx-auto grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] justify-items-center gap-x-4 gap-y-7 px-4 md:justify-start'>
      {performances.map((performance) => (
        <PerformanceCard
          performance={performance}
          key={performance.id}
        />
      ))}
    </div>
  </>
);

export default PerformanceList;
