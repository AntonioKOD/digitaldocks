import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Context {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Context) {
    const { id } = params; // Correct way to access params

    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}