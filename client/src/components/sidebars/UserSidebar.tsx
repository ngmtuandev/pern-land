import { userSideBarNavigate } from "../../utils/constant";
import { NavLink } from "react-router-dom";
import icons from "../../utils/icons";
import clsx from "clsx";
import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import avatar_temp from '../../assets/avatar.temp.png'

const {
  MdDashboard,
  BsFillHouseGearFill,
  FaChevronDown,
  FaChevronUp,
  MdCreateNewFolder,
  MdManageSearch,
  CgProfile,
} = icons;

const iconMap: { [key: string]: JSX.Element } = {
  MdDashboard: <MdDashboard size={20} />,
  BsFillHouseGearFill: <BsFillHouseGearFill size={20} />,
  MdCreateNewFolder: <MdCreateNewFolder size={20} />,
  MdManageSearch: <MdManageSearch size={20} />,
  CgProfile: <CgProfile size={28} />,
};

const UserSidebar = () => {
  const [currentSideBar, setCurrentSideBar] = useState<string[]>([]);
  const { current }: any = useUserStore();
  console.log("🚀 ~ UserSidebar ~ current:", current);

  return (
    <div className="w-full py-10 h-screen">
      <div className="w-full flex-col items-center flex justify-center">
        <div className="md:w-20 md:h-20">
            <img className="w-full h-full object-cover rounded-full" src={current?.avatar ? current?.avatar : avatar_temp}></img>
        </div>
        <span className="mt-2">{current?.name}</span>
        <div className="mt-4">
            {
                current?.rolesUser?.map((item : {roleCode: string, value: string}) => {
                    return (
                        <small className="w-10 h-3 rounded-xl bg-white text-gray-800 p-2">{item?.value}</small>
                    )
                })
            }
        </div>
      </div>
      <div className="mt-4">
        {userSideBarNavigate.map((el) => (
          <div className="flex flex-col" key={el.id}>
            {el.type === "single" && (
              <NavLink
                to={el.path!}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 w-full p-4 ",
                    isActive && "bg-opacity-25 border-r-4 border-white"
                  )
                }
              >
                <span>{iconMap[el.icon]}</span>
                <span className="">{el.name}</span>
              </NavLink>
            )}
            {el.type === "parent" && (
              <div>
                <div
                  onClick={() => {
                    if (currentSideBar.includes(el.id)) {
                      setCurrentSideBar(
                        currentSideBar?.filter((item) => item !== el.id)
                      );
                    } else {
                      setCurrentSideBar([...currentSideBar, el.id]);
                    }
                  }}
                  className="flex justify-between cursor-pointer px-2 items-center"
                >
                  <div className="flex items-center gap-2 w-full p-2">
                    <span>{iconMap[el.icon]}</span>
                    <span className="">{el.name}</span>
                  </div>
                  <div>
                    <span className="">
                      {currentSideBar.includes(el.id) ? (
                        <FaChevronUp size={16} />
                      ) : (
                        <FaChevronDown size={16} />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSidebar;
