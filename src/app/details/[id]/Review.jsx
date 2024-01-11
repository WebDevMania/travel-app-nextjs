import { AiFillStar } from 'react-icons/ai'
import { format } from 'timeago.js'
import Image from 'next/image'
import bianco from '../../../../public/assets/bianco_2.png'
import React from 'react'

const Review = ({
    review
}) => {
    return (
        <div key={review.id} className='w-full flex gap-4'>
            <div className='w-14 h-14'>
                <Image
                    className='w-full h-full object-cover rounded-full'
                    src={bianco}
                    alt=""
                />
            </div>
            <div>
                <h3 className='font-semibold text-[20px]'>
                    {review.user.username}
                </h3>
                <span className='text-slate-700'>
                    {format(review.createdAt)}
                </span>
                <div className='mt-4 text-slate-800'>
                    {review.text}
                </div>
            </div>
            <span className="ml-auto flex items-start gap-2">
                {review.stars}
                <AiFillStar
                    size={22}
                    color="#3b82f6"
                />
            </span>
        </div>
    )
}

export default Review