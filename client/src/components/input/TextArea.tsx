import clsx from "clsx"
import { twMerge } from "tailwind-merge"
type TArea = {
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

const TextArea = ({style = 'form-textarea', containerClassName, 
label, id, type = 'text', register, errors, inputClassName, validate, placeholder} 
: TArea) => {
  return (
    <div className={twMerge(clsx('flex flex-col w-full gap-1 mb-2', containerClassName))}>
        {label && <label className="font-medium text-gray-700" htmlFor={id}>{label}</label>}
        <textarea type={type} id={id} className={twMerge(clsx(style, 'placeholder:text-sm', inputClassName))}
        {...register(id, validate)} placeholder={placeholder} rows={5}
        ></textarea>
        {errors && errors[id] && <small className="text-red-600 font-semibold">{errors[id]?.message}</small>}
    </div>
  )
}

export default TextArea