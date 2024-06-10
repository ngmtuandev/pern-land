import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import ERole from "../../utils/role";
import Swal from "sweetalert2";
import { useModelStore } from "../../store/useModelStore";
import Login from "../../components/author/Login";

const UserLayout = () => {
  const { current }: any = useUserStore();
  const { setModel } : any = useModelStore();

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
        setModel(true, <Login/>)
      })
    }
  }, [current]);

  return (
    <>
      {current &&
        current?.rolesUser?.some(
          (item: any) => item?.roleCode === ERole.CUSTOMER
        ) && <div>UserLayout</div>}
    </>
  );
};

export default UserLayout;
