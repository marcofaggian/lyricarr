import { glob } from "glob";
import logger from "./logger";

const getBlob = (path: string) => `${path}/**/*.+(mp3|m4a|flac|lrc)`;

export default async function getFiles(path: string): Promise<string[]> {
  try {
    return await glob(getBlob(path));
  } catch (err) {
    logger.error(err);

    return [];
  }
}
