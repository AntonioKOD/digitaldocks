import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = context.params; // Correct way to access params

    const user = await prisma.user.findUnique({
        where: { id }
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
}