import { ERROR_TYPE } from "@/backend/utils/errorTypes";
import { isAdmin } from "@/backend/utils/isAdmin";
import fs from "node:fs/promises";


export async function uploadFile(fileName: string, file: File) {
  if (!await isAdmin())
    throw ERROR_TYPE.unauthorized;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`./public/uploads/${fileName}`, buffer);
}