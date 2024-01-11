"use client"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'currency-formatter'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { createReservation } from './api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ClipLoader } from "react-spinners";
import { DateRangePicker } from 'react-date-range';

const BookModal = ({
    handleHideModal,
    listing
}) => {
    const [dateRange, setDateRange] = useState([new Date(), new Date(new Date().setDate(new Date().getDate() + 7))])
    const router = useRouter()

    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation({
        mutationFn: () => createReservation(
            new Date(dateRange[0]),
            new Date(dateRange[1]),
            listing.id,
            daysDifference()
        ),
        onSuccess: () => handleSuccess()
    })

    function handleSuccess() {
        toast.success("Successfully made a reservation")
        queryClient.invalidateQueries({
            queryKey: ["reservations"]
        })
        router.push('/reservations')
    }

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

    const selectionRange = {
        startDate: dateRange[0],
        endDate: dateRange[1],
        key: 'selection',
    }

    const daysDifference = () => {
        const startDate = dateRange[0]
        const endDate = dateRange[1]

        if (startDate && endDate) {
            const result = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))

            return result
        }
    }

    return (
        <div className='z-30 fixed backdrop-blur top-0 left-0 min-h-full w-full shadow-lg'>
            <div className='bg-slate-100 w-1/4 rounded-lg absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pb-8'>
                <div className='p-4 border-b border-slate-500 flex items-center justify-between'>
                    <h3 className='font-semibold text-2xl'>
                        Book your hotel
                    </h3>
                    <AiOutlineClose
                        onClick={handleHideModal}
                        className='cursor-pointer'
                        size={20}
                    />
                </div>
                <div className='p-4 flex items-center justify-between'>
                    <h2 className='font-semibold text-[20px]'>
                        {listing.name}
                    </h2>
                    <span className='text-slate-800'>
                        {format(listing.pricePerNight, { locale: 'en-us' })}
                        /night
                    </span>
                </div>
                <form className='p-4 flex flex-col gap-4'>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        disabledDates={listing?.reservations?.flatMap(({ reservedDates }) => reservedDates)}
                        onChange={
                            ({ selection }) => {
                                setDateRange([selection.startDate, selection.endDate])
                            }
                        }
                    />
                </form>
                <div className='p-4 mt-4 border-t border-slate-500 flex items-end justify-between'>
                    <div className='text-slate-700 flex items-center gap-2'>
                        <span>
                            {format(listing.pricePerNight, { locale: 'en-us' })}
                        </span>
                        <span>x</span>
                        <span>{daysDifference()}</span>
                    </div>
                    <div className='text-slate-700 mt-4'>
                        Total Price: {format(listing.pricePerNight * daysDifference(), { locale: 'en-us' })}
                    </div>
                </div>
                <div className='w-full flex items-center mt-6'>
                    <button
                        onClick={mutate}
                        className='w-3/4 mx-auto cursor-pointer rounded-lg py-3 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600'
                    >
                        {
                            isLoading ? (
                                <div>
                                    <ClipLoader
                                        size={20}
                                    />
                                </div>
                            ) : "Submit"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookModal