import { useForm } from "react-hook-form";
import Button from "../commons/Button";
import SearchItem from "./SearchItem";
import InputForm from "../input/InputForm";
import InputSelect from "../input/InputSelect";
import { usePropertiesTypeStore } from "../../store/usePropertiesTypeStore";
import { useEffect } from "react";

const Search = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const { getPropertiesType, propertiesType }: any = usePropertiesTypeStore();

  useEffect(() => {
    getPropertiesType({ fields: "name,id" });
  }, []);

  return (
    <div
      className="bg-white shadow-lg py-8 grid grid-cols-4 rounded-sm mx-auto 
  h-[8em] -mt-[4em] z-50 relative border"
    >
      <SearchItem title="location">
        <InputForm
          register={register}
          id="address"
          errors={errors}
          containerClassName="w-[12em]"
          inputClassName="rounded-md border border-gray-200"
          placeholder="type your require location"
        ></InputForm>
      </SearchItem>
      <SearchItem title="property type">
        <InputSelect
          register={register}
          id="propertyType"
          errors={errors}
          containerClassName="w-[12em]"
          inputClassName="rounded-md border border-gray-200"
        ></InputSelect>
      </SearchItem>
      <SearchItem title="rent range">
        <InputSelect
          register={register}
          id="RentRange"
          errors={errors}
          containerClassName="w-[12em]"
          inputClassName="rounded-md border border-gray-200"
        ></InputSelect>
      </SearchItem>
      <div className="flex justify-center items-center">
        <Button>Search</Button>
      </div>
    </div>
  );
};

export default Search;
