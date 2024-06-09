import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../input/InputForm";
import Button from "../commons/Button";
import InputRadio from "../input/InputRadio";
import { apiRegister, apiSignIn } from "../../apis/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import withRouter from "../../hocs/withRouter";
import { useModelStore } from "../../store/useModelStore";
import { useUserStore } from "../../store/useUserStore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from "../../utils/firebase.config";
import VerifyOTP from "../verify/VerifyOTP";

interface IRole {
  value: string;
  code: string;
}

declare global {
  interface Window {
    recaptchaVerifier?: any;
    confirmationResult?: any;
  }
}

const Login = () => {
  const [varient, setVarient] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const [hasSendedOTP, setHasSendedOTP] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const { setModel }: any = useModelStore();
  const { handleSetToken, roles }: any = useUserStore();

  const handleLoading = (flag: boolean) => setIsLoading(flag);

  useEffect(() => {
    reset();
  }, [varient]);

  const handleConfirmCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {}
      );
    }
    return window.recaptchaVerifier;
  };

  const handleSendOTP = (phoneNumber: string) => {
    const formatPhoneNumber = "+84" + phoneNumber.slice(1);

    setIsLoading(true);
    const appVerifier = handleConfirmCaptchaVerify();

    signInWithPhoneNumber(auth, formatPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        setIsLoading(false);
        setHasSendedOTP(true);
        window.confirmationResult = confirmationResult;
        toast.success("Send OTP verify success");
      })
      .catch(() => {
        setIsLoading(false);
        setHasSendedOTP(false);
        toast.error("Send OTP verify failure");
      });
  };

  const handleOnSubmitSuccess = async (data: any) => {
    handleLoading(true);
    if (varient === "REGISTER") {
      if (data && data?.role !== "ROLE4") {
        handleSendOTP(data?.phone);
      }
    } else {
      const { name, role, ...payload } = data;
      handleLoading(true);
      const response: any = await apiSignIn(payload);
      handleLoading(false);

      if (response?.statusCode! === 200) {
        handleSetToken(response?.accessToken);
        toast.success("Login success");
        setModel(false, null);
      } else {
        toast.error("Login failure");
      }
    }
  };

  const handleRegisterValidated = async (data: {
    phone: string;
    password: string;
    name: string;
  }) => {
    const response: any = await apiRegister(data);
    handleLoading(false);
    const rs: any = response.data as { message: string };
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Register account successfully",
        showConfirmButton: true,
        confirmButtonText: "Go to Login",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setHasSendedOTP(false);
          setVarient("LOGIN");
        }
      });
      return;
    } else {
      toast.error(rs?.message);
      return;
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-md px-6 py-12 relative items-center w-[500px] flex flex-col gap-6"
    >
      {hasSendedOTP && (
        <div className="absolute inset-0 flex justify-center items-center">
          <VerifyOTP
            handleSuccess={() =>
              handleRegisterValidated(
                getValues() as { phone: string; password: string; name: string }
              )
            }
          ></VerifyOTP>
        </div>
      )}
      <div id="recaptcha-container"></div>
      <h1 className="text-3xl font-semibold tracking-tight font-agbalumo text-gray-700">
        Welcome to Land
      </h1>
      <div className="flex justify-start w-full border-b gap-6">
        <span
          onClick={() => setVarient("LOGIN")}
          className={clsx(
            varient === "LOGIN" &&
              "border-b-2 border-yellow-bold-main cursor-pointer",
            "cursor-pointer"
          )}
        >
          Login
        </span>
        <span
          onClick={() => setVarient("REGISTER")}
          className={clsx(
            varient === "REGISTER" &&
              "border-b-2 border-yellow-bold-main cursor-pointer",
            "cursor-pointer"
          )}
        >
          New Account
        </span>
      </div>
      <form className="flex flex-col w-full px-4">
        <InputForm
          label="Phone Number"
          inputClassName="rounded-md"
          register={register}
          id="phone"
          placeholder="Type your phone number here"
          errors={errors}
          validate={{
            required: "Must be full",
            pattern: {
              value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Phone number invalid !",
            },
          }}
        ></InputForm>
        <InputForm
          label="Password"
          inputClassName="rounded-md"
          register={register}
          id="password"
          placeholder="Password your number here"
          errors={errors}
          type="password"
          validate={{ required: "Must be full" }}
        ></InputForm>
        {varient === "REGISTER" && (
          <InputForm
            label="Your Fullname"
            inputClassName="rounded-md"
            register={register}
            id="name"
            placeholder="Type your fullname number here"
            errors={errors}
            validate={{ required: "Must be full" }}
          ></InputForm>
        )}
        {varient === "REGISTER" && (
          <InputRadio
            label="Type Account"
            register={register}
            id="role"
            validate={{ required: "Must be full" }}
            options={roles
              ?.filter((el: IRole) => el.value !== "Admin")
              ?.map((el: IRole) => ({ label: el?.value, value: el?.code }))}
          ></InputRadio>
        )}
        <div className="mt-2">
          <Button
            isLoading={isLoading}
            handleOnClick={handleSubmit(handleOnSubmitSuccess)}
            containerClassName="w-full"
          >
            {varient === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
