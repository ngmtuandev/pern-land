import { Fragment } from "react";
import { useModelStore } from "../../store/useModelStore";
import icons from "../../utils/icons";
import NavigateMobile from "./NavigateMobile";
import { useUserStore } from "../../store/useUserStore";
import { menuConstant } from "../../utils/constant";
import { Link } from "react-router-dom";
import Button from "../commons/Button";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import Login from "../author/Login";

interface IRoleUser {
  roleCode: string;
  value: string;
}

interface User {
  name: string;
  phone: string;
  rolesUser: IRoleUser[];
}

interface UserStore {
  current: User | null;
  logout: () => void;
}
const Menu = () => {
  const {
    isShowMenu,
    setShowMenu,
    setModel,
    setIsMenuContent,
    isMenuContent,
  }: any = useModelStore();
  const { IoMdClose, FaBars, FaSearch } = icons;
  const { current, logout } = useUserStore() as UserStore;
  return (
    <div
      className={`absolute lg:hidden z-50 bg-opacity-80 top-0 w-full transition-all duration-500 ${
        !isShowMenu && "-left-[900px]"
      } h-[1000px] z-70 bg-gray-200`}
    >
      <div className="flex justify-between items-center top-0 p-8 bg-gray-400 bg-opacity-40">
        <div onClick={() => setShowMenu(!isShowMenu)} className="">
          <IoMdClose color="gray" size={40}></IoMdClose>
        </div>
        <div>
          {isMenuContent ? (
            <div
              className="cursor-pointer"
              onClick={() => setIsMenuContent(false)}
            >
              <FaSearch color="gray" size={24}></FaSearch>
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => setIsMenuContent(true)}
            >
              <FaBars color="gray" size={24}></FaBars>
            </div>
          )}
          {current && (
            <div className="absolute top-full z-50 right-0 bg-white p-4 flex rounded-sm drop-shadow-sm flex-col text-black">
              {menuConstant?.map((el) => (
                <Fragment key={el?.id}>
                  {current?.rolesUser?.some(
                    (role: IRoleUser) => role?.roleCode === el?.code
                  ) && (
                    <Link className="px-4 py-2 hover:bg-gray-100" to={el.path}>
                      {el.name}
                    </Link>
                  )}
                </Fragment>
              ))}
              <span
                onClick={() => logout()}
                className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
              >
                Logout
              </span>
            </div>
          )}
          {!current && (
            <Button
              handleOnClick={() => setModel(true, <Login />)}
              styleCss={twMerge(
                clsx(
                  location.pathname === "/" &&
                    "bg-transparent border border-white"
                )
              )}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
      <div className="mt-6">
        <NavigateMobile></NavigateMobile>
      </div>
    </div>
  );
};

export default Menu;
