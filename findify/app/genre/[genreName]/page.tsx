export const dynamic = 'force-dynamic';
import getGenreInformation from '@/app/actions/genres/getGenreInformation';
import getUserSession from '@/app/actions/user/getUserSession';
import HeaderUserProfile from '@/app/components/HeaderUserProfile';
import SingleGenre from '@/app/components/genres/SingleGenre';
import MobileHeader from '@/app/components/header/MobileHeader';
import { parseArtists } from '@/app/config/helper';
import MobileMenuProvider from '@/app/providers/MobileMenuProvider';
import Image from 'next/image';
import Link from 'next/link';
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

  const collectGenres = () => {
    let genreMap = new Map<string, number>();
    topArtists.forEach((artistItem) => {
      artistItem.genres.forEach((genre) => {
        const checkMap = genreMap.get(genre);
        if (!checkMap) {
          genreMap.set(genre, 1);
        } else {
          genreMap.set(genre, checkMap + 1);
        }
      });
    });
    // Ensure the current genre is not displayed
    // Replaces encoded versions of space and '+' sign
    genreMap.delete(
      params.genreName.replaceAll('%20', ' ').replaceAll('%2B', ' ')
    );

    const userGenres: { genre: string; genreCount: number }[] = [];
    genreMap.forEach((genreCount, genre) => {
      userGenres.push({
        genre: genre,
        genreCount: genreCount,
      });
    });

    const sortedGenres = userGenres.sort((objOne, objTwo) => {
      if (objOne.genreCount < objTwo.genreCount) {
        return 1;
      } else if (objOne.genreCount > objTwo.genreCount) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortedGenres;
  };

  return (
    <>
      <header
        className="bg-black md:bg-spotifyBlackBase py-4 md:py-0 md:h-16 w-full
          flex justify-between items-center md:block
          relative
          "
      >
        <HeaderUserProfile session={session} />
        <MobileMenuProvider>
          <MobileHeader session={session} />
        </MobileMenuProvider>
      </header>
      <div>
        <h2
          className="text-xl text-white font-semibold
         my-4 px-4"
        >
          Similar genres
        </h2>
        <ul className="flex gap-2 overflow-x-auto py-1 mx-4 pb-4">
          {collectGenres().map((genre) => {
            return <SingleGenre label={genre.genre} key={genre.genre} />;
          })}
        </ul>
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
                <Link href={`/artist/${artist.id}`}>
                  <div
                    className="relative w-[120px] h-[120px]  
                  md:w-[150px] md:h-[150px] aspect-square rounded-full
                mx-auto mb-2
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
                </Link>
                <h3
                  className="w-fit mx-auto mb-2
                  text-white text-lg font-semibold
                hover:underline line-clamp-1
                "
                >
                  <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
                </h3>
                <h4 className="text-sm text-spotifyOffWhite font-semibold text-center ">
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
      </div>
    </>
  );
};

export default GenrePage;
