import { create } from "zustand";

export const useModelStore = create((set) => ({
    isShowModel: false,
    contentModel: null,
    isShowMenu: false,
    setModel: (isShowModel : boolean, contentModel: any) => set(() => (
        {
            isShowModel,
            contentModel
        }
    )),
    setShowMenu: (isShowMenu: boolean) => set(() => (
        {
            isShowMenu
        }
    ))
}))