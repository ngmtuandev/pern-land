type TGetUserCurrent = {
    id: string;
    name: string;
    phone: string | number;
    email?: string;
    address?: string;
    password: string; 
    role?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  };