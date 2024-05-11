import { execSync } from "child_process";
import { MusicFile } from "./queue";

const buildCommand = (file: MusicFile) =>
  `glyrc lyrics --artist "${file.artist}" --album "${file.album}" --title "${file.title}" --write "${file.filePath}.lrc"`;

export default function fetchLyrics(file: MusicFile) {
  try {
    execSync(buildCommand(file), {
      encoding: "utf-8",
    });

    return true;
  } catch (error: any) {
    console.log(
      "Error writing lyrics",
      error.status, // Might be 127 in your example.
      error.message // Holds the message you typically want.
      //   error.stderr, // Holds the stderr output. Use `.toString()`.
      //   error.stdout // Holds the stdout output. Use `.toString()`.
    );
    return false;
  }
}
