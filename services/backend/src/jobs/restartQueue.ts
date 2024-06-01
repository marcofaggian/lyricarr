import { JobResult, queueWrapper } from "@/util/queueWrapper";
import { addFiles } from "./addFiles";
import { addSong } from "./addSong";
import { fetchSongLyrics } from "./fetchSongLyrics";
import { fullScan } from "./fullScan";
import { removeSong } from "./removeSong";

export enum QueueType {
  addFiles,
  addSong,
  fetchSongLyrics,
  fullScan,
  removeSong,
}

type JobPayload = { type: QueueType };

export const restartQueue = queueWrapper<JobPayload, JobResult>(
  "restartQueue",
  async (job) => {
    const { type } = job.payload;

    switch (type) {
      case QueueType.addFiles:
        await addFiles.start();
        break;
      case QueueType.addSong:
        await addSong.start();
        break;
      case QueueType.fetchSongLyrics:
        await fetchSongLyrics.start();
        break;
      case QueueType.fullScan:
        await fullScan.start();
        break;
      case QueueType.removeSong:
        await removeSong.start();
        break;
    }

    const status = 200;
    return { status };
  }
);
