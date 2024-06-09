import { useForm } from "react-hook-form";
import Button from "../commons/Button";
import SearchItem from "./SearchItem";
import InputForm from "../input/InputForm";
import { usePropertiesTypeStore } from "../../store/usePropertiesTypeStore";
import { useEffect, useState } from "react";
import InputSelectLibCustom from "../input/InputSelectLibCustom";
import icons from "../../utils/icons";
import withRouter from "../../hocs/withRouter";
import path from "../../utils/path";
import { createSearchParams } from "react-router-dom";

const Search = ({ navigate }: any) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const [isOpenSelectRange, setIsOpenSelectRange] = useState(false);

  const { getPropertiesType, propertiesType }: any = usePropertiesTypeStore();

  const { FaChevronDown } = icons;

  useEffect(() => {
    getPropertiesType({ fields: "name,id,image" });
  }, []);

  const handleQuerySearchPropertiesType = (data: any) => {
    const { address, max_price, min_price, propertyType } = data;
    let params: TPramsPropertiesType = new Object();
    if (address) {
      params.address = address;
    }
    if (propertyType) {
      params.propertyTypeId = propertyType?.id;
    }
    if (max_price && !min_price) {
      params.price = ["lte", +max_price];
    }
    if (!max_price && min_price) {
      params.price = [+min_price, "gte"];
    }
    if (max_price && min_price) {
      params.price = [+min_price, +max_price];
    }

    navigate({
      pathname: `/${path.PROPERTIES}`, // properties
      search: createSearchParams(params).toString(), // properties?pages=12
    });
    console.log("navigate");
  };

  return (
    <form
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
        <InputSelectLibCustom
          inputClassName="rounded-md border border-gray-200"
          register={register}
          id="propertyType"
          errors={errors}
          containerClassName="w-[12em]"
          options={propertiesType?.map((item: TPropertiesType) => ({
            ...item,
            label: item?.name && item?.name,
          }))}
          onChange={(value: TPropertiesType) => {
            setValue("propertyType", value);
          }}
        ></InputSelectLibCustom>
      </SearchItem>
      <SearchItem title="rent range">
        {isOpenSelectRange && (
          <div className="absolute py-4 flex justify-center gap-2 items-center flex-col w-full min-h-20 mt-3 rounded-md top-full bg-yellow-bold-main left-0">
            <div className="flex flex-col gap-1 justify-center items-center">
              <label className="text-white">Min Price</label>
              <input
                className="outline-none border-none"
                {...register("min_price")}
                id="min-price"
              ></input>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label className="text-white">Max Price</label>
              <input
                className="outline-none border-none"
                {...register("max_price")}
                id="min-price"
              ></input>
            </div>
          </div>
        )}
        <Button
          handleOnClick={() => {
            console.log("handle click");
            setIsOpenSelectRange(!isOpenSelectRange);
          }}
          containerClassName="bg-transparent top-0 -mt-1 h-[100%] text-gray-500 border-gray-200 border"
        >
          <div>Select Range Price</div>
          <FaChevronDown />
        </Button>
      </SearchItem>
      <div className="flex justify-center items-center">
        <Button handleOnClick={handleSubmit(handleQuerySearchPropertiesType)}>
          Search
        </Button>
      </div>
    </form>
  );
};

export default withRouter(Search);
