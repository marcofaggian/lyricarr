import { Prisma, PrismaClient } from "@/db/generated";
import logger from "@/logger";
import { createQueue } from "@mgcrea/prisma-queue";
import { basePath } from "..";

type JobPayload = { path: string };
type JobResult = { status: number };

export const peristSong = createQueue<JobPayload, JobResult>(
  { name: "persisSong" },
  async (job, prisma: PrismaClient) => {
    const { id, payload } = job;
    logger.debug(
      `Processing job#${id} with payload=${JSON.stringify(payload)})`
    );

    const { path } = payload;

    const [extension, ...filePathArray] = path.split(".").reverse();
    const filePath = basePath + filePathArray.reverse().join(".");

    const song = await prisma.song.findUnique({
      where: {
        filePath,
      },
    });

    if (song) {
      const data: Prisma.SongUpdateInput = {};
      if (extension === "lrc") data.lyrics = true;
      else data.extension = extension;

      await prisma.song.update({
        where: {
          id: song.id,
        },
        data,
      });
    }

    let [file, volumeOrAlbum, albumOrArtist, artist] = path
      .split("/")
      .reverse();
    const fileName = file?.split(".").reverse()[1];
    const title = fileName?.split(" - ").reverse()[0];

    artist = artist ? artist : albumOrArtist;
    const album = artist ? albumOrArtist : volumeOrAlbum;
    const lyrics = extension === "lrc";

    if (file && album && artist && extension && title)
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

    const status = 200;
    logger.debug(`Finished job#${id} with status=${status}`);
    return { status };
  }
);
