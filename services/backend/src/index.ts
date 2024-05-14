import { PrismaClient } from "@/db/generated";
import { existsSync } from "fs";
import { userInfo } from "os";
import { exit } from "process";
import getFiles from "./getFiles";
import logger from "./logger";
import { appendFile, persistAllQueue } from "./queue";

const prisma = new PrismaClient();

export const basePath =
  process.env.NODE_ENV === "production" ? "/music" : "/Volumes/music";

const main = async () => {
  logger.info(`Running with user: ${userInfo().username}`);

  await prisma.$connect();
  logger.debug("Connected to db");

  if (!existsSync(basePath)) {
    logger.error(`This path is not accessible: ${basePath}`);
    exit(1);
  }

  logger.info(`Searching for music in ${basePath}`);
  let files = await getFiles(basePath);

  logger.info(`Persisting ${files.length} files`);

  // Append files to queue
  files = files.sort();
  for (const file of files) {
    appendFile(file.split(basePath)[1]);
  }

  // Persist all queue
  await persistAllQueue(prisma);

  // await fetchLyrics(queue[Object.keys(queue)[0]]);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
