import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
    try {
        const id = ctx.params.listingId

        const listing = await db.listing.findUnique({
            where: {
                id
            },
            include: {
                reviews: true
            }
        })

        const reviewIds = listing.reviews.map(({ id }) => id)

        const reviews = await prisma.review.findMany({
            where: {
                id: {
                    in: reviewIds,
                },
            },
            include: {
                user: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(reviews, { status: 200 })
    } catch (error) {
        return NextResponse.error(error)
    }
}