import config from "config";
import pino from "pino";

export default pino({
  level: config.get("logging.level"),
});
