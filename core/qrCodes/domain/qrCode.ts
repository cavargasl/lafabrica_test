export interface IQRCode {
  id: string;
  userId: string;
  name: string;
  description: string;
  data: string;
  createdAt: string;
  updatedAt: string;
  type: "url" | "text" | "email" | "phone" | "location" | "wifi" | "event" | "product" | "other";
  folder?: string;
  imageUrl?: string;  
  scans: number;
}