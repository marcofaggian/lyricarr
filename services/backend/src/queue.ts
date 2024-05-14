import { PrismaClient } from "@prisma/client/extension";
import { basePath } from "./index";
import logger from "./logger";

export interface SongInQueue {
  filePath: string;
  artist: string;
  album: string;
  file: string;
  title: string;
  extension: string;
  lyrics: boolean;
}

export const queue: { [key: string]: SongInQueue } = {};

export const appendFile = (path: string) => {
  const [extension, ...filePathArray] = path.split(".").reverse();
  const filePath = filePathArray.reverse().join(".");

  if (queue[filePath]) {
    if (extension === "lrc") queue[filePath].lyrics = true;
    else queue[filePath].extension = extension;
    return true;
  }

  const [file, volumeOrAlbum, albumOrArtist, artist] = path
    .split("/")
    .reverse();
  const [_extension, fileName] = file.split(".").reverse();
  const [title] = fileName.split(" - ").reverse();

  queue[filePath] = {
    filePath: basePath + filePath,
    artist: artist ? artist : albumOrArtist,
    album: artist ? albumOrArtist : volumeOrAlbum,
    file,
    title,
    extension,
    lyrics: extension === "lrc",
  };
};

export const persistAllQueue = async (prisma: PrismaClient) => {
  for (const filePath in queue) {
    if (Object.prototype.hasOwnProperty.call(queue, filePath)) {
      const song = queue[filePath];

      const res = await prisma.song.create({
        data: {
          filePath: song.filePath,
          file: song.file,
          album: {
            connectOrCreate: {
              create: {
                name: song.album,
                artist: {
                  connectOrCreate: {
                    create: {
                      name: song.artist,
                    },
                    where: {
                      name: song.artist,
                    },
                  },
                },
              },
              where: {
                name: song.album,
              },
            },
          },
          artist: {
            connectOrCreate: {
              create: {
                name: song.artist,
              },
              where: {
                name: song.artist,
              },
            },
          },
          extension: song.extension,
          lyrics: song.lyrics,
          title: song.title,
        },
      });

      if (!res?.id) logger.debug({ res, song }, "song not written");

      // if (!song.lyrics) {
      //   await fetchLyrics(song);
      //   markAsWithLyrics(song);
      // }
    }
  }
};

export const markAsWithLyrics = (file: SongInQueue) =>
  (queue[file.filePath].lyrics = true);
