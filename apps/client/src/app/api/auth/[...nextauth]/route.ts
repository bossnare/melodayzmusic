import { authOptions } from '@/lib/auth/next-options';
import NextAuth from 'next-auth';

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
