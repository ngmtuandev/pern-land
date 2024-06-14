import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import ERole from "../../utils/role";
import Swal from "sweetalert2";
import { useModelStore } from "../../store/useModelStore";
import Login from "../../components/author/Login";
import { Outlet } from "react-router-dom";
import { UserSidebar } from "../../components";

const UserLayout = () => {
  const { current }: any = useUserStore();
  const { setModel }: any = useModelStore();

  useEffect(() => {
    if (
      !current &&
      !current?.rolesUser?.some(
        (item: any) => item?.roleCode === ERole.CUSTOMER
      )
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please login !!",
        showConfirmButton: true,
        confirmButtonText: "Go to Login",
      }).then(() => {
        setModel(true, <Login />);
      });
    }
  }, [current]);

  return (
    <>
      {current &&
        current?.rolesUser?.some(
          (item: any) => item?.roleCode === ERole.CUSTOMER
        ) && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2 bg-yellow-bold-main text-white w-full h-screen max-h-screen overflow-y-auto">
              <UserSidebar></UserSidebar>
            </div>
            <div className="col-span-10 max-h-screen overflow-y-auto">
              <Outlet></Outlet>
            </div>
          </div>
        )}
    </>
  );
};

export default UserLayout;
