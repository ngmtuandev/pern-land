import { Navigation, TopHeader } from "../../components";
import { Outlet } from "react-router-dom";
import withRouter from "../../hocs/withRouter";
import clsx from "clsx";
import { useModelStore } from "../../store/useModelStore";

const LayoutPublic = ({ location }: any) => {
  const { isShowModel }: any = useModelStore();
  return (
    <main className={`${isShowModel && "overflow-hidden h-screen"}`}>
      <TopHeader />
      <Navigation />
      <div className={clsx(location.pathname === "/" ? "pt-0" : "md:pt-[232px] pt-5")}>
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export default withRouter(LayoutPublic);
