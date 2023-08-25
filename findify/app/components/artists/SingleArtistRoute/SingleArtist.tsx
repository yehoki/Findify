import getArtistById from '@/app/actions/artists/getArtistById';
import Image from 'next/image';
import { BsSpotify } from 'react-icons/bs';
import SingleGenre from '../../genres/SingleGenre';
import { AiOutlineUser } from 'react-icons/ai';

interface SingleArtistProps {
  artistId: string;
}

const SingleArtist: React.FC<SingleArtistProps> = async ({ artistId }) => {
  const singleArtist = await getArtistById(artistId);

  if (!singleArtist) {
    return <>Artist with id ${artistId} could not be found</>;
  }
  return (
    <>
      <div className="md:flex gap-4 items-center">
        <div
          className="relative min-w-[144px] min-h-[144px]
        w-5/12 h-5/12 rounded-full
        aspect-[1/1]
        max-h-[288px] max-w-[288px]
        mx-auto md:mx-0
        md:mb-4
        "
        >
          {singleArtist.images && singleArtist.images[0] && (
            <Image
              src={singleArtist.images[0].url}
              alt={`${singleArtist.name} image`}
              fill
              className="rounded-full"
            />
          )}
          {(!singleArtist.images || !singleArtist.images[0]) && (
            <div
              className="w-full h-full bg-transparent rounded-full 
            border border-[#b3b3b3] text-spotifyOffWhite
            flex justify-center items-center"
            >
              <AiOutlineUser className="w-1/2 h-1/2" />
            </div>
          )}
        </div>
        <div className="hidden md:block">
          <div className="">
            <div className="flex gap-2">
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-2">
                {singleArtist.name}{' '}
              </h2>
            </div>
            <div className="flex gap-2">
              <h3 className="text-sm md:text-base text-spotifyOffWhite pl-1">
                {/* Converts to commas */}
                {Intl.NumberFormat('en-US').format(
                  singleArtist.followers.total
                )}{' '}
                followers
              </h3>
              <div className="text-[#3e3e3e] hover:text-spotifyGreen transition">
                <a href={`https://open.spotify.com/artist/${singleArtist.id}`}>
                  <BsSpotify size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2 px-4">
          {singleArtist.name}
        </h2>
        <div className="flex gap-1">
          <h3 className="text-sm md:text-base text-spotifyOffWhite pl-4 pr-2 mb-8">
            {/* Converts to commas */}
            {Intl.NumberFormat('en-US').format(
              singleArtist.followers.total
            )}{' '}
            followers
          </h3>
          <div className="text-[#3e3e3e] hover:text-spotifyGreen transition">
            <a href={`https://open.spotify.com/artist/${singleArtist.id}`}>
              <BsSpotify size={24} />
            </a>
          </div>
        </div>
      </div>
      {singleArtist.genres.length !== 0 && (
        <>
          <h4
            className="text-xl font-semibold text-white
          px-4 mb-2"
          >
            Genres
          </h4>
          <ul
            className="flex gap-2 py-1 mx-2 overflow-x-auto 
          mb-16 md:mb-8"
          >
            {singleArtist.genres.map((genre) => (
              <SingleGenre key={genre} label={genre} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default SingleArtist;
