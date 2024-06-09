import instanceAxios from "../axios";

type TRegister = {
  password: string;
  name: string;
  phone: string | number;
};

type TLogin = {
    password: string;
    phone: string | number;
  };

export const apiRegister = (data: TRegister) =>
  instanceAxios({
    url: "/auth/register",
    method: "POST",
    data,
  });

export const apiSignIn = (data: TLogin) =>
  instanceAxios({
    url: "/auth/sign-in",
    method: "POST",
    data,
  });
