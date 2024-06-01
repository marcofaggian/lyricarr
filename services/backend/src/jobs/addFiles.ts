import logger from "@/logger";
import { JobResult, queueWrapper } from "@/util/queueWrapper";
import config from "config";
import { addSong } from "./addSong";

type JobPayload = { files: string[] };

const basePath = config.get("basePath") as string;

export const addFiles = queueWrapper<JobPayload, JobResult>(
  "addFiles",
  async (job) => {
    const { files } = job.payload;

    logger.info(`Persisting ${files.length} files`);
    for (const file of files) {
      const path = file.split(basePath)[1];
      if (path) await addSong.enqueue({ path });
    }

    const status = 200;
    return { status };
  }
);
