import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import Menu from './components/Menu/Menu';
import TrackRecommendations from './components/tracks/Recommendations/TrackRecommendations';
import MobileMenuModal from './components/modals/MobileMenuModal';
import MobileMenuProvider from './providers/MobileMenuProvider';
import getUserSession from './actions/user/getUserSession';
import Link from 'next/link';

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Findify',
  description: 'Find your Spotify stats',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  return (
    <html lang="en">
      <body className={`${lato.className} bg-black`}>
        <MobileMenuProvider>
          <MobileMenuModal session={session} />
        </MobileMenuProvider>
        <main
          className="text-spotifyGreen
        w-full
        h-full
      md:p-2
      flex flex-col
      md:grid
      grid-rows-16
      grid-cols-12
      md:gap-2
      "
        >
          <section
            className="hidden md:block col-span-4 lg:col-span-3 2xl:col-span-2 row-span-2
          bg-spotifyBlackBase md:rounded-lg
        "
          >
            <Menu />
          </section>
          <section
            className="bg-spotifyBlackBase
        row-start-3 row-end-[17]
  col-span-4 lg:col-span-3 2xl:col-span-2 md:rounded-lg
  hidden md:block
  overflow-y-hidden
        "
          >
            <div
              className="px-2 py1- mt-4 mx-2 rounded-md 
            hover:bg-[#1a1a1a] transition duration-300 group"
            >
              <Link
                href="/playlists"
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-lg text-white font-semibold whitespace-nowrap">
                    Playlists
                  </p>
                </div>
              </Link>
            </div>

            <TrackRecommendations session={session} />
          </section>
          <section
            className="bg-spotifyBlackBase
          h-full
          col-span-8 lg:col-span-9 2xl:col-span-10 row-span-full
          md:rounded-lg md:p-4
          overflow-x-hidden"
          >
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
