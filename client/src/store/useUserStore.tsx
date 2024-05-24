import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiGetRole, apiGetUser } from "../apis/user";

export const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      current: null,
      roles: null,
      handleSetToken: (token: string) =>
        set(() => ({
          token,
        })),
      getUserCurrent: async () => {
        const rs = (await apiGetUser()) as {
          statusCode?: number;
          success?: boolean;
          message?: string;
          userCurrent?: TGetUserCurrent;
        };
        if (rs?.success) {
          return set(() => ({ current: rs?.userCurrent }));
        } else {
          localStorage.removeItem("land_user");
          return set(() => ({ current: null }));
        }
      },
      getRoles: async () => {
        const rs = (await apiGetRole()) as any;
        if (rs?.success) {
          return set(() => ({ roles: rs?.data }));
        }
        return set(() => ({ roles: null }));
      },
      logout: () => {
        return set(() => ({ token: null, current: null }));
      },
    }),
    {
      name: "land_user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        if (typeof state !== "object" || state === null) {
          return {};
        }

        return Object.fromEntries(
          Object.entries(state).filter(
            (el) => el[0] === "token" || el[0] === "current"
          )
        );
      },
    }
  )
);
