'use client';

import Login from '../Login';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <header className="h-1/6 text-spotifyGreen p-2 pb-0">
      <section
        className="bg-spotifyBlack text-spotifyGreen
    rounded-lg h-full
    "
      >
        Login & Nav
        <Login isLoggedIn={isLoggedIn} />
      </section>
    </header>
  );
};

export default Header;
