import { exec } from "child_process";
import { promisify } from "util";
import logger from "./logger";
import { MusicFile } from "./queue";

const asyncExec = promisify(exec);

const buildCommand = (file: MusicFile) =>
  `glyrc lyrics --artist "${file.artist}" --album "${file.album}" --title "${file.title}" --write "${file.filePath}.lrc"`;

export default async function fetchLyrics(file: MusicFile) {
  try {
    logger.debug("Starting Glyrc");
    const execResult = await asyncExec(buildCommand(file), {
      encoding: "utf-8",
    });
    logger.debug({ execResult });

    const { stderr, stdout } = execResult;
    if (!!stderr || stdout.includes("Error")) return false;

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
