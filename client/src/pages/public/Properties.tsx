import { useEffect, useState } from "react";
import thumb from "../../assets/thumb.png";
import { BreadCrumb, Card } from "../../components";
import { apiGetProperty } from "../../apis/property";
const Properties = () => {
  const [property, setProperty] = useState([]);
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
        <div>sort by</div>
        <div className="w-full grid grid-cols-3 gap-4">
          {property &&
            property?.map((item, index) => {
              return <Card key={index} item={item}></Card>;
            })}
        </div>
      </div>
    </div>
  );
};

export default Properties;
