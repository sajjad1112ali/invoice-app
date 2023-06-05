import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            yooo: string;
        } & Session['user']
    }
}