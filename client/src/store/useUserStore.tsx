import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiGetUser } from "../apis/user";

export const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      current: null,
      handleSetToken: (token : string) => 
        set(() => (
            {
                token
            }
        )),
      getUserCurrent: async () => {
        // console.log('call api')
          const rs = await apiGetUser() as { statusCode?: number, success?: boolean, message?: string, userCurrent?: TGetUserCurrent };
          if (rs?.success) {
            return set(() => ({current: rs?.userCurrent}))
          }
        }
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