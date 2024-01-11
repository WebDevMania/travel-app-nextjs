"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Dubai from '../../../../public/assets/dubai.jpg'
import Image from 'next/image'
import axiosAPI from '@/lib/axiosAPI'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      console.log(data)
      await axiosAPI.post('/register', data)
      toast.success("Success! Redirecting to login")
      setTimeout(() => {
        router.push('/login')
      }, 2500)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative h-screen w-full'>
      <div className='relative h-full w-full'>
        <Image
          className='brightness-50 h-full w-full object-cover'
          src={Dubai}
          alt=""
        />
        <div className='h-[450px] w-[400px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg'>
          <h2 className='text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500'>
            Create an account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-12 mx-auto flex flex-col items-center w-1/2'>
            <div className='w-full flex flex-col items-start'>
              <input
                {...register("username")}
                className='w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600'
                type="text"
                placeholder='John123'
              />
              <p className='h-10 ml-2 text-red-500 text-center'>{errors?.username?.message}</p>
            </div>
            <div className='w-full flex flex-col items-start'>
              <input
                {...register("email")}
                className='w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600'
                type="email"
                placeholder='John@gmail.com'
              />
              <p className='h-10 ml-2 text-red-500 text-center'>{errors?.email?.message}</p>
            </div>
            <div className='w-full flex flex-col items-start'>
              <input
                {...register("password")}
                className='w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600'
                type="password"
                placeholder="********"
              />
              <p className='h-10 ml-2 text-red-500 text-center'>{errors?.password?.message}</p>
            </div>
            <button
              className='mt-12 mx-auto w-full cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600'
            >
              Submit
            </button>
          </form>
        </div>
      </div >
    </div >
  )
}

export default SignUp