import { NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, {params}: {params: {id: string}}){
   const {id} = await params;
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    if(!user){
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({user});
 
}

