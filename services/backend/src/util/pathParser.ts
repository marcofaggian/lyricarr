import config from "config";

export const pathParser = (pathWithoutBasePath: string) => {
  const basePath = config.get("basePath") as string;

  if (pathWithoutBasePath.includes(basePath))
    pathWithoutBasePath = pathWithoutBasePath.slice(basePath.length);

  const [extension, ...filePathArray] = pathWithoutBasePath
    .split(".")
    .reverse();
  const filePath = basePath + filePathArray.reverse().join(".");

  // Parse file path
  let [file, volumeOrAlbum, albumOrArtist, artist] = pathWithoutBasePath
    .split("/")
    .reverse();
  const album = artist ? albumOrArtist : volumeOrAlbum;
  artist = !!artist?.length ? artist : albumOrArtist;

  const fileName = file?.split(".").reverse().slice(1).reverse().join(".");
  const title = fileName?.split(" - ").reverse()[0];
  const lyrics = extension === "lrc";

  return { file, album, artist, extension, title, filePath, lyrics };
};
