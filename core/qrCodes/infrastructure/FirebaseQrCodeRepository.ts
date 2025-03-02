import {
  addDoc,
  collection,
  db,
  getDocs,
  query,
  where,
  orderBy,
} from "@/core/shared/firebaseConfig";
import { IQRCode } from "../domain/qrCode";
import { IQRCodeRepository } from "../domain/qrCodeRepository";

export const FirebaseQrCodeRepository: IQRCodeRepository = {
  createQRCode: async (
    qrCodeData: Omit<IQRCode, "id" | "createdAt" | "updatedAt">
  ): Promise<IQRCode> => {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    if(qrCodeData.folder === undefined) {
      delete qrCodeData.folder;
    }
    const qrCode: Omit<IQRCode, "id"> = { createdAt, updatedAt, ...qrCodeData, scans: 0 };

    const docRef = await addDoc(collection(db, "qrCodes"), qrCode);
    return { id: docRef.id, ...qrCode };
  },

  getAllQRCodeByUserId: async (userId: string): Promise<IQRCode[]> => {
    const q = query(
      collection(db, "qrCodes"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const qrCodes: IQRCode[] = [];
    querySnapshot.forEach((doc) => {
      qrCodes.push({ id: doc.id, ...doc.data() } as IQRCode);
    });
    return qrCodes;
  },
};
