import { create } from "zustand";

export const useModelStore = create((set) => ({
  isShowModel: false,
  contentModel: null,
  isShowMenu: false,
  isMenuContent: true,
  setModel: (isShowModel: boolean, contentModel: any) =>
    set(() => ({
      isShowModel,
      contentModel,
    })),
  setShowMenu: (isShowMenu: boolean) =>
    set(() => ({
      isShowMenu,
    })),
  setIsMenuContent: (isMenuContent: boolean) =>
    set(() => ({
      isMenuContent,
    })),
}));
