// app/api/auth-session/route.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  return new Response(JSON.stringify(session));
}
