import { getServerSession } from 'next-auth';
import { options } from '../config/options';

export default async function getUserSession() {
  try {
    const session = await getServerSession(options);
    if (!session?.user.email) {
      return null;
    }
    return session;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
