import { Carousel } from "nuka-carousel";
const ImageModel = ({ images = [], slideToShow = 1, slideToScroll = 1 }) => {
  return (
    <div className="bg-overlay-50 w-screen h-screen mt-[12%] overflow-hidden">
      <div className="" onClick={(e) => e.stopPropagation()}>
        <Carousel className="w-full h-full" showDots showArrows keyboard={false}>
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
