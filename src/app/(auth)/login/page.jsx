"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Paris from '../../../../public/assets/paris.jpg'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import { ClipLoader } from 'react-spinners'


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(schema)
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    if (Object.keys(errors)?.length > 0) {
      toast.error("Enter valid data")
      return
    }

    setIsLoading(true)

    try {
      const res = await signIn("credentials", { ...data, redirect: false })

      if (res?.error == null) {
        router.push('/')
      } else {
        console.log(res.error)
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  return (
    <div className='relative h-screen w-full'>
      <div className='relative h-full w-full'>
        <Image
          className='brightness-50 h-full w-full object-cover'
          src={Paris}
          alt=""
        />
        <div className='h-[365px] w-[350px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg'>
          <h2 className='text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500'>
            Log into your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-8 mx-auto flex flex-col w-1/2'>
            <div className='w-full flex flex-col items-start'>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required!"
                  },
                  maxLength: {
                    value: 20,
                    message: "Email must be less than 20 characters"
                  }
                })}
                className='w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600'
                type="email"
                placeholder='John@gmail.com'
              />
              <p className='h-10 ml-2 text-red-500 text-center'>{errors?.email?.message}</p>
            </div>
            <div className='w-full flex flex-col items-start'>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required!"
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be more than 6 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "Password must be less than 20 characters"
                  }
                })}
                className='w-full mx-auto outline-none border border-slate-400 py-1 px-3 rounded-md focus:border-slate-600'
                type="password"
                placeholder="********"
              />
              <p className='h-10 ml-2 text-red-500 text-center'>{errors?.password?.message}</p>
            </div>
            <button
              className='mt-12 mx-auto w-full cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600'
            >
              {isLoading ? (
                <div>
                  <ClipLoader
                    size={20}
                  />
                </div>
              ) : "Submit"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login