'use client';

import { store } from '../store/store';
import { Provider } from 'react-redux';

interface MobileMenuProviderProps {
  children: React.ReactNode;
}

const MobileMenuProvider: React.FC<MobileMenuProviderProps> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MobileMenuProvider;
