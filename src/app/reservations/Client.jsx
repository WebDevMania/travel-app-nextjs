"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteReservation, getUserReservations } from './api'
import React from 'react'
import { ClipLoader } from "react-spinners";
import { toast } from 'react-hot-toast'
import Reservation from './Reservation'

const Client = ({
    currentUser
}) => {

    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery({
        queryKey: ["reservations"],
        queryFn: () => getUserReservations()
    })

    const { mutate, isLoading: isLoadingMutation } = useMutation({
        mutationFn: (id) => deleteReservation(id),
        onSuccess: () => handleSuccess()
    })

    function handleSuccess() {
        toast.success("Successfully deleted a reservation")
        queryClient.invalidateQueries({
            queryKey: ["reservations"]
        })
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

    return (
        <div className='mt-24 px-16 min-h-screen w-full'>
            <div className='h-full w-full flex flex-col'>
                {data?.length > 0 ? (
                    <>
                        <h3 className='text-3xl mb-8'>
                            {currentUser?.isAdmin ? "All Reservations (Admin)" : "Your Reservations"}
                        </h3>
                        <div className='pl-6 flex items-center flex-wrap gap-16'>
                            {data.map((reservation) => (
                                <Reservation
                                    key={reservation.id}
                                    reservation={reservation}
                                    mutate={mutate}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <h1 className='text-center text-3xl font-bold text-slate-700'>
                        You have no reservations.
                    </h1>
                )}
            </div>
        </div>
    )
}

export default Client