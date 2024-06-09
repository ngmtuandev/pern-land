import banner from "../../assets/banner.png";
import { Search } from "../../components";
const Home = () => {
  return (
    <div className="w-full">
      <div className="w-full h-fit relative">
        <img src={banner} alt="banner_land" className="w-full" />
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
          <h1 className="text-5xl text-white">Find Your Dream Home</h1>
          <p className="w-[60%] text-center text-white">
            hi các bạn
          </p>
        </div>
      </div>
      <div className="w-main mx-auto">
        <Search></Search>
      </div>
    </div>
  );
};

export default Home;
