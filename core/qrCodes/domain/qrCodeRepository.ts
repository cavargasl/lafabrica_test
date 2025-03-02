import { IQRCode } from "./qrCode";

export type IQRCodeRepository = {
  createQRCode: (qrCode: Omit<IQRCode, 'id' | 'createdAt' | 'updatedAt'>) => Promise<IQRCode>;
  getAllQRCodeByUserId: (userId: string) => Promise<IQRCode[]>;
};
