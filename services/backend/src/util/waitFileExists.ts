import { existsSync } from "node:fs";

export default function waitFileExists(path: string, interval = 1000) {
  return new Promise<void>((res, rej) => {
    const timerId = setInterval(() => {
      if (existsSync(path)) {
        res();
        clearInterval(timerId);
      }
    }, interval);
  });
}
