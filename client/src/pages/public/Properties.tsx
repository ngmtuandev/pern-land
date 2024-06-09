import { useEffect, useState } from "react";
import thumb from "../../assets/thumb.png";
import { BreadCrumb, Button, Card, InputSelect } from "../../components";
import { apiGetProperty } from "../../apis/property";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Pagination } from "../../components/pagiantion";
import { useSearchParams } from "react-router-dom";
const Properties = () => {
  const [property, setProperty] = useState<any>([]);
  const [filterSelect, setFilterSelect] = useState("all");
  const [searchParams] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const sort = watch("sort");

  useEffect(() => {
    // [...searchParams] -> [['address', 'value'], ['propertyType', 'value']]
    const params: any = Object.fromEntries([...searchParams]);
    // params : {address: value, propertyType: value}

    (async () => {
      if (sort) params.sort = sort;

      if (searchParams?.getAll("price")) {
        params.price = searchParams?.getAll("price");
      }

      const response = await apiGetProperty({
        limit: import.meta.env.VITE_LIMIT,
        ...params,
      });
      if (response?.data?.rows?.length > 0) {
        setProperty(response?.data);
      }
    })();
  }, [searchParams, sort]);

  return (
    <div className="w-full flex justify-center flex-col items-center">
      <div className="relative w-full">
        <img src={thumb} className="w-full object-contain"></img>
        <div className="absolute gap-3 inset-0 text-white flex-col flex justify-center items-center">
          <h1 className="text-5xl font-semibold">Property</h1>
          <div>
            <BreadCrumb></BreadCrumb>
          </div>
        </div>
      </div>
      <div className="w-main my-20">
        <div className="flex justify-between items-center mb-4">
          <div className="w-[8%] flex items-center gap-2">
            <span>Sort: </span>
            <div>
              <InputSelect
                register={register}
                id="sort"
                errors={errors}
                option={[
                  { label: "Lastest", code: "-createdAt" },
                  { label: "Oldest", code: "createdAt" },
                  { label: "A - Z", code: "name" },
                  { label: "Z - A", code: "-name" },
                ]}
              ></InputSelect>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div onClick={() => setFilterSelect("all")}>
              <Button
                containerClassName={twMerge(
                  clsx(
                    "bg-transparent border text-gray-900",
                    filterSelect === "all" && "bg-yellow-bold-main text-white"
                  )
                )}
              >
                All Property
              </Button>
            </div>
            <div onClick={() => setFilterSelect("rent")}>
              <Button
                containerClassName={twMerge(
                  clsx(
                    "bg-transparent border text-gray-900",
                    filterSelect === "rent" && "bg-yellow-bold-main text-white"
                  )
                )}
              >
                For rent
              </Button>
            </div>
            <div onClick={() => setFilterSelect("sell")}>
              <Button
                containerClassName={twMerge(
                  clsx(
                    "bg-transparent border text-gray-900",
                    filterSelect === "sell" && "bg-yellow-bold-main text-white"
                  )
                )}
              >
                For sell
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          {property?.rows &&
            property?.rows?.map((item: TProperty, index: number | string) => {
              return <Card key={index} item={item}></Card>;
            })}
        </div>
        <div className="flex items-center justify-center my-4">
          <Pagination
            total={property?.count}
            page={property?.page}
            limit={property?.limit}
          />
        </div>
      </div>
    </div>
  );
};

export default Properties;
