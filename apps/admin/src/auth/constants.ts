import { getConfig } from 'apps/utils';
const { secret, expiresIn, initPasswd } = getConfig().ADMIN;
export const jwtConstants = {
  secret,
  expiresIn,
  initPasswd,
};
