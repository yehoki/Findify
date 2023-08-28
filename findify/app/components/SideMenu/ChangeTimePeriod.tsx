'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

interface ChangeTimePeriodProps {}

const ChangeTimePeriod: React.FC<ChangeTimePeriodProps> = ({}) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const changeTimePeriod = () => {};
  return <div></div>;
};

export default ChangeTimePeriod;
