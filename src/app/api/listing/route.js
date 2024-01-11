import { NextResponse } from "next/server"
import getCurrentUser from "@/lib/getCurrentUser"
import db from "@/lib/db"

// GET request with filter data to get the needed hotels
// GET request to get the most popular places
// GET request to get the highest reviews

// DELETE & UPDATE later maybe?

export async function GET(req) {
    try {
        const listings = await db.listing.findMany({
            take: 10
        })

        return NextResponse.json(listings)
    } catch (error) {
        return NextResponse.error(error)
    }
}

export async function POST(req) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser?.isAdmin) {
            return NextResponse.error({ message: "User must be an admin!" })
        }

        const body = await req.json()
        Object.values(body).forEach((v) => {
            if (v === "") return NextResponse.error({ message: "Fill all fields!" })
        })

        const {
            name,
            location,
            desc,
            type,
            pricePerNight,
            beds,
            hasFreeWifi,
            imageUrls
        } = body

        const listing = await db.listing.create({
            data: {
                name,
                location,
                desc,
                type,
                pricePerNight,
                beds,
                hasFreeWifi,
                imageUrls,
            }
        });

        return NextResponse.json(listing)
    } catch (error) {
        return NextResponse.error(error)
    }
}