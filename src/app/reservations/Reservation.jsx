import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Reservation = ({
    reservation,
    mutate
}) => {
    return (
        <div className='flex flex-col' key={reservation.id}>
            <Link href={`/details/${reservation.listingId}`}>
                <Image
                    className='rounded-xl shadow-xl'
                    src={reservation.listing.imageUrls[0]}
                    height="200"
                    width="300"
                />
            </Link>
            <div className='p-2 mt-2 flex flex-col gap-4'>
                <span className='font-semibold text-lg'>
                    {reservation.listing.location}
                </span>
                <span>
                    {reservation.listing.name}
                </span>
                <div>
                    <span className='text-slate-500'>
                        {format(reservation.startDate, 'MMM do yyyy')}
                    </span>
                    <span className='px-2'>-</span>
                    <span className='text-slate-500'>
                        {format(reservation.endDate, 'MMM do yyyy')}
                    </span>
                </div>
                <div>
                    Total Price: ${reservation.daysDifference * reservation.listing.pricePerNight}
                </div>
                <button
                    onClick={() => mutate(reservation.id)}
                    className='w-full py-2 bg-red-500 text-white rounded-xl transition-all hover:bg-red-400'
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Reservation