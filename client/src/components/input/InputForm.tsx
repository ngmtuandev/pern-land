import clsx from "clsx"
import { twMerge } from "tailwind-merge"


type TForm = {
    style?: any, 
    containerClassName?: any,
    label?: string,
    id: string,
    type?: string,
    register: any,
    errors?: any,
    inputClassName?: any,
    validate?: any,
    placeholder?: string
}

const InputForm = ({style = 'form-input', containerClassName, 
    label, id, type = 'text', register, errors, inputClassName, validate, placeholder} 
    : TForm) => {
  return (
    <div className={twMerge(clsx('flex flex-col w-full -gap-2 md:gap-1 mg:mb-2', containerClassName))}>
        {label && <label className="font-medium text-gray-700" htmlFor={id}>{label}</label>}
        <input type={type} id={id} className={twMerge(clsx(style, 'placeholder:text-sm', inputClassName))}
        {...register(id, validate)}
        placeholder={placeholder}
        />
        {errors && errors[id] && <small className="text-red-600 font-semibold">{errors[id]?.message}</small>}
    </div>
  )
}

export default InputForm