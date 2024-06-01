import { prisma } from "@lyricarr/db";
import { FSWatcher } from "chokidar";
import config from "config";
import { existsSync, writeFileSync } from "fs";
import { userInfo } from "os";
import { exit } from "process";
import { beginTrackingFileChanges } from "./beginTrackingFileChanges";
import { addFiles } from "./jobs/addFiles";
import { addSong } from "./jobs/addSong";
import { fetchSongLyrics } from "./jobs/fetchSongLyrics";
import { fullScan } from "./jobs/fullScan";
import { removeSong } from "./jobs/removeSong";
import { restartQueue } from "./jobs/restartQueue";
import logger from "./logger";

const basePath = config.get("basePath") as string;
const instanceId = config.get("instanceId") as string;

export let fsWatcher: FSWatcher;

export const startTasks = async () => {
  logger.debug(`Running with user: ${userInfo().username}`);

  await prisma.$connect();
  logger.debug("Connected to db");

  if (!existsSync(basePath)) {
    logger.error(`The configured path is not accessible: ${basePath}`);
    exit(1);
  }

  await fullScan.enqueue({ basePath });

  fullScan.start();
  addSong.start();
  removeSong.start();
  addFiles.start();
  fetchSongLyrics.start();
  restartQueue.start();

  fsWatcher = beginTrackingFileChanges(basePath);

  writeFileSync(`/tmp/${instanceId}/healthy`, "");
  logger.debug("Startup completed");
};
