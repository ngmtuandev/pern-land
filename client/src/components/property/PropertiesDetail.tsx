import { useLocation, useParams } from "react-router-dom";
import thumb from "../../assets/thumb.png";
import { BreadCrumb } from "..";
import { useEffect, useState } from "react";
import { apiGetDetailProperty } from "../../apis/property";
import PropertiesImage from "./PropertiesImage";

const PropertiesDetail = () => {
  let { state } = useLocation();
  const [propertyInfo, setPropertyInfo] = useState<any>();
  const { nameProperties } = useParams();
  useEffect(() => {
    (async () => {
      const response = await apiGetDetailProperty(state?.properties?.id);
      if (response) {
        setPropertyInfo(response?.data);
      }
    })();
  }, [nameProperties]);
  return (
    <div className="w-full">
      <div className="w-full px-5 flex justify-center flex-col items-center">
        <div className="relative w-full">
          <img
            src={thumb}
            className="md:w-full hidden md:block object-contain"
          ></img>
          <div className="md:absolute gap-3 md:inset-0 text-white flex-col md:flex md:justify-center md:items-center">
            <h1 className="md:text-5xl hidden md:font-semibold">Property</h1>
            <div className="">
              <BreadCrumb></BreadCrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-9">
        <PropertiesImage images={propertyInfo?.images}></PropertiesImage>
      </div>
    </div>
  );
};

export default PropertiesDetail;
