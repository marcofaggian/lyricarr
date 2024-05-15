import { PrismaClient } from "@/db/generated";
import { existsSync } from "fs";
import { userInfo } from "os";
import { exit } from "process";
import getFiles from "./getFiles";
import { peristSong } from "./jobs/persistSong";
import logger from "./logger";

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
  files = files.sort();

  for (const file of files) {
    const path = file.split(basePath)[1];
    if (path) await peristSong.enqueue({ path });
  }

  logger.info(`Persisting ${files.length} files`);
  await peristSong.start();

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
