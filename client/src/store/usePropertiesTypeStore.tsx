import { create } from "zustand";
import { apiGetPropertyType } from "../apis/propertyType";

export const usePropertiesTypeStore = create((set) => ({
  propertiesType: [],
  getPropertiesType: async (params: string | any) => {
    const response = (await apiGetPropertyType(params)) as {
      statusCode?: number;
      success?: boolean;
      message?: string;
      data?: TPropertiesType;
    };
    if (response?.success) {
      return set(() => ({ propertiesType: response?.data }));
    } else {
      localStorage.removeItem("land_user");
      return set(() => ({ propertiesType: [] }));
    }
  },
}));
