import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'comment-json';
import { validateConfig } from './parse';

const CONFIG_FOLDER_NAME = '.lansa';

/**
 * Read the configuration from the given directory.
 */
export async function readConfig(cwd: string) {
  let configFolder: string | undefined;

  // recursively search for the .lansa folder
  for (let i = 0; i < 10; i++) {
    const folder = path.join(cwd, CONFIG_FOLDER_NAME);

    if (fs.existsSync(folder)) {
      configFolder = folder;
      break;
    }

    const parent = path.dirname(cwd);

    if (parent === cwd) {
      break;
    }

    cwd = parent;
  }

  if (!configFolder) {
    throw new Error(`No ${CONFIG_FOLDER_NAME} folder found in the current directory.`);
  }

  const configFile = path.join(configFolder, 'config.json');

  if (!fs.existsSync(configFile)) {
    throw new Error('No config.json file found in the .lansa folder.');
  }

  const contents = await fs.promises.readFile(configFile, 'utf-8');
  const parsed = parse(contents);

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Invalid configuration file.');
  }

  validateConfig(parsed);

  return parsed;
}
