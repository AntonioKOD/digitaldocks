import {PrismaClient} from '@prisma/client';

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request){
    if(req.method === "POST"){
        const {name, email, password} = await req.json();
        const existingUser = await prisma.user.findFirst({
            where: {email}
        });
        if(existingUser){
            return {
                status: 400,
                body: {
                    error: 'User already exists'
                }
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        return NextResponse.json({user})
    }else{
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}
