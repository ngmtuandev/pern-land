import clsx from "clsx";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

const InputSelectLibCustom = ({
  containerClassName,
  label,
  id,
  register,
  errors,
  validate,
  placeholder,
  options = [],  
  onChange,
}: TForm & { onChange: void | any }) => {
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
      <Select
        {...register(id, validate)}
        id={id}
        options={options}
        placeholder={placeholder}
        isClearable
        onChange={(value) => onChange(value)}
        isSearchable
        formatOptionLabel={(option: TPropertiesTypeSelect) => (
          <div className="flex items-center gap-2">
            {option?.image && (
              <img src={option?.image} alt="" className="w-6 h-6" />
            )}
            <span>{option?.label}</span>
          </div>
        )}
        className={{
          control: () => clsx(""),
          input: () => clsx(""),
          option: () => clsx(""),
        }}
      ></Select>
      {errors && errors[id] && (
        <small className="text-red-600 font-semibold">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default InputSelectLibCustom;
