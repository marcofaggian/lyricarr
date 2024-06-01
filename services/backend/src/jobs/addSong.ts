import logger from "@/logger";
import { pathParser } from "@/util/pathParser";
import { JobResult, queueWrapper } from "@/util/queueWrapper";
import { Prisma } from "@lyricarr/db";
import { fetchSongLyrics } from "./fetchSongLyrics";

type JobPayload = { path: string };

export const addSong = queueWrapper<JobPayload, JobResult>(
  "addSong",
  async (job, prisma) => {
    const { path } = job.payload;
    const { file, filePath, album, artist, extension, title, lyrics } =
      pathParser(path);

    // Look for song
    const song = await prisma.song.findUnique({
      where: {
        filePath,
      },
    });

    if (song) {
      logger.debug({ song }, "Song already tracked");
      const data: Prisma.SongUpdateInput = {};
      if (extension === "lrc" && !song.lyrics) data.lyrics = true;
      else if (extension !== song.extension) data.extension = extension;

      if (Object.keys(data).length > 0) {
        await prisma.song.update({
          where: {
            id: song.id,
          },
          data,
        });
        logger.debug({ data }, "Song updated");
      }

      const status = 200;
      return { status };
    }

    if (!file || !album || !artist || !extension || !title) {
      const status = 400;
      logger.error(
        { filePath, file, album, artist, extension, title },
        "Error parsing filePath"
      );
      return { status };
    }

    await prisma.song.create({
      data: {
        filePath,
        file,
        album: {
          connectOrCreate: {
            create: {
              name: album,
              artist: {
                connectOrCreate: {
                  create: {
                    name: artist,
                  },
                  where: {
                    name: artist,
                  },
                },
              },
            },
            where: {
              name: album,
            },
          },
        },
        artist: {
          connectOrCreate: {
            create: {
              name: artist,
            },
            where: {
              name: artist,
            },
          },
        },
        extension,
        lyrics,
        title,
      },
    });

    await fetchSongLyrics.enqueue({ path: filePath });

    const status = 200;
    return { status };
  }
);
