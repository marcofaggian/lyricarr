import * as edgedb from "edgedb";
import { existsSync } from "fs";
import { userInfo } from "os";
import { exit } from "process";
import e from "../dbschema/edgeql-js";
import getFiles from "./getFiles";
import logger from "./logger";
import { appendFile, queue } from "./queue";

export const basePath =
  process.env.NODE_ENV === "production" ? "/music" : "/Volumes/music";

(async () => {
  logger.info(`Running with user: ${userInfo().username}`);

  if (!existsSync(basePath)) {
    logger.error(`This path is not accessible: ${basePath}`);
    exit(1);
  }

  logger.info(`Searching for music in ${basePath}`);
  let files = await getFiles(basePath);

  logger.info(`Persisting ${files.length} files`);

  // Append files to queue
  files = files.sort();
  for (const file of files) {
    appendFile(file.split(basePath)[1]);
  }

  const client = await edgedb.createClient();

  // Persist all queue
  for (const filePath in queue) {
    if (Object.prototype.hasOwnProperty.call(queue, filePath)) {
      const song = queue[filePath];

      const query = e
        .insert(e.Song, {
          filePath: song.filePath,
          file: song.file,
          album: e
            .insert(e.Album, {
              name: song.album,
              artist: e
                .insert(e.Artist, {
                  name: song.artist,
                })
                .unlessConflict((artist) => ({
                  on: artist.name,
                  else: artist,
                })),
            })
            .unlessConflict((album) => ({
              on: album.name,
              else: album,
            })),
          artist: e.select(
            e
              .insert(e.Artist, {
                name: song.artist,
              })
              .unlessConflict((artist) => ({
                on: artist.name,
                else: artist,
              }))
          ),
          extension: song.extension,
          lyrics: song.lyrics,
          title: song.title,
        })
        .unlessConflict();

      const res = await query.run(client);
      if (!res?.id) logger.debug({ res, song }, "song not written");

      // if (!song.lyrics) {
      //   await fetchLyrics(song);
      //   markAsWithLyrics(song);
      // }
    }
  }

  // await fetchLyrics(queue[Object.keys(queue)[0]]);
})();
