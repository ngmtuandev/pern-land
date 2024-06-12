import { NavLink } from "react-router-dom";
import { navigations } from "../../utils/constant";
import clsx from "clsx";

const NavigateMobile = () => {
  return (
    <div>
      <div
        className={clsx(
          "flex flex-col items-center gap-5",
          location.pathname === "/" ? "text-gray-900 font-semibold" : "text-yellow-bold-main font-semibold"
        )}
      >
        {navigations.map((item) => (
          <NavLink
            className={({ isActive }) =>
              clsx(isActive && "text-yellow-bold-main font-semibold")
            }
            key={item.id}
            to={item.path}
          >
            {item.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavigateMobile;
