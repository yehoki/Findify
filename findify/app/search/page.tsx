import getUserSession from '../actions/getUserSession';
import HeaderUserProfile from '../components/HeaderUserProfile';
import Menu from '../components/Menu/Menu';
import MenuProvider from '../providers/MenuProvider';

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = async ({}) => {
  const session = await getUserSession();
  return (
    <main
      className="text-spotifyGreen
  w-full
  h-full
p-2
flex flex-col
md:grid
grid-rows-16
grid-cols-12
md:gap-2 
"
    >
      <section
        className="col-span-4 lg:col-span-3 2xl:col-span-2 row-span-2
  bg-spotifyBlack md:rounded-lg
  "
      >
        <Menu />
      </section>
      <section
        className="bg-spotifyBlack
  row-start-3 row-end-[17]
col-span-4 lg:col-span-3 2xl:col-span-2 md:rounded-lg
  "
      >
        <ul className="mx-auto w-3/4 text-center pt-12 flex flex-col gap-2"></ul>
      </section>
      <section
        className="bg-spotifyBlack
    col-span-8 lg:col-span-9 2xl:col-span-10 row-span-full
    md:rounded-lg p-4
    overflow-x-hidden"
      >
        <header className="w-full h-16">
          <HeaderUserProfile session={session} />
        </header>
      </section>
    </main>
  );
};

export default SearchPage;
