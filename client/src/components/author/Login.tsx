import clsx from "clsx"
import { useState } from "react"

const Login = () => {

  const [varient, setVarient] = useState('LOGIN')

  return (
    <div 
    onClick={e => e.stopPropagation()}
    className='bg-white rounded-md px-6 py-12 items-center w-[500px] flex flex-col gap-6'>
      <h1 className="text-3xl font-semibold tracking-tight font-agbalumo text-gray-700">Welcome to Land</h1>
      <div className="flex justify-start w-full border-b gap-6">
        <span 
        onClick={() => setVarient('LOGIN')}
        className={clsx(varient === 'LOGIN' && 'border-b-2 border-yellow-bold-main cursor-pointer', 'cursor-pointer')}>Login</span>
        <span 
        onClick={() => setVarient('REGISTER')}
        className={clsx(varient === 'REGISTER' && 'border-b-2 border-yellow-bold-main cursor-pointer', 'cursor-pointer')}>New Account</span>
      </div>
    </div>
  )
}

export default Login