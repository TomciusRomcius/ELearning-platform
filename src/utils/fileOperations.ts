import fs from "node:fs/promises";
import path from "node:path";

const rootPath = path.resolve();
const publicPath = path.join(rootPath, 'public');

export async function uploadFile(fileName: string, file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`./public/uploads/${fileName}${path.extname(file.name)}`, buffer);
}