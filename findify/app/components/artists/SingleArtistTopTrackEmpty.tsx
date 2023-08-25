'use client';

interface SingleArtistTopTrackEmptyProps {}

const SingleArtistTopTrackEmpty: React.FC<
  SingleArtistTopTrackEmptyProps
> = ({}) => {
  return (
    <li
      className="flex items-center
      rounded-lg px-4 py-2
    hover:bg-[#313131] animate-pulse
    "
    >
      <div
        className="flex flex-1 items-center gap-4 text-spotifyOffWhite
      px-9
      "
      >
        <div className="relative w-10 h-10 bg-spotifyOffWhite"></div>
        <div className="bg-white/20 w-1/3 h-6 rounded-full"></div>
      </div>
    </li>
  );
};

export default SingleArtistTopTrackEmpty;
