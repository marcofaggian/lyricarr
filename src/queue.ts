import { basePath } from "./index";

export interface MusicFile {
  filePath: string;
  artist: string;
  album: string;
  file: string;
  title: string;
  extension: string;
  lyrics: boolean;
}

export const queue: { [key: string]: MusicFile } = {};

export const appendFile = (path: string) => {
  const [filePath, extension] = path.split(".");

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
    artist: artist ?? albumOrArtist,
    album: artist ? albumOrArtist : volumeOrAlbum,
    file,
    title,
    extension,
    lyrics: extension === "lrc",
  };
};

export const markAsWithLyrics = (file: MusicFile) =>
  (queue[file.filePath].lyrics = true);
