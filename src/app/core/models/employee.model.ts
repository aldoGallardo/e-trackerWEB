// src/core/models/employee.model.ts
export interface Employee {
  userId: string;
  name: string;
  lastName: string;
  email: string;
  userNumber: number;
  dni: string;
  password: string;
  phoneNumber?: string;
  profilePicture?: string;
  birthDate: string;
  branchOffice: string;
  userType: string;
}
