export interface Employee {
  id?: string;
  name: string;
  lastName: string;
  dni: string;
  branchOffice: string;
  userType: string;
  profilePicture: string;
  journey?: boolean;
  contract?: boolean;
  email: string;
  userNumber?: number;
  phoneNumber: string;
  birthDate: string;
  password: string;
}
