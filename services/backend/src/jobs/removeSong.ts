import logger from "@/logger";
import { JobResult, queueWrapper } from "@/util/queueWrapper";

type JobPayload = { path: string };

export const removeSong = queueWrapper<JobPayload, JobResult>(
  "removeSong",
  async (job, prisma) => {
    const { path } = job.payload;

    logger.debug({ path }, "Removing song");

    await prisma.song.delete({
      where: {
        filePath: path,
      },
    });

    const status = 200;
    return { status };
  }
);
