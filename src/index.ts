import { existsSync } from "fs";
import { userInfo } from "os";
import { exit } from "process";
import fetchLyrics from "./fetchLyrics";
import getFiles from "./getFiles";
import logger from "./logger";
import { appendFile, queue } from "./queue";

export const basePath =
  process.env.NODE_ENV === "production" ? "/music" : "/Volumes/music";

(async () => {
  logger.info(`Running with user: ${userInfo().username}`);

  if (!existsSync(basePath)) {
    logger.error(`This path is not accessible: ${basePath}`);
    exit(1);
  }

  logger.info(`Searching for music in ${basePath}`);
  let files = await getFiles(basePath);

  logger.info(`Found ${files.length} files`);

  files = files.sort();
  for (const file of files) {
    appendFile(file.split(basePath)[1]);
  }

  // for (const filePath in queue) {
  //   if (Object.prototype.hasOwnProperty.call(queue, filePath)) {
  //     const file = queue[filePath];

  //     if (!file.lyrics) {
  //       await fetchLyrics(file);
  //       markAsWithLyrics(file);
  //     }
  //   }
  // }

  await fetchLyrics(queue[Object.keys(queue)[0]]);
})();
