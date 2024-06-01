import logger from "@/logger";
import { JobResult, queueWrapper } from "@/util/queueWrapper";
import { glob } from "glob";
import { addFiles } from "./addFiles";

type JobPayload = { basePath: string };

const getBlob = (path: string) => `${path}/**/*.+(mp3|m4a|flac|lrc)`;

export const fullScan = queueWrapper<JobPayload, JobResult>(
  "fullScan",
  async (job, prisma) => {
    const { basePath } = job.payload;

    logger.info(`Searching for audio files in ${basePath}`);
    let files = await glob(getBlob(basePath));
    files = files.sort();

    const res = await prisma.song.deleteMany({
      where: {
        filePath: { notIn: files },
      },
    });
    if (res.count) logger.debug(`Removed ${res.count} files from db`);

    await addFiles.enqueue({ files });

    const status = 200;
    return { status };
  }
);
