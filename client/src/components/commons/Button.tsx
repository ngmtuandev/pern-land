import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const Button = ({ children, styleCss, handleOnClick, type = 'button' } : any) => {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={twMerge(clsx('p-4 text-white bg-yellow-bold-main rounded-md', styleCss))}
    >
      {children}
    </button>
  )
}

export default Button