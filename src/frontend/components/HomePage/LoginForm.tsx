import { NextPage } from 'next'
import React from 'react'

const LoginForm: NextPage = () => {
  return (
    <section className='mb-3'>
      <h2 className='text-center'>Or login here</h2>
      <form className='flex flex-col px-3'>
        <div className='flex flex-col'>
          <label htmlFor="login-email">Your Email</label>
          <input className='bg-transparent border-white border-2' type="email" name="" id="login-email" />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="login-password">Password</label>
          <input className='bg-transparent border-white border-2' type="password" name="" id="login-password" />
        </div>
        <button className='py-2 px-5 bg-white text-slate-600 mt-2 w-full hover:bg-slate-200'>Login</button>
      </form>
    </section>
  )
}

export default LoginForm