import * as fs from "fs";
import * as path from "path";

export function loadEnv() {
  const envPath = path.resolve(__dirname, "../../.env");
  const envData = fs.readFileSync(envPath, "utf8");
  const env: { [key: string]: string } = {};

  envData.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      env[key.trim()] = value.trim();
    }
  });

  return env;
}
