import clsx from "clsx"
import { twMerge } from "tailwind-merge"


type TOption = {
    label: string;
    value: string;
}

type TForm = {
    style?: any, 
    containerClassName?: any,
    label?: string,
    id: string,
    register: any,
    errors?: any,
    inputClassName?: any,
    validate?: any,
    options?: TOption[]
}

const InputRadio = ({style = 'form-radio', containerClassName, 
    id, register, inputClassName, validate, options = []} 
    : TForm) => {
  return (
    <div className={twMerge(clsx('flex cursor-pointer items-center w-full gap-4 mb-2', containerClassName))}>
        {
            options?.map(el => (
                <div className="flex items-center gap-2" key={el?.value}>
                    <input type='radio' name={el?.value} id={el?.value} value={el?.value}
                    className={twMerge(clsx(style, inputClassName))}
                    {...register(id, validate)}
                    />
                    {el?.label && <label className="font-medium text-gray-700" htmlFor={id}>{el?.label}</label>}
                </div>
            ))
        }
    </div>
  )
}

export default InputRadio