import { parse } from 'yaml';
import * as fs from 'fs';
import * as path from 'path';

export const getEnv = () => {
  return process.env.ENV;
};

export const getConfig = () => {
  const enviroment = getEnv();
  const yamlPath = path.join(process.cwd(), `./config/${enviroment}.yaml`);
  const fileContents = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(fileContents);
  return config;
};
