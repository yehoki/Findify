import getGenreInformation from '@/app/actions/genres/getGenreInformation';
import getUserSession from '@/app/actions/user/getUserSession';
import HeaderUserProfile from '@/app/components/HeaderUserProfile';
import MobileHeader from '@/app/components/header/MobileHeader';
import { parseArtists } from '@/app/config/helper';
import Image from 'next/image';
import { AiOutlineUser } from 'react-icons/ai';

interface GenrePageProps {
  params: { genreName: string };
}

const GenrePage: React.FC<GenrePageProps> = async ({ params }) => {
  const session = await getUserSession();
  if (!session) {
    return <div>Not logged in</div>;
  }

  const genreInformation = await getGenreInformation(params.genreName);
  if (!genreInformation) {
    return <>No Genre info</>;
  }

  const topArtists = genreInformation.sort((a, b) => {
    if (a.followers.total > b.followers.total) {
      return -1;
    } else if (a.followers.total < b.followers.total) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <>
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative
          "
      >
        <HeaderUserProfile session={session} />
        <MobileHeader session={session} />
      </header>
      <div>
        <h2 className="text-xl text-white font-semibold my-4 px-4">
          Most followed artists
        </h2>
        <ul
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4 2xl:grid-cols-5
        gap-4 lg:gap-8 px-4
        "
        >
          {topArtists.map((artist) => (
            <li key={artist.id} className="">
              <div>
                <div
                  className="relative w-[120px] h-[120px]  
                  md:w-[150px] md:h-[150px] aspect-square rounded-full
                mx-auto
                "
                >
                  {artist.images && artist.images[0] && (
                    <Image
                      src={artist.images[0].url}
                      fill
                      alt={`${artist.name} image`}
                      className="rounded-full"
                    />
                  )}
                  {(!artist.images || !artist.images[0]) && (
                    <AiOutlineUser
                      className="w-full h-full rounded-full text-spotifyOffWhite 
                bg-transparent border-[#b3b3b3]"
                    />
                  )}
                </div>
                <h3 className="text-center text-white text-lg font-semibold">
                  {artist.name}
                </h3>
                <h4 className="text-sm text-spotifyOffWhite font-semibold text-center mb-1">
                  {Intl.NumberFormat('en-US').format(artist.followers.total)}{' '}
                  followers
                </h4>
                <h4
                  className="line-clamp-1 text-sm 
                text-spotifyOffWhite font-semibold text-center"
                >
                  {parseArtists(artist.genres)}
                </h4>
              </div>
            </li>
          ))}
        </ul>
        {/* {genreInformation.tracks.items.map((track) => {
        return (
          <div key={track.id}>
            {track.name}: {track.artists[0].name}
          </div>
        );
      })} */}
      </div>
    </>
  );
};

export default GenrePage;
