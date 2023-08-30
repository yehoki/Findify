'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TimePeriodSwitchProps {
  timePeriodParam: TimePeriod | '';
}

export type TimePeriod = 'short_term' | 'medium_term' | 'long_term';

const TimePeriodSwitch: React.FC<TimePeriodSwitchProps> = ({
  timePeriodParam,
}) => {
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod>(
    timePeriodParam !== '' ? timePeriodParam : 'medium_term'
  );
  const router = useRouter();

  const handleChangePeriod = (period: TimePeriod) => {
    setCurrentPeriod(period);
    return router.push(`/?tp=${period}`);
  };

  return (
    <div className="flex items-center justify-center md:justify-end mb-8">
      <ul className="flex bg-spotifyGray rounded-md  items-center justify-center">
        <li
          onClick={() => handleChangePeriod('short_term')}
          className={`px-4 py-2 rounded-md cursor-pointer text-white font-semibold
        ${
          currentPeriod === 'short_term'
            ? 'bg-spotifyGreen'
            : 'hover:bg-spotifyGreen/75'
        }
       transition
        `}
        >
          4 weeks
        </li>
        <li
          onClick={() => handleChangePeriod('medium_term')}
          className={`px-4 py-2 rounded-md cursor-pointer text-white font-semibold
        ${
          currentPeriod === 'medium_term'
            ? 'bg-spotifyGreen'
            : 'hover:bg-spotifyGreen/75'
        }
          transition
        `}
        >
          6 months
        </li>
        <li
          onClick={() => handleChangePeriod('long_term')}
          className={`px-4 py-2 rounded-md cursor-pointer text-white font-semibold
        ${
          currentPeriod === 'long_term'
            ? 'bg-spotifyGreen'
            : 'hover:bg-spotifyGreen/75'
        }
         transition
        `}
        >
          lifetime
        </li>
      </ul>
    </div>
  );
};

export default TimePeriodSwitch;
