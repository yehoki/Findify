export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import getUserSession from '../actions/user/getUserSession';
import HeaderUserProfile from '../components/HeaderUserProfile';
import MobileHeader from '../components/header/MobileHeader';
import FetchResults from '../components/search/FetchResults';
import Search from '../components/search/Search';
import SearchProvider from '../providers/SearchProvider';
import LoadingSearchResults from '../components/search/LoadingSearchResults';
import MobileMenuProvider from '../providers/MobileMenuProvider';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const session = await getUserSession();
  const searchQuery = searchParams['q'];

  return (
    <>
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
    flex justify-between items-center md:block
    relative"
      >
        <HeaderUserProfile session={session} />
        <MobileMenuProvider>
          <MobileHeader session={session}>
            <SearchProvider>
              <Search session={session} />
            </SearchProvider>
          </MobileHeader>
        </MobileMenuProvider>
      </header>
      <div>
        <Suspense fallback={<LoadingSearchResults />}>
          <FetchResults searchQuery={searchQuery} session={session} />
        </Suspense>
      </div>
    </>
  );
};

export default SearchPage;
