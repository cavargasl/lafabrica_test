import { IQRCode } from "../domain/qrCode";
import { IQRCodeRepository } from "../domain/qrCodeRepository";

export const QRCodeService = (repository: IQRCodeRepository) => ({
  createQRCode: async (qrCodeData: Omit<IQRCode, 'id' | 'createdAt' | 'updatedAt'>): Promise<IQRCode> => {
    return await repository.createQRCode(qrCodeData);
  },
  getAllQRCodeByUserId: async (userId: string): Promise<IQRCode[]> => {
    return await repository.getAllQRCodeByUserId(userId);
  }
});
