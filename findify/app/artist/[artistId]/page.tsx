import getUserSession from '@/app/actions/user/getUserSession';

interface ArtistPageProps {
  params: { artistId: string };
}

const ArtistPage: React.FC<ArtistPageProps> = async ({ params }) => {
  const session = await getUserSession();
  if (!session) {
    return <div>Not logged in</div>;
  }

  return <div></div>;
};

export default ArtistPage;
