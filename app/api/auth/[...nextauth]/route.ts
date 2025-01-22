/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { RequestInternal, SessionStrategy } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Ensure Prisma Client is a singleton
const prisma = new PrismaClient();

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        {
            id: 'credentials',
            name: 'Credentials',
            type: 'credentials' as const,
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async authorize(credentials: Record<string, string> | undefined, req: Pick<RequestInternal, 'query' | 'body' | 'headers' | 'method'>): Promise<{ id: string; email: string; name: string } | null> {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error('Missing credentials');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                if (!user) {
                    throw new Error('No user found');
                }

                const isValid = await bcrypt.compare(credentials.password, user.password ?? '');
                if (!isValid) {
                    throw new Error('Invalid password');
                }

                return {
                    id: user.id,
                    email: user.email ?? '',
                    name: user.name ?? ''
                };
            }
        }
    ],
    session: {
        strategy: 'jwt' as SessionStrategy,
    },
    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.user = token.user;
            }
            return session;
        },
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.user = {
                    id: user.id,
                    email: user.email ?? '',
                    name: user.name ?? '',
                };
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };