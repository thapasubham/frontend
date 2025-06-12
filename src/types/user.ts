export interface userCreate {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
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