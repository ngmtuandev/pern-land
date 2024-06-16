import no_image from "../../assets/no_image.jpg";
import { useModelStore } from "../../store/useModelStore";
import icons from "../../utils/icons";
import ImageModel from "./ImageModel";

const PropertiesImage = ({ images = [] }) => {
  const { FaBars } = icons;
  const { setModel }: any = useModelStore();
  return (
    <div className="w-full relative px-5 grid grid-cols-4 grid-rows-2 gap-2">
      <img
        src={images[0] ?? no_image}
        alt="img-property"
        className="w-full h-full col-span-2 row-span-2 object-cover"
      ></img>
      <img
        src={images[1] ?? no_image}
        alt="img-property"
        className="w-full h-full col-span-1 row-span-1 object-cover"
      ></img>
      <img
        src={images[2] ?? no_image}
        alt="img-property"
        className="w-full h-full col-span-1 row-span-1 object-cover"
      ></img>
      <img
        src={images[3] ?? no_image}
        alt="img-property"
        className="w-full h-full col-span-1 row-span-1 object-cover"
      ></img>
      <img
        src={images[4] ?? no_image}
        alt="img-property"
        className="w-full h-full col-span-1 row-span-1 object-cover"
      ></img>
      <div
        onClick={() => setModel(true, <ImageModel images={images}></ImageModel>)}
        className="flex justify-between items-center bg-white absolute bottom-3 md:right-8 p-2 gap-2 rounded-md hover:bg-opacity-80 transition-all"
      >
        <FaBars></FaBars>
        <button>See more image</button>
      </div>
    </div>
  );
};

export default PropertiesImage;
