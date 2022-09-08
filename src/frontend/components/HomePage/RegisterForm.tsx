import { NextPage } from 'next'
import React from 'react'

const RegisterForm: NextPage = () => {
  return (
    <section className='mb-3'>
      <h2 className='text-center mb-2'>Create your account now!</h2>
      <form className='flex flex-col px-3'>
        <div className='flex flex-col'>
          <label htmlFor="register-email">Your Email</label>
          <input className='bg-transparent border-white border-2' type="email" name="" id="register-email" />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="register-name">Your Name</label>
          <input className='bg-transparent border-white border-2' type="text" name="" id="register-name" />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="register-password">Password</label>
          <input className='bg-transparent border-white border-2' type="password" name="" id="register-password" />
        </div>
        <button className='py-2 px-5 bg-white text-slate-600 mt-2 w-full hover:bg-slate-200'>
          Register
        </button>
      </form>
    </section>
  )
}

export default RegisterForm