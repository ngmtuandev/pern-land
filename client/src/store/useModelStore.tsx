import { create } from "zustand";

export const useModelStore = create((set) => ({
    isShowModel: false,
    contentModel: null,
    setModel: (isShowModel : boolean, contentModel: any) => set(() => (
        {
            isShowModel,
            contentModel
        }
    ))
}))