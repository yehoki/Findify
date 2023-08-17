import Image from 'next/image';

export default function Home() {
  return (
    <main className="text-spotifyGreen">
      <header className="w-full py-10">
        <div className="w-[1024px] mx-auto">
          <nav>
            <ul>
              <li>
                <button
                  className="flex items-center gap-2 font-semibold text-lg
                border-white rounded-md border p-2
                "
                >
                  Login with Spotify{' '}
                  <div className="relative w-[25px] h-[25px]">
                    <Image
                      alt="Spotify logo"
                      src={'/images/spotify-icon.png'}
                      fill
                    />
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </main>
  );
}
