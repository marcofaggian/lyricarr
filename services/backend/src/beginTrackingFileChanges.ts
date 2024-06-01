import chokidar from "chokidar";
import { addSong } from "./jobs/addSong";
import { removeSong } from "./jobs/removeSong";
import logger from "./logger";

const onFileAdd = async (path: string) => {
  logger.debug({ path }, "File added");
  await addSong.enqueue({ path });
};

const onFileChanged = async (path: string) => {
  logger.debug({ path }, "File changed");
};

const onFileRemove = async (path: string) => {
  logger.debug({ path }, "File removed");
  await removeSong.enqueue({ path });
};

const onError = (error: Error) =>
  logger.error({ error }, "error watching files");

export const beginTrackingFileChanges = (path: string) =>
  chokidar
    .watch(path, { ignoreInitial: true, persistent: true })
    .on("add", onFileAdd)
    .on("change", onFileChanged)
    .on("unlink", onFileRemove)
    .on("error", onError);
