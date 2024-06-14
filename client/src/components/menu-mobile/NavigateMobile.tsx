import { NavLink } from "react-router-dom";
import { navigations } from "../../utils/constant";
import clsx from "clsx";
import { useModelStore } from "../../store/useModelStore";
import Search from "../search/Search";

const NavigateMobile = () => {
  const { isMenuContent, isShowMenu }: any = useModelStore();
  return (
    <div>
      <div
        className={clsx(
          "flex flex-col items-center gap-5",
          location.pathname === "/"
            ? "text-gray-900 font-semibold"
            : "text-yellow-bold-main font-semibold"
        )}
      >
        {isMenuContent ? (
          navigations.map((item) => (
            <NavLink
              className={({ isActive }) =>
                clsx(isActive && "text-yellow-bold-main font-semibold")
              }
              key={item.id}
              to={item.path}
            >
              {item.text}
            </NavLink>
          ))
        ) : isShowMenu && (
          <div>
            <Search></Search>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigateMobile;
