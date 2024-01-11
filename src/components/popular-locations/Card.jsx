import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({
    place
}) => {

    const url = `/catalog?city=${place.value}&min_price=${50}&max_price=${999}&type=${'luxury'}`

    return (
        <Link href={url} className="cursor-pointer h-[500px] w-[350px] flex flex-wrap rounded-xl shadow-md">
            {/* image container */}
            <div className="relative h-2/3 w-full">
                <Image
                    className="h-full w-full overflow-hidden rounded-tl-xl rounded-tr-xl object-cover"
                    alt="Location's image"
                    src={place.image}
                />
                <div className="absolute right-0 bottom-0 p-4 capitalize bg-blue-700 text-white rounded-tl-xl font-semibold">
                    {place.value}
                </div>
            </div>
            {/* data */}
            <div className="flex flex-col gap-4 p-4">
                <h2 className="text-center text-2xl text-slate-800 font-semibold">
                    {place.numOfPlaces} Places to stay
                </h2>
                <p className='text-center mt-2 text-lg text-slate-700'>
                    Discover the best hotel or apartment
                    for your adventurous journey.
                </p>
            </div>
        </Link>
    )
}

export default Card