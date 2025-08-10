export interface FileInterface {
  originalname: string;
  buffer: Buffer;
  mimeType?: string;
  size: number;
}
