import { exec } from "child_process";
import { promisify } from "util";
import logger from "./logger";
import { SongInQueue } from "./queue";

const asyncExec = promisify(exec);

const buildCommand = (file: SongInQueue) =>
  `glyrc lyrics --artist "${file.artist}" --album "${file.album}" --title "${file.title}" --write "${file.filePath}.lrc"`;

export default async function fetchLyrics(file: SongInQueue) {
  try {
    logger.debug("Starting Glyrc");
    const execResult = await asyncExec(buildCommand(file), {
      encoding: "utf-8",
    });
    logger.debug({ execResult });

    const { stderr } = execResult;
    if (!!stderr) {
      if (stderr.includes("Writing data to"))
        logger.error({ path: file.filePath }, "Permissions error");
      return false;
    }

    return true;
  } catch (error: any) {
    logger.error(
      {
        error,
      },
      "Error writing lyrics"
    );
    return false;
  }
}
