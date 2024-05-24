import icons from "../../utils/icons";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import withRouter from "../../hocs/withRouter";
import avatar from "../../assets/avatar.svg";
import { useUserStore } from "../../store/useUserStore";
const TopHeader = ({ location }: any) => {
  const { IoMailUnread } = icons;
  const { current } = useUserStore();
  console.log('currentttt', current)
  return (
    <div
      className={twMerge(
        clsx(
          `px-[100px] text-white border-b border-white py-[26px] h-[85px] 
    bg-transparent flex items-center justify-between fixed z-50 w-full top-0`,
          !(location.pathname === "/") && "bg-yellow-bold-main"
        )
      )}
    >
      <span className="flex items-center gap-2">
        <IoMailUnread size={24}></IoMailUnread>
        {current && current?.name}
      </span>
      <div className="flex justify-center cursor-pointer items-center gap-5">
        <div className="border-r-2 pr-3 flex flex-col">
          <span>{current && current?.phone}</span>
          <span>{current && current?.name}</span>
        </div>
        <div>
          <img className="w-10 h-10" src={avatar}></img>
        </div>
      </div>
    </div>
  );
};

export default withRouter(TopHeader);
