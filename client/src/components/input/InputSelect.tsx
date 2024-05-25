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
  option?: any;
};

const InputSelect = ({
  style = "form-select",
  containerClassName,
  label,
  id,
  type = "text",
  register,
  errors,
  inputClassName,
  validate,
  placeholder,
  option = [],
}: TForm) => {
  return (
    <div
      className={twMerge(
        clsx("flex flex-col w-full gap-1 mb-2", containerClassName)
      )}
    >
      {label && (
        <label className="font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        type={type}
        id={id}
        className={twMerge(clsx(style, "placeholder:text-sm", inputClassName))}
        {...register(id, validate)}
        placeholder={placeholder}
      >
        {option.map((el: { code: number | string; label: string }) => (
          <option key={el.code} value={el.code}>
            {el?.label}
          </option>
        ))}
      </select>
      {errors && errors[id] && (
        <small className="text-red-600 font-semibold">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default InputSelect;
