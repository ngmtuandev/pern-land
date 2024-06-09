type TUser = {
  avatar: string | null;
  phone: string;
  name: string;
  email: string;
};

type TProperty = {
  images: string[];
  id: number;
  name: string;
  description: string;
  address: string;
  listingType: "RENTAL" | "SALE";
  price: number;
  propertyTypeId: number;
  status: "PENDING" | "AVAILABLE" | "SOLD";
  isAvailable: boolean;
  postedBy: number;
  featuredImage: string;
  bedRoom: number;
  bathRoom: number;
  size: number | null;
  yearBuilt: number;
  owner: number;
  createdAt: string;
  updatedAt: string;
  refUser: TUser;
  refOwner: TUser;
};
