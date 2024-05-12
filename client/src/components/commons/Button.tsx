import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const Button = ({ children, styleCss, onClick, type = 'button' } : any) => {
  return (
    <button
      type={type}
      className={twMerge(clsx('p-4 text-white bg-yellow-bold-main rounded-md', styleCss))}
    >
      {children}
    </button>
  )
}

export default Button