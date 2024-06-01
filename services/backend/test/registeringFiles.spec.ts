import logger from "@/logger";
import waitFileExists from "@/util/waitFileExists";
import test from "ava";
import cuid from "cuid";
import { ChildProcess, exec, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const instanceId = cuid();
const dir_path = path.join(`/tmp`, instanceId);
let child: ChildProcess | undefined;

test.before(async () => {
  fs.mkdirSync(dir_path);
  fs.writeFileSync(path.join(dir_path, "file.wav"), "");
  execSync(`yarn workspace @lyricarr/db db:migration:apply`);
  child = exec(`yarn start`);
  await waitFileExists(path.join(dir_path, "healthy"));
});

test("can register", (t) => {
  //TODO: poll until a query for files returns the correct path
});

test("can detect changes and register new files", () => {
  fs.writeFileSync(path.join(dir_path, "file2.wav"), "");
  // TODO: poll again like previous test, but for new path
});

test.after("cleanup", (t) => {
  fs.rmdirSync(dir_path);
  const killed_succesfully = child?.kill();
  if (killed_succesfully) logger.debug("child process killed successfully");
  execSync(`yarn workspace @lyricarr/db db:reset --force`);
});
