import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    // Extract the 'id' from the request URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
        return new Response(
            JSON.stringify({ error: "ID parameter is missing" }),
            { status: 400 }
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return new Response(
                JSON.stringify({ error: "User not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}