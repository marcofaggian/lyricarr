import { prisma } from "@lyricarr/db";
import config from "config";
import { rmSync } from "node:fs";
import logger from "./logger";
import { fsWatcher, startTasks } from "./startTasks";

let exit_status = 0;
const instanceId = config.get("instanceId") as string;

startTasks()
  .catch(async (e) => {
    logger.error(e);
    exit_status = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    fsWatcher?.close();
    rmSync(`/tmp/${instanceId}/healthy`);
    process.exit(exit_status);
  });
