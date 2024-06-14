import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type TForm = {
  style?: any;
  containerClassName?: any;
  label?: string;
  id: string;
  type?: string;
  register: any;
  errors?: any;
  inputClassName?: any;
  validate?: any;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
};

const InputForm = ({
  style = "form-input",
  containerClassName,
  label,
  id,
  type = "text",
  register,
  errors,
  inputClassName,
  validate,
  placeholder,
  required,
  readOnly,
}: TForm) => {
  return (
    <div
      className={twMerge(
        clsx("flex flex-col w-full -gap-2 md:gap-1 mg:mb-2", containerClassName)
      )}
    >
      {label && (
        <div>
          <label className="font-medium text-gray-700" htmlFor={id}>
            {label}
          </label>
          {required && <sup className="text-red-500">*</sup>}
        </div>
      )}
      <input
        readOnly={readOnly}
        type={type}
        id={id}
        className={twMerge(clsx(style, "placeholder:text-sm", inputClassName), readOnly && 'bg-gray-100 outline-none')}
        {...register(id, validate)}
        placeholder={placeholder}
      />
      {errors && errors[id] && (
        <small className="text-red-600 font-semibold">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default InputForm;
