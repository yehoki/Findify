'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useState } from 'react';

interface TimePeriodSwitchProps {}

export type TimePeriod = 'short_term' | 'medium_term' | 'long_term';

const TimePeriodSwitch: React.FC<TimePeriodSwitchProps> = ({}) => {
  const searchParams = useSearchParams();
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod>('medium_term');
  const router = useRouter();
  useEffect(() => {
    const timePeriod = searchParams.get('tp');
    if (
      timePeriod &&
      (timePeriod === 'short_term' ||
        timePeriod === 'medium_term' ||
        timePeriod === 'long_term')
    ) {
      setCurrentPeriod(timePeriod);
    } else {
      setCurrentPeriod('medium_term');
    }
  }, [router]);
  return (
    <div className="flex items-center justify-center">
      <ul className="flex">
        <li>4 weeks</li>
        <li>6 months</li>
        <li>lifetime</li>
      </ul>
    </div>
  );
};

export default TimePeriodSwitch;
