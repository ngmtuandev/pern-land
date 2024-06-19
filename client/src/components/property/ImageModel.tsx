import { Carousel } from "antd";

const ImageModel = ({ images = [] }) => {
  return (
    <div className="bg-black px-6 bg-opacity-70 w-screen h-screen flex justify-center items-center overflow-hidden">
      <div onClick={(event) => event.stopPropagation()}>
        <Carousel arrows dotPosition="left" infinite={false}>
          {images?.map((item) => (
            <div>
              <img
                className="md:max-w-[800px] object-contain mx-auto"
                src={item}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageModel;
