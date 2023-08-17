import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Login from './components/Login';
export default function Home() {
  return (
    <main className="text-spotifyGreen">
      <header className="w-full py-10">
        <div className="w-[1024px] mx-auto">
          <nav>
            <ul>
              <li>
                <Login />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </main>
  );
}
