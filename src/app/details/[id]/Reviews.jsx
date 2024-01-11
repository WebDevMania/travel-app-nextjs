"use client"

import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getReviewsByListingId, postReview } from './api'
import Review from './Review'
import { ClipLoader } from "react-spinners";
import Pagination from '@/components/pagination/Pagination'
import { toast } from 'react-hot-toast'

const Reviews = ({
    id
}) => {
    const [selectedStar, setSelectedStar] = useState(5)
    const [text, setText] = useState("")

    const queryClient = useQueryClient()
    const { data: reviews, isLoading } = useQuery({
        queryFn: () => getReviewsByListingId(id),
        queryKey: ["reviews"]
    })
    const { mutate, isLoading: isLoadingMutation } = useMutation({
        mutationFn: handleSubmit,
        onSuccess: () => {
            queryClient.invalidateQueries(["reviews"])
        },
        refetchQueries: ["reviews"]
    })

    const itemsPerPage = 4
    const [itemOffset, setItemOffset] = useState(0)
    const endOffset = itemOffset + itemsPerPage
    const currentReviews = reviews?.slice(itemOffset, endOffset)

    if (isLoading) {
        const style = {
            marginTop: "5rem",
            position: 'absolute',
            top: '50%', left: '50%',
            transform: "translate(-50%, -50%)",
            height: "100vh"
        };

        return (
            <div style={style}>
                <ClipLoader color={"#123abc"} />
            </div>
        )
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            if (text === "") return toast.error("Review can't be empty")

            const body = { text, stars: selectedStar }

            await postReview(id, body)
            setText("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='mt-8 flex items-center gap-6'>
                {Array.from(Array(5).keys()).map((number) => (
                    <span
                        key={number}
                        onClick={() => setSelectedStar(number + 1)}
                        className={`${selectedStar === number + 1 ? "scale-125" : ""}
                                 cursor-pointer flex items-center gap-2 transition-all`}
                    >
                        {number + 1}
                        <AiFillStar
                            size={22}
                            color="rgb(59, 130, 246)"
                        />
                    </span>
                ))}

            </div>
            <form
                onSubmit={mutate}
                className='mt-8 flex items-center gap-28 border rounded-lg py-4 px-6 w-max'
            >
                <input
                    value={text}
                    onChange={(e) => setText(prev => e.target.value)}
                    className='outline-none' type="text" placeholder='Leave your opinion...'
                />
                <button
                    className='cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 disabled:bg-gray-800 hover:bg-blue-400 transition'
                    disabled={isLoadingMutation}
                >
                    Post
                </button>
            </form>
            <div className='mt-16 h-[900px] flex flex-col gap-24 w-1/3'>
                {currentReviews?.map((review) => (
                    <Review
                        key={review.id}
                        review={review}
                    />
                ))}
                {!isLoading && (
                    <Pagination
                        setItemOffset={setItemOffset}
                        itemsPerPage={itemsPerPage}
                        reviews={reviews}
                    />
                )}
            </div>
        </>
    )
}

export default Reviews