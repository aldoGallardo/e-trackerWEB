export interface Employee {
  name: string;
  lastName: string;
  userType: string;
  email: string;
  dni: string;
  password: string;
  phoneNumber?: string; // Optional field
  profilePicture?: string; // Optional field
  birthDate: string;
  branchOffice: string;
  dailyAssistance: any[]; // Could be typed more strictly if the shape of this data is known
}
