import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req) {
    const body = await req.json();
    const {
        email,
        username,
        password,
    } = body;

    
    const isExisting = await db.user.findUnique({
        where: {
            email,
        }
    });


    if (isExisting) {
        // 409 Status Code:
        // "Conflict with the current state of the resource."
        return NextResponse.error({ message: "You've already registered" }, { status: 409 });;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await db.user.create({
        data: {
            email,
            username,
            password: hashedPassword
        }
    });

    console.log(hashedPassword, 'HASHED PASSWORD!')

    return NextResponse.json({ message: "User successfully registered." }, { status: 201 });
}