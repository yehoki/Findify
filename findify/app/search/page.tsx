import { Suspense } from 'react';
import getUserSession from '../actions/getUserSession';
import HeaderUserProfile from '../components/HeaderUserProfile';
import Menu from '../components/Menu/Menu';
import MobileHeader from '../components/header/MobileHeader';
import DisplayResults from '../components/search/DisplayResults';
import FetchResults from '../components/search/FetchResults';
import Search from '../components/search/Search';
import MenuProvider from '../providers/MenuProvider';
import SearchProvider from '../providers/SearchProvider';
import LoadingSearchResults from '../components/search/LoadingSearchResults';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const session = await getUserSession();
  const searchQuery = searchParams['q'];

  return (
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
        className="col-span-4 lg:col-span-3 2xl:col-span-2 row-span-2
        bg-spotifyBlackBase md:rounded-lg
  "
      >
        <Menu />
      </section>
      <section
        className="bg-spotifyBlackBase
  row-start-3 row-end-[17]
col-span-4 lg:col-span-3 2xl:col-span-2 md:rounded-lg
  "
      >
        {/* <ul className="mx-auto w-3/4 text-center pt-12 flex flex-col gap-2"></ul> */}
      </section>
      <section
        className="bg-spotifyBlackBase h-full
        col-span-8 lg:col-span-9 2xl:col-span-10 row-span-full
    md:rounded-lg md:p-4
    overflow-x-hidden"
      >
        <header
          className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative"
        >
          <SearchProvider>
            <Search session={session} />
          </SearchProvider>
          <HeaderUserProfile session={session} />
          <MobileHeader session={session} />
        </header>
        <div>
          <Suspense fallback={<LoadingSearchResults />}>
            <FetchResults searchQuery={searchQuery} session={session} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default SearchPage;
