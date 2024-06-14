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
import clsx from "clsx";
import { useModelStore } from "../../store/useModelStore";

const Search = ({ navigate }: any) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const { isShowMenu }: any = useModelStore();

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
      className={clsx(
        " md:shadow-lg md:py-8 flex flex-col mt-7 gap-8 md:flex-col md:bg-white md:grid md:grid-cols-4 rounded-sm mx-auto h-[8em] md:-mt-[4em] z-50 relative md:border",
        !isShowMenu ? "hidden" : "bg-none"
      )}
    >
      <SearchItem title="location">
        <InputForm
          register={register}
          id="address"
          errors={errors}
          containerClassName="md:w-[12em] w-full"
          inputClassName="rounded-md border sm:my-16 border-gray-200"
          placeholder="type your require location"
        ></InputForm>
      </SearchItem>
      <SearchItem title="property type">
        <InputSelectLibCustom
          inputClassName="rounded-md border border-gray-200"
          register={register}
          id="propertyType"
          errors={errors}
          containerClassName="md:w-[12em] w-full"
          options={propertiesType?.map((item: TPropertiesType) => ({
            ...item,
            label: item?.name && item?.name,
          }))}
          onChange={(value: TPropertiesType) => {
            setValue("propertyType", value);
          }}
        ></InputSelectLibCustom>
      </SearchItem>
      <SearchItem title={!isShowMenu ? "Range Price" : ""}>
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
        {isShowMenu && (
          <div className="absolute md:py-4 flex justify-between gap-2 items-center w-full md:min-h-20 md:mt-3 rounded-md md:top-full left-0">
            <div className="flex flex-col gap-1 justify-center items-center">
              <label className="md:text-white text-gray-700 uppercase">
                Min Price
              </label>
              <input
                className="outline-none border-none rounded-md"
                {...register("min_price")}
                id="min-price"
              ></input>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <label className="md:text-white text-gray-700 uppercase">
                Max Price
              </label>
              <input
                className="outline-none border-none rounded-md"
                {...register("max_price")}
                id="min-price"
              ></input>
            </div>
          </div>
        )}
        {!isShowMenu && (
          <Button
            handleOnClick={() => {
              setIsOpenSelectRange(!isOpenSelectRange);
            }}
            containerClassName="bg-transparent top-0 -mt-1 h-[100%] text-gray-500 border-gray-200 border"
          >
            <div>Select Range Price</div>
            <FaChevronDown />
          </Button>
        )}
      </SearchItem>
      <div className="flex z-40 justify-center items-center">
        <Button
          containerClassName="w-full md:w-auto mt-6"
          handleOnClick={handleSubmit(handleQuerySearchPropertiesType)}
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default withRouter(Search);
