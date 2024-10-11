export interface ActivityType {
  id: string;
  name: string;
  description?: string;
  estimatedTime: number;
  neededSupplies: string[];
}
