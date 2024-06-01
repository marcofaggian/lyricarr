import test from "ava";
import { pathParser } from "./pathParser";

const cases = [
  {
    path: "/music/Johann Sebastian Bach/Bach - Passionsoratorium, Bwv Anh. 169 (2024)/Johann Sebastian Bach - Bach - Passionsoratorium, Bwv Anh. 169 - 34 - Passionsoratorium, Bwv Anh. 169 (Reconstructed By Alexander Grychtolik), Pt. I - No. 1. Aria, Sammelt Euch, Getreue Seelen (Zion) (Alternative Opening Movement According To Pic....flac",
    artist: "Johann Sebastian Bach",
    album: "Bach - Passionsoratorium, Bwv Anh. 169 (2024)",
    title:
      "No. 1. Aria, Sammelt Euch, Getreue Seelen (Zion) (Alternative Opening Movement According To Pic...",
    extension: "flac",
  },
];

test("should parse correctly file paths", (t) =>
  cases.forEach(({ album, artist, extension, path, title }) => {
    const parsed = pathParser(path);
    t.is(parsed.album, album, "Album");
    t.is(parsed.artist, artist, "Artist");
    t.is(parsed.title, title, "Title");
    t.is(parsed.extension, extension, "Extension");
  }));
