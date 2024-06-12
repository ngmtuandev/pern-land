import banner from "../../assets/banner.png";
import { Menu, Search } from "../../components";
import icons from "../../utils/icons";
import { useModelStore } from "../../store/useModelStore";

const Home = () => {
  
  const { isShowMenu, setShowMenu }: any = useModelStore()
  const { FaBars } = icons;


  return (
    <div className="w-full">
      <div className="w-full h-fit relative">
        <div
          onClick={() => setShowMenu(!isShowMenu)}
          className="sm:block block z-50 cursor-pointer sm:cursor-pointer lg:hidden absolute left-0 top-0 p-8"
        >
          {!isShowMenu && <FaBars color="white" size={30}></FaBars>}
        </div>
        {isShowMenu && <Menu></Menu>}
        <img src={banner} alt="banner_land" className="lg:w-full sm:w-full" />
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
          <h1 className="text-5xl hidden text-white sm:hidden lg:block">
            Find Your Dream Home
          </h1>
          <p className="w-[60%] hidden sm:hidden lg:block text-center text-white">
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
