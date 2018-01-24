export enum IdentityType {
  IdCard = 0,
  Insurance,
  Passport,
  Military,
  Other
}

export interface Address {
  id?: number;
  province: string;
  city: string;
  district: string;
  street?: string;
}

export interface Identity {
  identityNo: string;
  identityType: IdentityType;
}

export interface User {
  id?: string;
  email: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  password: string;
  avatar?: string;
  projectIds?: string[];
  taskIds?: string[];
  address?: Address;
  dateOfBirth?: string;
  identity?: Identity;
}
