export interface userPayload {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role?: number
  isverified?: boolean;
  password?: string;
  confirmPassword?: string;
}

export interface UserFetch{
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  isverified: boolean;
  role: number;
}