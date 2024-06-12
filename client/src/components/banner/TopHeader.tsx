import icons from "../../utils/icons";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import withRouter from "../../hocs/withRouter";
import avatar from "../../assets/avatar.svg";
import { useUserStore } from "../../store/useUserStore";
import { Fragment, useEffect, useRef, useState } from "react";
import { menuConstant } from "../../utils/constant";
import { Link } from "react-router-dom";

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

const TopHeader = ({ location }: any) => {
  const { IoMailUnread } = icons;
  const { current, logout } = useUserStore() as UserStore;
  const [isShow, setIsShow] = useState(false);

  const refMenu = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickMenu = (e: MouseEvent) => {
      if (refMenu.current?.contains(e.target as Node)) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };
    window.addEventListener("click", handleClickMenu);
    return () => {
      window.removeEventListener("click", handleClickMenu);
    };
  }, []);

  return (
    <div
      className={twMerge(
        clsx(
          `px-[100px] text-white border-b border-white py-[26px] h-[85px] 
    bg-transparent hidden sm:hidden lg:flex items-center justify-between fixed z-50 w-full top-0`,
          !(location.pathname === "/") && "bg-yellow-bold-main"
        )
      )}
    >
      {current && (
        <span className="flex items-center gap-2">
          <IoMailUnread size={24}></IoMailUnread>
          {current?.name}
        </span>
      )}
      <div
        ref={refMenu}
        onClick={() => setIsShow(true)}
        className="relative flex justify-center cursor-pointer items-center gap-5"
      >
        <div className="border-r-2 pr-3 flex flex-col">
          <span>{current && current?.phone}</span>
          <span>{current && current?.name}</span>
        </div>
        <div>
          <img className="w-10 h-10" src={avatar}></img>
        </div>
        {current && isShow && (
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
      </div>
    </div>
  );
};

export default withRouter(TopHeader);
