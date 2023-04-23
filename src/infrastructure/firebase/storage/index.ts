import app from "..";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import CloudStorage from "@infrastructure/interfaces/storage/cloud-storage";
const storage = getStorage(app);

export class FirebaseStorageServiceImpl implements CloudStorage {
  uploadFileVideo(
    file: any,
    path: string,
    metaData?: object | undefined
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
  uploadFileAudio(
    file: any,
    path: string,
    metaData?: object | undefined
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
  uploadFileDocument(
    file: any,
    path: string,
    metaData?: object | undefined
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
  async uploadFileImage(
    file: any,
    path: string,
    metaData: object = {
      contentType: "image/*",
    }
  ) {
    const storageRef = ref(storage, `${path}/${file.originalname}`);
    const snapshot = await uploadBytes(storageRef, file.buffer, metaData);
    const url = await getDownloadURL(ref(storage, snapshot.ref.fullPath)).then(
      (url) => url
    );
    return url;
  }
}
