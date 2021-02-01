import { fileURLToPath } from 'url';
import path from "path";
export function getPaths(fileUrl) {
  const __filename = fileURLToPath(fileUrl);
  const __dirname = path.dirname(__filename);
  return { __filename, __dirname };
}