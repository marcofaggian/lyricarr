import logger from "@/logger";
import { PrismaClient, prisma } from "@lyricarr/db";
import { PrismaJob, createQueue } from "@mgcrea/prisma-queue";

export type JobPayload = {};
export type JobResult = { status: number };

export const queueWrapper = <P extends JobPayload, R extends JobResult>(
  name: string,
  exec: (job: PrismaJob<P, R>, prisma: PrismaClient) => Promise<R>
) =>
  createQueue<P, R>({ name, prisma }, async (job) => {
    logger.debug(`Processing ${name} job ${job.id}`);

    const result = await exec(job, prisma);

    if (result.status!!)
      logger.debug(
        `Finished ${name} job ${job.id} with status=${result.status}`
      );
    return result;
  });
