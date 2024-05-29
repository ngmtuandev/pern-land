import { useEffect, useState } from "react";
import thumb from "../../assets/thumb.png";
import { BreadCrumb, Button, Card, InputSelect } from "../../components";
import { apiGetProperty } from "../../apis/property";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Pagination } from "../../components/pagiantion";
const Properties = () => {
  const [property, setProperty] = useState([]);
  const [filterSelect, setFilterSelect] = useState("all");
  const {
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    (async () => {
      const response = await apiGetProperty({
        limit: import.meta.env.VITE_LIMIT,
      });
      console.log("first : ", response?.data?.rows?.length);
      if (response?.data?.rows?.length > 0) {
        setProperty(response?.data?.rows);
      }
    })();
  }, []);
  console.log("property api : ", property);
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
                  { label: "Lastest", value: "-createdAt" },
                  { label: "Oldest", value: "createdAt" },
                  { label: "A - Z", value: "name" },
                  { label: "Z - A", value: "-name" },
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
          {property &&
            property?.map((item, index) => {
              return <Card key={index} item={item}></Card>;
            })}
        </div>
        <div className="flex items-center justify-center my-4">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Properties;
