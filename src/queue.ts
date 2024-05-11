import { basePath } from "./index";

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

export const markAsWithLyrics = (file: SongInQueue) =>
  (queue[file.filePath].lyrics = true);
