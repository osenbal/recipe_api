export default interface CloudStorage {
  uploadFileImage(file: any, path: string, metaData?: object): Promise<string>;
  uploadFileVideo(file: any, path: string, metaData?: object): Promise<string>;
  uploadFileAudio(file: any, path: string, metaData?: object): Promise<string>;
  uploadFileDocument(
    file: any,
    path: string,
    metaData?: object
  ): Promise<string>;
}
