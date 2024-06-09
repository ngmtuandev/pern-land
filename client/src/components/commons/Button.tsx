import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import icons from '../../utils/icons'

const Button = ({ children, containerClassName, handleOnClick, type = 'button', isLoading = false } : any) => {
  
  const { FaSpinner } = icons;

  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={twMerge(clsx('px-4 py-2 gap-2 text-white justify-center bg-yellow-bold-main flex items-center rounded-md', 
      containerClassName, isLoading && 'opacity-60'))}
      disabled={isLoading}
    >
      <span className='animate-spin'>
      {isLoading && <FaSpinner />}
      </span>
      {children}
    </button>
  )
}

export default Button