import logger from "@/logger";
import { JobResult, queueWrapper } from "@/util/queueWrapper";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { QueueType, restartQueue } from "./restartQueue";

const asyncExec = promisify(exec);

type JobPayload = { path: string };

const scheduleRestart = async () => {
  logger.info("Scheduling restart for fetchSongLyrics queue");
  await fetchSongLyrics.stop();
  await restartQueue.schedule(
    { key: "queueJob", cron: "", runAt: new Date(Date.now() + 1000 * 60 * 10) },
    { type: QueueType.fetchSongLyrics }
  );
};

export const fetchSongLyrics = queueWrapper<JobPayload, JobResult>(
  "fetchSongLyrics",
  async (job, prisma) => {
    const { path } = job.payload;

    const song = await prisma.song.findUnique({
      where: { filePath: path },
      include: { album: true, artist: true },
    });
    if (!song) {
      const status = 404;
      logger.debug({ path }, "song not found");
      return { status };
    }

    const command = `glyrc lyrics --artist "${song?.artist.name}" --album "${song?.album.name}" --title "${song.title}" --write "${song.filePath}.lrc"`;

    try {
      logger.debug("Starting Glyrc");
      const execResult = await asyncExec(command, {
        encoding: "utf-8",
      });
      logger.debug({ execResult });

      const { stderr } = execResult;
      if (!!stderr) {
        if (stderr.includes("Writing data to"))
          logger.error({ path }, "Permissions error");

        await scheduleRestart();

        const status = 400;
        return { status };
      }
    } catch (error: any) {
      logger.error({ error }, "Error writing lyrics");
      await scheduleRestart();

      const status = 400;
      return { status };
    }

    logger.info({ title: song.title }, "Persisted lyrics file correctly");

    const status = 200;
    return { status };
  }
);
