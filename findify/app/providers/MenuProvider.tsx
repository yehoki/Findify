'use client';

import { store } from '../store/store';
import { Provider } from 'react-redux';

interface MenuProviderProps {
  children: React.ReactNode;
}

const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MenuProvider;
