"use client"

import React, { useEffect, useState } from 'react'
import { optionLocations, optionTypes } from '@/lib/data'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { createNewListing, postImages } from './api'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

const Client = () => {

    const CLOUD_NAME = "doojo83ea"
    const UPLOAD_PRESET = "hotel_app"

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (data, imageUrls) => createNewListing(data, imageUrls),
        mutationKey: ['listings']
    })
    const [images, setImages] = useState([])
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            desc: "",
            beds: 5,
            hasFreeWifi: false,
            type: "luxury",
            location: "dubai",
            pricePerNight: 123
        }
    })

    useEffect(() => {
        if (Object.keys(errors)?.length > 0) {
            Object.keys(errors)?.map((key) => {
                toast.error(errors[key]?.message)
            })
        }
    }, [errors])

    const handleImage = (e) => {
        setImages(prev => {
            return [...prev, e.target.files[0]]
        })
    }

    const uploadImage = async (image, idx) => {
        if (!image) return
        const toastId = toast.loading(`Image ${idx + 1} is being uploaded`)

        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
            const imageUrl = await postImages(CLOUD_NAME, formData)
            toast.success(`Successfully uploaded image ${idx + 1}`)
            toast.dismiss(toastId)
            return imageUrl
        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error?.message)
        }

    }

    const onSubmit = async (data) => {

        if (!images?.length) {
            toast.error("You must publish an image!")
            return
        }

        const imageUrls = await Promise.all(images.map((image, idx) => {
            const imageUrl = uploadImage(image, idx)
            return imageUrl
        }))

        const newListing = await mutateAsync({ data, imageUrls })
        toast.success(`Redirecting to listing...`)
        router.push(`/details/${newListing.id}`)
    }

    return (
        <div className='min-h-[900px] w-full flex justify-center items-center'>
            <div className='h-2/5 w-1/5 rounded-xl border border-slate-300'>
                <div className='p-3 w-full border-b border-slate-300'>
                    <h3 className='text-center font-semibold text-2xl'>
                        Create a listing
                    </h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full px-4 py-6 flex flex-col items-center gap-8'>
                    {/* name */}
                    <input
                        {...register("name")}
                        className="text-slate-400 w-2/3 outline-none p-2"
                        type="text"
                        placeholder="Grand Hotel"
                    />

                    {/* desc */}
                    <input
                        {...register("desc")}
                        className="text-slate-400 w-2/3 outline-none p-2"
                        type="text"
                        placeholder="The best hotel in the world"
                    />

                    {/* location */}
                    <select
                        {...register("location")}
                        className="text-slate-400 w-2/3 outline-none ml-2">
                        {optionLocations.map((optionLocation) => (
                            <option
                                key={optionLocation.value}
                                value={optionLocation.value}
                            >
                                {optionLocation.city}
                            </option>
                        ))}
                    </select>

                    {/* type */}
                    <select
                        {...register("type")}
                        className="text-slate-400 w-2/3 outline-none p-2">
                        {optionTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.text}
                            </option>
                        ))}
                    </select>
                    {/* pricePerNight */}
                    <input
                        {...register("pricePerNight", { valueAsNumber: true })}
                        className="text-slate-400 w-2/3 outline-none p-2"
                        step={0.01}
                        type="number"
                        placeholder="$249.00"
                    />
                    {/* beds */}
                    <input
                        {...register("beds", { valueAsNumber: true })}
                        className="text-slate-400 w-2/3 outline-none p-2"
                        type="number"
                        placeholder="5 beds"
                    />
                    {/* hasFreeWifi */}
                    <div className='text-slate-400 ml-4 w-2/3 flex gap-4'>
                        <label htmlFor='freeWifi'>
                            Free Wifi
                        </label>
                        <input
                            {...register("hasFreeWifi")}
                            id='freeWifi'
                            type="checkbox"
                        />
                    </div>
                    {/* imagesUrl */}
                    <label className="text-slate-400 w-2/3 ml-4" htmlFor="images">
                        Upload Images
                    </label>
                    <input
                        onChange={handleImage}
                        className="text-slate-400"
                        style={{ display: "none" }}
                        id="images"
                        type="file"
                        placeholder="Upload Hotel's Images"
                    />
                    <button
                        disabled={isLoading}
                        className="w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Client